const React = require('react');
const shallow = require('enzyme').shallow;
const Group = require('./index');

const createElement = React.createElement;

const elements = [
	createElement('button', { key: 1 }, 'One'),
	createElement('button', { key: 2 }, 'Two'),
	createElement('button', { key: 3 }, 'Three'),
];
const strings = ['One', 'Two', 'Three'];

test('should render three button separated by spaces', () => {
	const actual = shallow(
		createElement(Group, {}, elements)
	);

	expect(actual.node.type).toEqual('div');
	expect(actual.find('button').length).toEqual(3);
	expect(actual.text()).toEqual('One Two Three');
});

test('should render three button separated by a custom separator', () => {
	const actual = shallow(
		createElement(Group, { separator: ':' }, elements)
	);

	expect(actual.find('button').length).toEqual(3);
	expect(actual.text()).toEqual('One:Two:Three');
});

test('should render array of strings', () => {
	const actual = shallow(
		createElement(Group, {}, strings)
	);

	expect(actual.text()).toEqual('One Two Three');
});

test('should wrap items in <span> when inline mode is enabled', () => {
	const actual = shallow(
		createElement(Group, { inline: true }, strings)
	);

	expect(actual.node.type).toEqual('span');
});

test('should work with a single child', () => {
	const actual = shallow(
		createElement(Group, {}, createElement('button', { key: 1 }, 'One'))
	);

	expect(actual.text()).toEqual('One');
});

test('should work without children', () => {
	const actual = shallow(
		createElement(Group, {})
	);

	expect(actual.text()).toEqual('');
});

test('should skip falsy children', () => {
	const actual = shallow(
		createElement(Group, {}, [
			createElement('button', { key: 1 }, 'One'),
			false && createElement('button', { key: 2 }, 'Two'),
			createElement('button', { key: 3 }, 'Three'),
		])
	);

	expect(actual.find('button').length).toEqual(2);
	expect(actual.text()).toEqual('One Three');
});
