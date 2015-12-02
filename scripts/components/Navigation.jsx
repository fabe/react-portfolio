var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var Navigation = React.createClass({
  render: function() {
    var NavigationNodes = Object.keys(this.props.pages).map(function(key) {
      return (
        <NavigationItem key={ key }
                        title={ this.props.pages[key].title } 
                        slug={ this.props.pages[key].slug } />
      );
    }.bind(this));
    return (
      <ul className="Navigation">
        { NavigationNodes }
      </ul>
    )
  }
});

var NavigationItem = React.createClass({
  mixins : [History],
  navigate: function(slug) {
    this.history.pushState(null, slug);
  },
  render: function() {
    return (
      <li onClick={ this.navigate.bind(this, this.props.slug) }>
        { this.props.title }
      </li>
    )
  }
});

module.exports = Navigation;