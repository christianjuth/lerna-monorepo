import dedent from "dedent";
import { promises as fs } from "fs";
import path from "path";
import type { Node, ts, Type } from "ts-morph";
import { config } from "./config";
import { createSpinner } from "nanospinner";
// @ts-ignore
import { symbols } from "nanospinner/consts";
// @ts-ignore
import chmod from "chmod";
import kleur from "kleur";

const INTERNAL_METHODS = ["__onStart__", "__version__", "__help__"];

function uuid() {
  function randomString() {
    return Math.random().toString(36).substring(2);
  }

  return Array(4).fill(0).map(randomString).join("-");
}

async function buildTypeScript(tmpBuiltPath: string) {
  const { ts } = await import("ts-morph");

  await fs.writeFile(
    tmpBuiltPath,
    dedent`
      #!/usr/bin/env node
      import { cli } from "./index";
      import { run } from "${config.packageName}";
      run(__dirname, cli);
    `
  );

  try {
    const emitSpinner = createSpinner("Emitting CLI build");

    const program = ts.createProgram([tmpBuiltPath], {
      module: ts.ModuleKind.CommonJS,
      sourceMap: false,
      outDir: config.outputDir,
    });

    program.emit();

    fs.unlink(tmpBuiltPath);
    tmpBuiltPath = tmpBuiltPath.replace(/\.ts$/, ".js");

    chmod(path.join(config.outputDir, tmpBuiltPath), {
      execute: true,
    });

    fs.rename(
      path.join(config.outputDir, tmpBuiltPath),
      path.join(config.outputDir, "cli.js")
    );

    emitSpinner.success();
  } catch (e) {
    console.log(e);
    // cleanup
    fs.unlink(tmpBuiltPath);
  }
}

async function buildCli() {
  const { Project } = await import("ts-morph");

  const detectingTypesspinner = createSpinner("Detecting CLI commands").start();

  const project = new Project({
    compilerOptions: { outDir: "dist", declaration: true, strict: true },
  });

  project.addSourceFilesAtPaths("index.ts");
  const file = project.getSourceFile("index.ts");

  // TODO: recursivly follow import statements
  // console.log(file?.getImportStringLiterals().map(l => l.getText()))

  if (!file) {
    throw new Error(`index.js does not exsist`);
  }

  let functions = file.getFunctions().filter((fn) => {
    const name = fn.getName();
    return name && !INTERNAL_METHODS.includes(name);
  });

  const definitions: Record<
    string,
    {
      params: ParamItem[];
      description: string;
    }
  > = {};

  type ParamType = string | ParamItem;

  type ParamItem = {
    name: string;
    key?: string;
    index?: number;
    types?: ParamType[];
    object?: ParamItem[];
  };

  function buildParamTypes(
    type: Type<ts.Type>,
    extraInfo: {
      node?: Node<ts.Node>;
      key?: string;
      name?: string;
    }
  ): ParamItem {
    const { node, key } = extraInfo;
    const name = extraInfo.name ?? "";

    const types = (type.isUnion() ? type.getUnionTypes() : [type])
      .map((unionType) => {
        const unionTypeName = unionType.getText();

        if (unionType.isLiteral()) {
          const aparentType = unionType
            .getApparentType()
            .getText()
            .toLowerCase();

          switch (aparentType) {
            case "string":
              const str = unionType
                .getText()
                .replace(/(^("|'|`)|("|'|`)$)/g, "");
              return `string:${str}`;
            case "number":
              const num = unionType.getText();
              return `string:${num}`;
            default:
              return aparentType;
          }
        }

        switch (unionTypeName.toLowerCase()) {
          case "string":
          case "number":
          // case "bigint"
          case "boolean":
          case "null":
          case "undefined":
            // case "symbol":
            return unionTypeName;
        }

        // fall back to object
        if (node) {
          const properties = unionType.getProperties().map((t) => {
            return buildParamTypes(t.getTypeAtLocation(node), {
              name: `${name}.${t.getName()}`,
              key: t.getName(),
            });
          });
          const obj: ParamItem = {
            name,
            object: properties,
          };
          return obj;
        }

        // TODO: handle array type
      })
      .filter((value, index, array) => {
        return array.indexOf(value) === index;
      });

    const output: ParamItem = {
      name,
      key,
      types: types as ParamItem[],
    };

    return output;
  }

  const { cli } = await require(config.jsEntry);
  let warning = false;

  for (let fn of functions) {
    const name = fn.getName();

    if (!name) {
      warning = true;
      console.warn(
        kleur.yellow("Warning: CLI functions must be named functions")
      );
      continue;
    }

    const [matchingFnExportName, matchingFn] =
      Object.entries(cli).find(([_, fn]: any) => fn.name === name) ?? [];

    if (!cli[name] && matchingFn !== undefined) {
      warning = true;
      console.warn(
        "\n" +
          kleur.yellow(dedent`
            Warning: CLI function exported name must match function definition name

            ${kleur.bold("Correct")}
            function ${name}() {}

            export const cli = {
              ${name},
            }

            ${kleur.bold("Incorrect")}
            function ${name}() {}

            export const cli = {
              // don't rename functions
              ${matchingFnExportName}: ${name}
            }
          `)
      );
      continue;
    }

    let description = fn.getJsDocs().at(0)?.getDescription() ?? "";
    if (description === "undefined") {
      description = "";
    }

    let params = [];

    for (const param of fn.getParameters()) {
      params.push(
        buildParamTypes(param.getType(), {
          node: param,
          name: param.getName(),
        })
      );
    }

    if (name) {
      definitions[name] = {
        params,
        description: dedent(description).replace("\n", " "),
      };
    }
  }

  if (warning) {
    // @ts-ignore
    detectingTypesspinner.success({ mark: kleur.yellow(symbols.tick) });
  } else {
    detectingTypesspinner.success();
  }

  const writingFileSpinner = createSpinner("Writing CLI data files").start();

  await fs.writeFile(
    path.join(config.outputDir, "cli.json"),
    JSON.stringify(definitions, null, 2)
  );

  writingFileSpinner.success();
}

export async function build() {
  try {
    await fs.mkdir(config.outputDir, { recursive: false });
  } catch (e) {}

  const tmpBuiltPath = `.${uuid()}.tmp.ts`;

  await buildTypeScript(tmpBuiltPath);
  await buildCli();
}
