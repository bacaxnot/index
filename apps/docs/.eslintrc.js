/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@bacaxnot/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
