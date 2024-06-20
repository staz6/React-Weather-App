module.exports = {
	env: {
		browser: true,
		es2021: true,
	  },
	extends: [
		"airbnb", "airbnb/hooks",
		'airbnb-typescript',
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:react/recommended",
		"prettier",
	],
	ignorePatterns: ["**/*.cjs", "**/*.js","vite.config.ts"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ["./tsconfig.json"],
		sourceType: 'module',
				ecmaFeatures: {
			jsx: true,

		},
	},
	plugins: ["@typescript-eslint", "prettier"],
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		"react/react-in-jsx-scope":"off",
		
		'react/function-component-definition': [
  2,
  {
    namedComponents: ['arrow-function', 'function-declaration'],
    unnamedComponents: 'arrow-function',
  },
],
		"react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "@typescript-eslint/no-unused-vars": "error", // Add this rule to catch unused variables
    "@typescript-eslint/no-explicit-any": "error", // Add this rule to catch usage of 'any' type
    "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }], // Add this rule to require explicit return types on functions
    "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "explicit" }], // Add this rule to require explicit accessibility modifiers on class properties and methods
  },
  
	root: true,
};
