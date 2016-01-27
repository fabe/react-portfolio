var React = require('react');

var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="sidebar">
        <h1>{ this.props.name }</h1>
        <h3>{ this.props.tagline }</h3>
        <p className="sidebar-bio">{ this.props.bio }</p>
        <p className="sidebar-copyright">Copyright 2016 { this.props.name }</p>
      </div>
    );
  }
})

module.exports = Sidebar;
