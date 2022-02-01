/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  testTimeout: 1000 * 30, // 30 seconds
  watchPathIgnorePatterns: ["<rootDir>/examples/"]
};
