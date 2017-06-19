## Installation

```bash
npm install --save react-group
```

## Examples

Space-separated (default):

```
<Group>
	<button>One</button>
	<button>Two</button>
	<button>Three</button>
</Group>
```

Comma-separated — React elements:

```
<Group separator=", ">
	<a href="#">One</a>
	<a href="#">Two</a>
	<a href="#">Three</a>
</Group>
```

Comma-separated — array of strings:

```
<Group separator=", " children={['One', 'Two', 'Three']} />
```

React element-separated — React elements:

```
<Group separator={<br />}>
	<a href="#">One</a>
	<a href="#">Two</a>
	<a href="#">Three</a>
</Group>
```

Inline:

```
<Group>
	<Group separator=", " inline>
		<a href="#">One</a>
		<a href="#">Two</a>
		<a href="#">Three</a>
	</Group>
	<button>Add more</button>
</Group>
```
