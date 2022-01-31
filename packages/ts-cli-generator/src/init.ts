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
    files: [".cli", "README.md"],
    scripts: {
      build: config.buildPackageExec,
      start: `${config.buildPackageExec} && node .`,
      dev: `nodemon -e ts --ignore *.tmp.ts -x '${config.buildPackageExec} && node . $1'`,
    },
    devDependencies: {
      nodemon: "2.x",
      typescript: "*",
    },
    dependencies: {
      [config.packageName]: "*",
    },
  };

  await fs.writeFile(
    path.join(name, "package.json"),
    JSON.stringify(pjson, null, 2)
  );

  await fs.writeFile(
    path.join(name, "index.ts"),
    dedent`
      import { call, CLI } from "@christianjuth/ts-cli-generator";

      /**
       * Add two numbers
       */
      function add(x: number, y: number) {
        console.log(x + y);
      }
      
      /**
       * Subtract two numbers
       */
      function _subtract(x: number, y: number) {
        return x - y;
      }
      
      /**
       * Add then subtract as seprate interactions
       */
      async function addSubtract(x: number, y: number) {
        console.log(x + y);
        console.log(await call(_subtract)());
      }
      
      /**
       * Get the length of a string
       */
      function lengthOfString(str: string) {
        console.log(str.length);
      }
      
      export const cli: CLI = {
        add,
        addSubtract,
        lengthOfString,
        // underscore means function is available but hidden
        _subtract,
      };
    `
  );

  await fs.writeFile(
    path.join(name, "README.md"),
    dedent`
      # ${name}

      ### Run CLI
      ${CODE_BLOCK}bash
        npm start
      ${CODE_BLOCK}

      ### Run with nodemon
      ${CODE_BLOCK}bash
        npm run dev
      ${CODE_BLOCK}

      ### Build
      ${CODE_BLOCK}bash
        npm run build
      ${CODE_BLOCK}

      ### Install CLI locally
      ${CODE_BLOCK}bash
        # (make sure you build before linking)
        npm link
        ${name}
      ${CODE_BLOCK}
    `
  );

  await fs.writeFile(
    path.join(name, ".gitignore"),
    dedent`
      # Logs
      logs
      *.log
      npm-debug.log*

      # Node
      node_modules/

      # Mac
      .DS_Store
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
            # Run CLI
            ${cliColor.green("npm start")}

            # Run with nodemon
            ${cliColor.green("npm run dev")}
  
            # Build
            ${cliColor.green("npm run build")}
  
            # Install CLI locally
            # (make sure you build before linking)
            ${cliColor.green("npm link")}
            ${cliColor.green(name)} 
        ` +
        "\n"
    );

    exec("git init", { cwd: name });
  });
}
