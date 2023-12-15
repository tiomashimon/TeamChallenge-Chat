module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
		project: ['./tsconfig.json', './tsconfig.node.json'],
	},
	plugins: ['prettier', 'react', '@typescript-eslint'],
	rules: {
    "prettier/prettier": "error",
    "react-hooks/rules-of-hooks": "error",
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    "react/function-component-definition": [
      2,
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function"
      }
    ],
	},
};
