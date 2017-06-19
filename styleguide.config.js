/* eslint-env es6 */

const path = require('path');
module.exports = {
	title: 'React Group',
	components: './index.js',
	getExampleFilename: () => path.join(__dirname, '/examples.md'),
	getComponentPathLine: () => "import Group from 'react-group';",
	showCode: true,
	styleguideDir: './docs',
};
