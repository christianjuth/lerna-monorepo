import findRoot from "find-root";
import path from "path";
import { Events } from "./types";

const ENTRY_NAME = "index";
const root = findRoot(process.cwd());
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
  root,
  tsEntry: path.join(root, `${ENTRY_NAME}.ts`),
  jsEntry: path.join(root, outputDir, `${ENTRY_NAME}.js`),
  internalMethods: INTERNAL_METHODS,
};
