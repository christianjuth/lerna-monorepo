#!/usr/bin/env node
import { build } from "./build";
import { init } from "./init";
import fs from "fs";
import ts from "typescript";
import { config } from "./config";
import path from "path";
// @ts-ignore
import chmod from "chmod";

const arg = process.argv[2];
const isNpx = process.argv[0] === "npx";

if (arg === "init" || isNpx) {
  init();
} else {
  try {
    fs.mkdirSync(config.outputDir, { recursive: false });
  } catch (e) {}

  build().then(() => {
    const program = ts.createProgram(["cli.ts"], {
      module: ts.ModuleKind.CommonJS,
      sourceMap: false,
      outDir: config.outputDir,
    });

    program.emit();

    chmod(path.join(config.outputDir, "cli.js"), {
      execute: true,
    });

    // cleanup
    fs.unlinkSync("cli.ts");
  });
}
