import findRoot from "find-root";
import path from "path";

const ENTRY_NAME = "index";
const root = findRoot(process.cwd());
const outputDir = ".cli";

export const config = {
  outputDir,
  packageName: "@christianjuth/ts-cli-generator",
  buildPackageExec: "ts-cli-generator build",
  root,
  tsEntry: path.join(root, `${ENTRY_NAME}.ts`),
  jsEntry: path.join(root, outputDir, `${ENTRY_NAME}.js`),
};
