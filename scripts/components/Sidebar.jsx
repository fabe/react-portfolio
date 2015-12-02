var React = require('react');
var ReactDOM = require('react-dom');

var Navigation = require('./Navigation.jsx');

var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="Sidebar">
        <h1>{ this.props.name }</h1>
        <h2>{ this.props.tagline }</h2>
        <Navigation pages={ this.props.pages } />
      </div>
    )
  }
});

module.exports = Sidebar;