var React = require('react');
var PropTypes = require('prop-types');

function castArray(value) {
	return Array.isArray(value) ? value : [value];
}

/**
 * React component to render collection of items separated by space or other separator.
 */
function Group(props) {
	// Accept multiple children, one child or none
	var children = props.children ? castArray(props.children) : [];

	// Skip falsy children
	children = children.filter(function(child) {
		return !!child;
	});

	// Insert separators
	var items = children;
	var separator = props.separator;
	var separatorIsElement = React.isValidElement(separator);
	if (children.length > 1) {
		items = [children.shift()];
		children.forEach(function(item, index) {
			if (separatorIsElement) {
				var key = 'separator-' + (item.key || index);
				separator = React.cloneElement(separator, { key: key });
			}
			return items.push(separator, item);
		});
	}

	return React.createElement(props.inline ? 'span' : 'div', { className: props.className }, items);
}

Group.propTypes = {
	/** Items. */
	children: PropTypes.node,
	/** Wrap in `<span>` instead of `<div>`. */
	inline: PropTypes.bool,
	/** Custom separator (space by default). */
	separator: PropTypes.node,
	/** Custom class name. */
	className: PropTypes.string,
};
Group.defaultProps = {
	separator: ' ',
};

module.exports = Group;
