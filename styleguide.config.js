/* eslint-env es6 */

const path = require('path');
module.exports = {
	title: 'React Group',
	components: './index.js',
	getExampleFilename: () => path.join(__dirname, '/examples.md'),
	getComponentPathLine: () => null,
	moduleAliases: {
		'react-group': __dirname,
	},
	ribbon: {
		url: 'https://github.com/sapegin/react-group',
	},
	exampleMode: 'expand',
	usageMode: 'expand',
	showSidebar: false,
	styleguideDir: './docs',
};
