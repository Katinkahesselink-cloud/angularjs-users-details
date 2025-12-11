module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
    commonjs: true
  },
  ignorePatterns: ["dist/", "node_modules/"],
  globals: {
    angular: "readonly",
    jQuery: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      parserOptions: {
        project: null,
        tsconfigRootDir: __dirname
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "off"
      }
    },
    {
      files: ["gulpfile.js"],
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
