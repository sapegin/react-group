## Installation

```bash
npm install --save react-group
```

## Examples

Space-separated (default):

```jsx
<Group>
	<button>One</button>
	<button>Two</button>
	<button>Three</button>
</Group>
```

Comma-separated — React elements:

```jsx
<Group separator=", ">
	<a href="#">One</a>
	<a href="#">Two</a>
	<a href="#">Three</a>
</Group>
```

Comma-separated — array of strings:

```jsx
<Group separator=", " children={['One', 'Two', 'Three']} />
```

React element-separated — React elements:

```jsx
<Group separator={<br />}>
	<a href="#">One</a>
	<a href="#">Two</a>
	<a href="#">Three</a>
</Group>
```

Inline:

```jsx
<Group>
	<Group separator=", " inline>
		<a href="#">One</a>
		<a href="#">Two</a>
		<a href="#">Three</a>
	</Group>
	<button>Add more</button>
</Group>
```
