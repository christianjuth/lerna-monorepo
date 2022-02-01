import findRoot from "find-root";
import path from "path";
import { Events } from "./types";

const ENTRY_NAME = "index";

let cliRoot = "";
try {
  cliRoot = findRoot(process.cwd());
} catch (e) {}

let pkgRoot = "";
try {
  pkgRoot = findRoot(__dirname);
} catch (e) {}

const outputDir = ".cli";

const INTERNAL_METHODS: (keyof Events)[] = [
  "__onStart__",
  "__version__",
  "__help__",
  "__beforeFn__",
];

export const config = {
  outputDir,
  packageName: "@christianjuth/ts-cli-generator",
  buildPackageExec: "ts-cli-generator build",
  cliRoot,
  tsEntry: path.join(cliRoot, `${ENTRY_NAME}.ts`),
  jsEntry: path.join(cliRoot, outputDir, `${ENTRY_NAME}.js`),
  pkgRoot,
  internalMethods: INTERNAL_METHODS,
};
