var React = require('react');

var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="sidebar">
        <h1>{ this.props.name }</h1>
        <h3>{ this.props.tagline }</h3>
        <p className="sidebar__bio">{ this.props.bio }</p>
        <p className="sidebar__copyright">Copyright &copy; 2015 { this.props.name }</p>
      </div>
    )
  }
});

module.exports = Sidebar;