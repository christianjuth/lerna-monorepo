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
