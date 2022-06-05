module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "none",
      },
    ],
  },
};
