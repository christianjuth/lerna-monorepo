import path from "path";
import { promiseExec } from "./utils";

const CWD = path.join(__dirname, "..", "examples", "math-cli");

function randomInts(len: number) {
  const out = [];
  while (len > 0) {
    out.push(Math.round(Math.random()));
    len--;
  }
  return out;
}

beforeAll(() => promiseExec("npm run build", CWD));

describe("math cli", () => {
  test("add", async () => {
    const [x, y] = randomInts(2);
    const result = await promiseExec(`node . add ${x} ${y}`, CWD);
    expect(result).toBe(String(x + y));
  });

  test("subtract", async () => {
    const [x, y] = randomInts(2);
    const result = await promiseExec(`node . subtract ${x} ${y}`, CWD);
    expect(result).toBe(String(x - y));
  });

  test("multiply", async () => {
    const [x, y] = randomInts(2);
    const result = await promiseExec(`node . multiply ${x} ${y}`, CWD);
    expect(result).toBe(String(x * y));
  });

  test("divide", async () => {
    const [x, y] = randomInts(2);
    const result = await promiseExec(`node . divide ${x} ${y}`, CWD);
    expect(result).toBe(String(x / y));
  });

  test("square", async () => {
    const [x] = randomInts(1);
    const result = await promiseExec(`node . square ${x}`, CWD);
    expect(result).toBe(String(x ** 2));
  });

  test("cube", async () => {
    const [x] = randomInts(1);
    const result = await promiseExec(`node . cube ${x}`, CWD);
    expect(result).toBe(String(x ** 3));
  });

  test("sqrt", async () => {
    const [x] = randomInts(1);
    const result = await promiseExec(`node . sqrt ${x ** 2}`, CWD);
    expect(result).toBe(String(x));
  });

  test("bitwiseAnd", async () => {
    const [x, y] = randomInts(2);
    const result = await promiseExec(`node . bitwiseAnd ${x} ${y}`, CWD);
    expect(result).toBe(String(x & y));
  });

  test("bitwiseOr", async () => {
    const [x, y] = randomInts(2);
    const result = await promiseExec(`node . bitwiseOr ${x} ${y}`, CWD);
    expect(result).toBe(String(x | y));
  });
});
