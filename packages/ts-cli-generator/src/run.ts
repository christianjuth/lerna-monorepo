import cliColor from "cli-color";
import prompts from "prompts";
import dedent from "dedent";
import path from "path";
import findRoot from "find-root";
import { config } from "./config";

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

async function getValue(param: ParamItem, argQueue: string[]): Promise<any> {
  if (param.object) {
    const obj: Record<string, any> = {};

    for (const prop of param.object) {
      if (prop.key) {
        obj[prop.key] = await getValue(prop, argQueue);
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

  const argument = argQueue.shift();

  switch (selectedType) {
    case "string":
      return (
        argument ??
        (
          await prompts(
            {
              type: "text",
              name: "value",
              message: `param: ${param.name}`,
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
              message: `param: ${param.name}`,
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
              message: `param: ${param.name}`,
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

  for (const type of param.types) {
    if (typeof type !== "string" && type.name === selectedType) {
      return getValue(type, argQueue);
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
    ${cliColor.xterm(240)(`${name} CLI ${version}`)}

    ${cliColor.xterm(240)(`Powered by ${config.packageName}`)}

    ${cliColor.bold("Commands:")}
      ${formatTable(commands).join("\n      ")}
  ` + "\n"
  );
}

export async function run<T extends string>(
  dir: string,
  functions: Record<T, (...args: any) => any>
) {
  const root = findRoot(dir);
  let version = "unknown";
  let name = "untitled";

  try {
    const pjson = await require(path.join(root, "package.json"));
    version = pjson.version ?? version;
    name = pjson.name ? pjson.name.replace(/@[^\/]+\//, "") : name;
  } catch (e) {}

  const fns = functions as Record<string, (...args: any) => any>;

  fns.__onStart__?.();

  const data = await require(path.join(dir, "./cli.json"));

  const command = hyphenToCamelCase(process.argv[2] ?? "");
  const argQueue = process.argv.slice(3);

  const fnConfig = data[command];
  const fn = fns[command];

  if (!fnConfig || !fn) {
    help({
      name: fns.__name__?.() ?? name,
      version: fns.__version__?.() ?? version,
      commands: Object.entries(data)
        .filter(([name]) => Boolean(fns[name]))
        .map(([name, value]) => ({
          name: camelCaseToHyphen(name),
          description: (value as any).description,
        })),
    });
  } else {
    const params = [];
    for (const param of fnConfig.params) {
      params.push(await getValue(param, argQueue));
    }

    const output = await fn(...params);
    if (output !== undefined) {
      console.log(output);
    }
  }
}

function onCancel() {
  process.exit();
}
