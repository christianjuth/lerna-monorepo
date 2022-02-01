import { exec } from "child_process";
import dedent from "dedent";

export const promiseExec = (command: string, cwd: string) =>
  new Promise<string>((resolve, reject) => {
    exec(command, { cwd }, (error, stdout) => {
      if (error) {
        reject();
      } else {
        resolve(dedent(stdout));
      }
    });
  });
