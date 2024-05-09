/* eslint-env es2020 */

const React = require('react');
const { render, screen } = require('@testing-library/react');
const Group = require('./index');

/* eslint-disable no-console */

const createElement = React.createElement;

const renderTest = (props, children) =>
	render(createElement('div', {}, createElement(Group, props, children)));

const elements = [
	createElement('button', { key: 1 }, 'One'),
	createElement('button', { key: 2 }, 'Two'),
	createElement('button', { key: 3 }, 'Three'),
];
const strings = ['One', 'Two', 'Three'];

test('should render three button separated by spaces', async () => {
	const { container } = renderTest({}, elements);

	expect(await screen.findAllByRole('button')).toHaveLength(3);
	expect(container.textContent).toEqual('One Two Three');
});

test('should render three button separated by a custom separator', async () => {
	const { container } = renderTest({ separator: ':' }, elements);

	expect(await screen.findAllByRole('button')).toHaveLength(3);
	expect(container.textContent).toEqual('One:Two:Three');
});

test('should render three button separated by react element <br/>', async () => {
	const originalErrorLog = console.error;
	console.error = jest.fn();

	renderTest({ separator: React.createElement('hr') }, elements);

	expect(await screen.findAllByRole('separator')).toHaveLength(2);
	expect(console.error).not.toBeCalled();

	console.error = originalErrorLog;
});

test('should render array of strings', () => {
	const { container } = renderTest({}, strings);

	expect(container.textContent).toEqual('One Two Three');
});

test('should work with a single child', () => {
	const { container } = renderTest({}, elements[0]);

	expect(container.textContent).toEqual('One');
});

test('should work without children', () => {
	const { container } = renderTest({});

	expect(container.textContent).toEqual('');
});

test('should skip falsy children', async () => {
	const { container } = renderTest({ separator: ':' }, [
		false,
		null,
		'',
		elements[0],
		false,
		null,
		'',
		elements[2],
		false,
		null,
		'',
	]);

	expect(await screen.findAllByRole('button')).toHaveLength(2);
	expect(container.textContent).toEqual('One:Three');
});
