module.exports = {
	linters: {
		'src/**/*.{js,md,ts,sass,less,graphql,yaml,json}': [
			'eslint --fix',
			'prettier --write',
			'git add',
		],
	},
}
