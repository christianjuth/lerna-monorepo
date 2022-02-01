import dedent from "dedent";
import findRoot from "find-root";
import path from "path";

let root: string | null = null;

export function getRoot() {
  if (root) {
    return root;
  }

  const r = findRoot(process.cwd());
  root = r;
  return r;
}

export async function getPckJson(): Promise<Record<string, any>> {
  const root = getRoot();
  try {
    return await require(path.join(root, "package.json"));
  } catch (e) {
    return {};
  }
}

// NOT CRYPTOGRAPHIC
const SEED = 5381;

// When we have separate strings it's useful to run a progressive
// version of djb2 where we pretend that we're still looping over
// the same string
const phash = (h: number, x: string) => {
  let i = x.length;

  while (i) {
    h = (h * 33) ^ x.charCodeAt(--i);
  }

  return h;
};

// This is a djb2 hashing function
export const hash = (x: string | Record<string, any> | any[]) => {
  let str = "";
  if (typeof x === "string") {
    str = x;
  } else {
    str = JSON.stringify(x);
  }
  return phash(SEED, str) + "";
};

function padRight(str: string, length: number) {
  const padding = Math.max(length - str.length, 0);
  return `${str}${" ".repeat(padding)}`;
}

export function formatTable(data: string[][]) {
  const colWidths: number[] = [];

  for (const row of data) {
    for (let i = 0; i < row.length; i++) {
      colWidths[i] = Math.max(colWidths[i] ?? 0, row[i].length);
    }
  }

  let table = "";

  for (const row of data) {
    for (let i = 0; i < row.length; i++) {
      const col = row[i];
      if (i > 0) {
        table += "\t";
      }
      table += padRight(col, colWidths[i]);
    }
    table += "\n";
  }

  return dedent(table);
}

export function printTable(data: string[][]) {
  console.log(formatTable(data));
}
