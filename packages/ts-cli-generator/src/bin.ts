#!/usr/bin/env node
import { build } from "./build";
import { init } from "./init";
import { promises as fs } from "fs";
import ts from "typescript";
import { config } from "./config";
import path from "path";
// @ts-ignore
import chmod from "chmod";
import { createSpinner } from "nanospinner";

const arg = process.argv[2];

async function bin() {
  if (arg === "build") {
    try {
      await fs.mkdir(config.outputDir, { recursive: false });
    } catch (e) {}

    build().then((tmpBuildPFile) => {
      try {
        const emitSpinner = createSpinner("Emitting CLI build");

        const program = ts.createProgram([tmpBuildPFile], {
          module: ts.ModuleKind.CommonJS,
          sourceMap: false,
          outDir: config.outputDir,
        });

        program.emit();

        fs.unlink(tmpBuildPFile);
        tmpBuildPFile = tmpBuildPFile.replace(/\.ts$/, ".js");

        chmod(path.join(config.outputDir, tmpBuildPFile), {
          execute: true,
        });

        fs.rename(
          path.join(config.outputDir, tmpBuildPFile),
          path.join(config.outputDir, "cli.js")
        );

        emitSpinner.success();
      } catch (e) {
        console.log(e);
        // cleanup
        fs.unlink(tmpBuildPFile);
      }
    });
  } else {
    init();
  }
}

bin();
