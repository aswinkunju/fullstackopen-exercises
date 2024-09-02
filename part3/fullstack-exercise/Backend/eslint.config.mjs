import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin-js"; // Make sure the package is installed correctly

export default [
  // Replace this with a valid configuration reference
  stylisticJs.configs?.recommended ?? {}, // Safely access 'recommended' and provide an empty object as a fallback
  {
    files: ["**/*.js"],
    ignores: ["dist/**"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 4],
      '@stylistic/js/linebreak-style': ['error', 'windows'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
    },
  },
];
