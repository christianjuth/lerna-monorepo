import prompts from "prompts";
import dedent from "dedent";
import path from "path";
import findRoot from "find-root";
import { config } from "./config";
import { ParamsArrayPartial } from "./types";
import kleur from "kleur";
// @ts-ignore
import * as getFn from "get-function-location";
const getFnLoc = getFn.default;

const camelCaseToHyphen = (name: string) =>
  name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const hyphenToCamelCase = (name: string) =>
  name.replace(/-./g, (m) => m[1].toUpperCase());

function padRight(str: string, length: number) {
  const padding = Math.max(length - str.length, 0);
  return `${str}${" ".repeat(padding)}`;
}

function formatTable(items: { name: string; description: string }[]) {
  let length = 0;

  for (const item of items) {
    length = Math.max(length, item.name.length);
  }

  return items.map(
    ({ name, description }) => `${padRight(name, length)}\t${description}`
  );
}

type ParamType = string | ParamItem;

type ParamItem = {
  name: string;
  key?: string;
  index?: number;
  types?: ParamType[];
  object?: ParamItem[];
};

async function getValue(
  param: ParamItem,
  argQueue: any[],
  onCancel: () => any,
  cancledRef: { current: boolean }
): Promise<any> {
  if (cancledRef.current) {
    return;
  }

  if (param.object) {
    const obj: Record<string, any> = {};

    for (const prop of param.object) {
      if (prop.key) {
        obj[prop.key] = await getValue(prop, argQueue, onCancel, cancledRef);
      }
    }

    return obj;
  }

  let selectedType = "";

  if (param.types === undefined) {
    return;
  } else if (param.types.length > 1) {
    selectedType = (
      await prompts(
        {
          type: "select",
          name: "type",
          message: `Select praram type for ${param.name}`,
          choices: param.types.map((t) => {
            const value = typeof t === "string" ? t : t.name;
            let title = value;
            if (title.indexOf(":") !== -1) {
              const [_, literal] = title.split(":");
              title = literal;
            }
            return {
              title,
              value,
            };
          }),
        },
        { onCancel }
      )
    ).type;
  } else if (param.types.length === 1) {
    const firstType = param.types[0];
    selectedType = typeof firstType === "string" ? firstType : firstType.name;
  }

  // handle literals
  if (selectedType.indexOf(":") !== -1) {
    const [aparentType, literal] = selectedType.split(":");
    switch (aparentType) {
      case "string":
        return literal;
      case "number":
        return +literal;
    }
  }

  const hasArgument = argQueue.length > 0;
  const argument = argQueue.shift();

  const message = camelCaseToHyphen(param.name);

  switch (selectedType) {
    case "string":
      return (
        argument ??
        (
          await prompts(
            {
              type: "text",
              name: "value",
              message,
            },
            { onCancel }
          )
        ).value ??
        ""
      );
    case "number":
      const numVal =
        argument ??
        (
          await prompts(
            {
              type: "number",
              name: "value",
              message,
            },
            { onCancel }
          )
        ).value ??
        0;
      return +numVal;
    // case "bigint"
    case "boolean":
      const boolVal =
        argument ??
        (
          await prompts(
            {
              type: "select",
              name: "value",
              message,
              choices: [
                { value: "true", title: "True" },
                { value: "false", title: "False" },
              ],
            },
            { onCancel }
          )
        ).value;
      return boolVal === "true";
    case "null":
      return null;
    case "undefined":
      return undefined;
    // case "symbol":
  }

  if (hasArgument) {
    return argument;
  }

  for (const type of param.types) {
    if (typeof type !== "string" && type.name === selectedType) {
      console.log("SELECT", type, argument);
      return getValue(type, argQueue, onCancel, cancledRef);
    }
  }
}

function help({
  name,
  version,
  commands,
}: {
  name: string;
  version: string;
  commands: {
    name: string;
    description: string;
  }[];
}) {
  return console.log(
    dedent`
    ${kleur.gray(`${name} ${version}`)}

    ${kleur.bold("Commands:")}
      ${formatTable(commands).join("\n      ")}

    ${kleur.bold("Options:")}
      ${formatTable([
        {
          name: "-h, --help",
          description: "Output usage information",
        },
        {
          name: "-i, --interactive",
          description: "Run CLI in interactive mode",
        },
      ]).join("\n      ")}
  ` + "\n"
  );
}

let _dir = "";
let _functions: Record<string, (...args: any) => any> = {};

type Data = {
  params: ParamItem[];
  description: string;
  file: string;
  name: string;
}[];

