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
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'@stylistic/ts/semi': 'error',
		'@stylistic/no-explicit-any': 'warn'
	}
};