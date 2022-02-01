import path from "path";
import { promiseExec } from "./utils";

const CWD = path.join(__dirname, "..", "examples", "stocks-cli");

beforeAll(() => promiseExec("npm run build", CWD));

describe("stocks cli", () => {
  test("check stock", async () => {
    const result = await promiseExec(`node . check-stock GOOGL`, CWD);
    expect(result).toMatch(/[0-9]+(\.[0-9]|)/);
  });

  test("check stock price", async () => {
    const result = await promiseExec(`node . check-stock-price AAPL`, CWD);
    expect(result).toMatch(/[0-9]+(\.[0-9]|)/);
  });
});
