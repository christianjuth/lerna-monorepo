import { promises as fs } from "fs";
import prompts from "prompts";
import path from "path";
import dedent from "dedent";
import { exec } from "child_process";
import cliColor from "cli-color";
import { config } from "./config";
import { createSpinner } from "nanospinner";

const CODE_BLOCK = "```";

export async function init() {
  const { name } = await prompts({
    type: "text",
    name: "name",
    message: "Enter a name for your cli",
  });

  const creatingFilesSpinner = createSpinner("Creating project files").start();

  await fs.mkdir(name, { recursive: false });

  const pjson = {
    name,
    version: "0.0.0",
    main: "./.cli/cli.js",
    bin: "./.cli/cli.js",
    scripts: {
      build: config.buildPackageExec,
      start: `${config.buildPackageExec} && node .`,
    },
    dependencies: {
      [config.packageName]: "*",
      typescript: "*",
    },
  };

  await fs.writeFile(
    path.join(name, "package.json"),
    JSON.stringify(pjson, null, 2)
  );

  await fs.writeFile(
    path.join(name, "index.ts"),
    dedent`
      function add(x: number, y: number) {
        return x + y;
      }

      export const cli = {
        add,
      };
    `
  );

  await fs.writeFile(
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

  await fs.writeFile(
    path.join(name, "tsconfig.json"),
    JSON.stringify(tsConfig, null, 2)
  );

  creatingFilesSpinner.success();

  const npmInstallSpinner = createSpinner(
    "Installing npm dependencies"
  ).start();

  exec(`npm install`, { cwd: name }, () => {
    npmInstallSpinner.success();

    console.log(
      "\n" +
        dedent`
          ${cliColor.bold("Getting started")}
            # navigate to project
            ${cliColor.green(`cd ${name}`)}
  
            # edit index.ts
  
          ${cliColor.bold("Commands")}
            # Start
            ${cliColor.green("npm start")}
  
            # Build
            ${cliColor.green("npm run build")}
  
            # Install locally
            ${cliColor.green("npm link")}
            ${cliColor.green(name)} 
        ` +
        "\n"
    );
  });
}
