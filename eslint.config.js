import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  
  {
    files: ["**/*.jsx"],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  },
  
  {
    ...pluginReactConfig,
    settings: {
      react: {
        version: "detect", // Automatically detect the React version or specify a version string like "17.0"
      },
    },
    rules: {
      // Add custom rules here
      "react/prop-types": "off", // Example: Turn off prop-types rule
      "react/react-in-jsx-scope": "off", // Example: Turn off React in JSX scope rule for Next.js
      "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".tsx"] }], // Example: Allow .jsx and .tsx extensions
    },
  },

  {
    files: ["*.cjs"],
    languageOptions: {
      globals: {
        ...globals.node, // Add Node.js globals for CommonJS modules
      },
    },
  },
];
