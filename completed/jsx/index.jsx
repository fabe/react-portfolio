// Problems with reading the .json files? Try `ulimit -n 4096`.

var React = require('react');
window.jQuery = require('jquery');
var jribbble = require('jribbble');
var data = require('./sample-api');
var site = require('./site');
var Sidebar = require('./Sidebar');
var Work = require('./Work');

var App = React.createClass({
  getInitialState: function() {
    return {
      shots: false,
      site: site,
      layout: "tile"
    }
  },
  componentDidMount: function() {
    jQuery.jribbble.setToken('560f36d81a5578ba55181eab2fb35080cd907fc97149a9a49afa3083721ae445');
    jQuery.jribbble.teams('instagram').shots().then(function(res) {
      this.setState({
        shots: res
      });
    }.bind(this));
  },
  changeLayout: function(layout) {
    this.setState({
      layout: layout
    });
  },
  render: function() {
    return (
      <div className="app">
        <Sidebar
          name={ this.state.site.name }
          tagline={ this.state.site.tagline }
          bio={ this.state.site.bio }
        />
        <Work
          shots={ this.state.shots }
          layout={ this.state.layout }
          changeLayout={ this.changeLayout }
        />
      </div>
    );
  }
});

module.exports = App;
