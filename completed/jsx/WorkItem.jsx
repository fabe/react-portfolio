var React = require('react');

var WorkItem = React.createClass({
  render: function() {
    return(
      <this.props.layout {...this.props} />
    );
  }
});

module.exports = WorkItem;