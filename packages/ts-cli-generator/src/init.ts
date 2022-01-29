import fs from "fs";
import prompts from "prompts";
import path from "path";
import dedent from "dedent";
import { execSync } from "child_process";
import cliColor from "cli-color";
import { config } from "./config";

const CODE_BLOCK = "```";

export async function init() {
  const { name } = await prompts({
    type: "text",
    name: "name",
    message: "Enter a name for your cli",
  });

  fs.mkdirSync(name, { recursive: false });

  const pjson = {
    name,
    version: "0.0.0",
    main: "./.cli/cli.js",
    exec: "./.cli/cli.js",
    scripts: {
      build: config.packageExec,
      start: `${config.packageExec} && node .`,
    },
    dependencies: {
      [config.packageName]: "*",
    },
  };

  fs.writeFileSync(
    path.join(name, "package.json"),
    JSON.stringify(pjson, null, 2)
  );

  fs.writeFileSync(
    path.join(name, "index.ts"),
    dedent`
      function add(x: number, y: number) {
        return x + y;
      }
    `
  );

  fs.writeFileSync(
    path.join(name, "README.md"),
    dedent`
      # ${name}

      ### Run cli without installing
      ${CODE_BLOCK}bash
        npm start
      ${CODE_BLOCK}

      ### Build cli
      ${CODE_BLOCK}bash
        npm run build
      ${CODE_BLOCK}

      ### Install cli locally
      ${CODE_BLOCK}bash
        npm link
      ${CODE_BLOCK}
    `
  );

  const tsConfig = {
    compilerOptions: {
      noImplicitAny: true,
      strict: true,
    },
    exclude: ["node_modules"],
  };

  fs.writeFileSync(
    path.join(name, "tsconfig.json"),
    JSON.stringify(tsConfig, null, 2)
  );

  execSync(`cd ${name} && npm install`);

  console.log(dedent`
    # start
    ${cliColor.green("npm start")}

    # Build
    ${cliColor.green("npm run build")}

    # Test locally
    ${cliColor.green("npm link")} 
  `);
}
