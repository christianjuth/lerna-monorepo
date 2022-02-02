// @ts-ignore
import netrc from "node-netrc";
import { getPckJson, getRoot, hash } from "./utils";

async function getStorageKey() {
  const pkgName = (await getPckJson()).name ?? "";
  const locationHash = Math.abs(+hash(getRoot()));
  return ["cli", pkgName, locationHash].filter(Boolean).join(".");
}

type Credentials = {
  login?: string;
  password?: string;
};

async function set({ login, password }: Credentials) {
  const key = await getStorageKey();
  netrc.update(key, {
    login,
    password,
  });
}

async function get(): Promise<Credentials> {
  const key = await getStorageKey();
  return netrc(key);
}

async function clear() {
  await set({ login: undefined, password: undefined });
}

export const credentials = {
  get,
  set,
  clear,
};
