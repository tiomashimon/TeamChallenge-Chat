module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'airbnb',
		'airbnb-typescript',
		'airbnb/hooks',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
    "plugin:prettier/recommended"
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', "prettier", "@typescript-eslint"],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
    "react-hooks/rules-of-hooks": "error",
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
	},
	parserOptions: {
		project: ['./Frontend/tsconfig.json', './Frontend/tsconfig.node.json'],
	},
};
