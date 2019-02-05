var React = require('react');
var PropTypes = require('prop-types');

/**
 * React component to render collection of items separated by space or other separator.
 *
 * @visibleName React Group
 */
function Group(props) {
	var children = React.Children.toArray(props.children);

	// Insert separators
	var items = children;
	var separator = props.separator;
	var separatorIsElement = React.isValidElement(separator);
	if (children.length > 1) {
		items = [children.shift()];
		children.forEach(function(item, index) {
			if (!item) {
				return;
			}
			if (separatorIsElement) {
				var key = 'separator-' + (item.key || index);
				separator = React.cloneElement(separator, { key: key });
			}
			items.push(separator, item);
		});
	}

	return items;
}

Group.propTypes = {
	/** Items */
	children: PropTypes.node,
	/** Custom separator (space by default) */
	separator: PropTypes.node,
};
Group.defaultProps = {
	separator: ' ',
};

module.exports = Group;