async function getFunctionData(data: Data, fn: (...args: any) => any) {
  const normalize = (p: string) => p.replace(/(\/|\\)/, "-");

  const loc = (await getFnLoc(fn)).source;
  const file = loc
    .replace(config.outputDir, "")
    .replace(/\.js$/, "")
    .replace("file:///", "");
  return data.filter((item) => {
    return item.name === fn.name && normalize(item.file) === normalize(file);
  })?.[0];
}

export async function run<T extends string>(
  dir: string,
  functions: Record<T, (...args: any) => any>
) {
  _dir = dir;
  _functions = functions;

  // @ts-ignore
  await functions.__onStart__?.();

  const data = (await require(path.join(dir, "./cli.json"))) as Data;

  const flags = [];
  const args = process.argv.slice(2);

  // keep removing items until we encounter
  // something that isn't a flag
  while (args.length > 0) {
    const crnt = args[0];
    // is flag
    if (crnt && crnt[0] === "-") {
      flags.push(args.shift());
    } else {
      break;
    }
  }

  let functionName = args.shift() ?? "";
  if (functionName[0] === "_") {
    // disallow calling of hidden functions
    functionName = "";
  }

  if (flags.includes("-h" || flags.includes("--help"))) {
    // empty command prints usage
    await runInternal(dir, functions, "");
    return;
  }

  if (flags.includes("-i") || flags.includes("--interactive")) {
    while (true) {
      let helpText: any;

      const { command } = await prompts(
        {
          type: "autocomplete",
          name: "command",
          message: "",
          choices: [
            ...Object.keys(functions)
              .filter((name) => name[0] !== "_")
              .map((key) => ({
                title: camelCaseToHyphen(key),
                value: key,
              })),
          ],
          onState: async ({ value }) => {
            const d = await getFunctionData(
              data,
              functions[value as keyof typeof functions]
            );
            helpText = d.description;
          },
          // @ts-ignore
          onRender() {
            // @ts-ignore
            this.msg = [
              "Select a command",
              helpText ? kleur.gray(`(${helpText})`) : null,
            ]
              .filter(Boolean)
              .join(" ");
          },
        },
        { onCancel: exit }
      );
      await runInternal(dir, functions, command);
    }
  }

  runInternal(dir, functions, functionName);
}

export async function runInternal(
  dir: string,
  fns: Record<string, (...args: any) => any>,
  functionName: string,
  paramQueue: any[] = process.argv.slice(3)
) {
  const root = findRoot(dir);
  let version = "unknown";
  let name = "untitled";

  try {
    const pjson = await require(path.join(root, "package.json"));
    version = pjson.version ?? version;
    name = pjson.name ? pjson.name.replace(/@[^\/]+\//, "") : name;
  } catch (e) {}

  const data = await require(path.join(dir, "./cli.json"));

  const command = hyphenToCamelCase(functionName);

  // const fnConfig = data[command];
  const fn = fns[command];

  if (!command || !fn) {
    const commands = [];

    for (const [name, value] of Object.entries(fns).filter(
      ([name]) => name[0] !== "_"
    )) {
      const functionData = await getFunctionData(data, value);
      commands.push({
        name: camelCaseToHyphen(name),
        description: functionData?.description ?? "",
      });
    }

    help({
      name: fns.__name__?.() ?? name,
      version: fns.__version__?.() ?? version,
      commands,
    });
  } else {
    await fns.__beforeFn__?.(fn);

    const fnConfig = await getFunctionData(data, fn);

    if (!fnConfig) {
      throw Error(`filed to idenfity params for ${fn.name}`);
    }

    let cancledRef = { current: false };
    function onCancel() {
      console.log("Press CTRL-C again to exit");
      cancledRef.current = true;
      // thowing will cancel the current interaction
      throw "";
    }

    const params = [];
    for (const param of fnConfig.params) {
      if (cancledRef.current) {
        return;
      }
      params.push(await getValue(param, paramQueue, onCancel, cancledRef));
    }

    if (cancledRef.current) {
      return;
    }

    try {
      const output = await fn(...params);
      return output;
    } catch (e: any) {
      if (e.message) {
        console.error(kleur.red(e.message));
      }
    }
  }
}

export function call<Args extends any[], R>(fn: (...any: Args) => R) {
  return async (...params: ParamsArrayPartial<Args>): Promise<R> => {
    const name = fn.name;
    if (_dir && name) {
      return await runInternal(
        _dir,
        { ..._functions, [name]: fn },
        name,
        params
      );
    }
    throw Error(`Could not find function with name ${fn}`);
  };
}

function exit() {
  process.exit();
}
