/* eslint-env es6 */

const React = require('react');
const Enzyme = require('enzyme');
const Group = require('./index');
const Adapter = require('enzyme-adapter-react-16');
const shallow = Enzyme.shallow;

Enzyme.configure({ adapter: new Adapter() });

/* eslint-disable no-console */

const createElement = React.createElement;

const elements = [
	createElement('button', { key: 1 }, 'One'),
	createElement('button', { key: 2 }, 'Two'),
	createElement('button', { key: 3 }, 'Three'),
];
const strings = ['One', 'Two', 'Three'];

test('should render three button separated by spaces', () => {
	const actual = shallow(createElement(Group, {}, elements));

	expect(actual.type()).toEqual('div');
	expect(actual.find('button').length).toEqual(3);
	expect(actual.text()).toEqual('One Two Three');
});

test('should render three button separated by a custom separator', () => {
	const actual = shallow(createElement(Group, { separator: ':' }, elements));

	expect(actual.find('button').length).toEqual(3);
	expect(actual.text()).toEqual('One:Two:Three');
});

test('should render three button separated by react element <br/>', () => {
	const originalErrorLog = console.error;
	console.error = jest.fn();

	const actual = shallow(
		createElement(Group, { separator: React.createElement('br') }, elements)
	);

	expect(console.error).not.toBeCalled();
	expect(actual.find('br').length).toEqual(2);
	console.error = originalErrorLog;
});

test('should render array of strings', () => {
	const actual = shallow(createElement(Group, {}, strings));

	expect(actual.text()).toEqual('One Two Three');
});

test('should wrap items in <span> when inline mode is enabled', () => {
	const actual = shallow(createElement(Group, { inline: true }, strings));

	expect(actual.type()).toEqual('span');
});

test('should wrap items in an element defined by `is` prop', () => {
	const is = 'article';
	const actual = shallow(createElement(Group, { is }, strings));

	expect(actual.type()).toEqual(is);
});

test('should work with a single child', () => {
	const actual = shallow(
		createElement(Group, {}, createElement('button', { key: 1 }, 'One'))
	);

	expect(actual.text()).toEqual('One');
});

test('should work without children', () => {
	const actual = shallow(createElement(Group, {}));

	expect(actual.text()).toEqual('');
});

test('should skip falsy children', () => {
	const actual = shallow(
		createElement(Group, {}, [
			createElement('button', { key: 1 }, 'One'),
			false,
			createElement('button', { key: 3 }, 'Three'),
		])
	);

	expect(actual.find('button').length).toEqual(2);
	expect(actual.text()).toEqual('One Three');
});
