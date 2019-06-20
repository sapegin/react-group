React component to render a collection of items separated by space or other separator.

## Installation

```bash
npm install --save react-group
```

## Examples

Space-separated (default):

```jsx
import Group from 'react-group';
<Group>
  <button>One</button>
  <button>Two</button>
  <button>Three</button>
</Group>;
```

Comma-separated — React elements:

```jsx
import Group from 'react-group';
<Group separator=", ">
  <a href="#">One</a>
  <a href="#">Two</a>
  <a href="#">Three</a>
</Group>;
```

Comma-separated — array of strings:

```jsx
import Group from 'react-group';
<Group separator=", " children={['One', 'Two', 'Three']} />;
```

React element-separated — React elements:

```jsx
import Group from 'react-group';
<Group separator={<br />}>
  <a href="#">One</a>
  <a href="#">Two</a>
  <a href="#">Three</a>
</Group>;
```

Nested:

```jsx
import Group from 'react-group';
<Group>
  <Group separator=", ">
    <a href="#">One</a>
    <a href="#">Two</a>
    <a href="#">Three</a>
  </Group>
  <button>Add more</button>
</Group>;
```
