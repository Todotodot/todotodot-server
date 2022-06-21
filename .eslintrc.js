module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "none",
      },
    ],
  },
};
