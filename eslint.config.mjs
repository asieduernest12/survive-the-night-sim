import { FlatCompat } from "@eslint/eslintrc";
import { default as js, default as pluginJs } from "@eslint/js";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginOrganizeImports from "eslint-plugin-organize-imports";
import pathAlias from "eslint-plugin-path-alias";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.Config[]} */
const config= [
  ...compat.extends("next/core-web-vitals"),
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,
  {
    // ignores: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/coverage/**", "**/*.config.js", "**/*.config.mjs", "**/*.config.cjs", "**/*.config.ts", "**/*.config.tsx", "**/*.config.jsx"],
    plugins: {
      "path-alias": pathAlias,
      eslintPluginOrganizeImports: eslintPluginOrganizeImports,
      import: eslintPluginImport,
    },
    rules: {
      "path-alias/no-relative": ["error", { exceptions: ["*.module.css"] }],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-relative-packages": "error",
      "no-undef": "error",
    },
  },
];

export default config