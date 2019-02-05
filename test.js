/* eslint-env es6 */

const React = require('react');
const Enzyme = require('enzyme');
const Group = require('./index');
const Adapter = require('enzyme-adapter-react-16');
const shallow = Enzyme.mount;

Enzyme.configure({ adapter: new Adapter() });

/* eslint-disable no-console */

const createElement = React.createElement;

const render = (props, children) =>
	Enzyme.mount(createElement('div', {}, createElement(Group, props, children)));

const elements = [
	createElement('button', { key: 1 }, 'One'),
	createElement('button', { key: 2 }, 'Two'),
	createElement('button', { key: 3 }, 'Three'),
];
const strings = ['One', 'Two', 'Three'];

test('should render three button separated by spaces', () => {
	const actual = render({}, elements);

	expect(actual.find('button').length).toEqual(3);
	expect(actual.text()).toEqual('One Two Three');
});

test('should render three button separated by a custom separator', () => {
	const actual = render({ separator: ':' }, elements);

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
	const actual = render({}, strings);

	expect(actual.text()).toEqual('One Two Three');
});

test('should work with a single child', () => {
	const actual = shallow(
		createElement(Group, {}, createElement('button', { key: 1 }, 'One'))
	);

	expect(actual.text()).toEqual('One');
});

test('should work without children', () => {
	const actual = render({});

	expect(actual.text()).toEqual('');
});

test('should skip falsy children', () => {
	const actual = render({ separator: ':' }, [
		false,
		null,
		'',
		createElement('button', { key: 1 }, 'One'),
		false,
		null,
		'',
		createElement('button', { key: 3 }, 'Three'),
		false,
		null,
		'',
	]);

	expect(actual.find('button').length).toEqual(2);
	expect(actual.text()).toEqual('One:Three');
});
