/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:svelte/recommended",
        "prettier",
        "plugin:storybook/recommended",
        "plugin:storybook/recommended",
        "plugin:storybook/recommended",
        "plugin:storybook/recommended",
        "plugin:storybook/recommended"
    ],
	parser: '@typescript-eslint/parser',
	plugins: [
		'@stylistic'
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte', '.svelte.ts']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte', '*.svelte.ts'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'@stylistic/semi': 'error',
		'@typescript-eslint/no-explicit-any': 'warn'
	}
};