import path from "path";
import { promiseExec } from "./utils";

const CWD = path.join(__dirname, "..", "examples", "with-auth");

const USERNAME = "admin";
const PASSWORD = "admin";

beforeAll(() => promiseExec("npm run build", CWD));

describe("with auth", () => {
  test("login", async () => {
    await promiseExec(`node . login ${USERNAME} ${PASSWORD}`, CWD);

    // two calls should should be consistent if login was successful
    const res1 = await promiseExec(`node . expose-token`, CWD);
    const res2 = await promiseExec(`node . expose-token`, CWD);

    expect(res1).not.toContain("undefined");
    expect(res1).toBe(res2);
  });

  test("logout", async () => {
    await promiseExec(`node . logout`, CWD)

    const result = await promiseExec(`node . expose-token`, CWD);
    expect(result).toContain("undefined");
  });
});
