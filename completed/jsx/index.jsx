// Problems with reading the .json files? Try `ulimit -n 4096`.

var React = require('react');
global.jQuery = require('jquery');
var jribbble = require('jribbble');
var _ = require('lodash');
var dribbble = jQuery.jribbble;
var shots = require('./dribbble');
var site = require('./site');
var Sidebar = require('./Sidebar');
var Work = require('./Work');

var App = React.createClass({
  getInitialState: function() {
    return {
      shots: {},
      site: site,
      layout: "tile"
    }
  },
  changeLayout: function(layout) {
    this.setState({
      layout: layout
    })
  },
  shuffle: function() {
    this.setState({
      shots: _.shuffle(this.state.shots)
    })
  },
  componentDidMount: function() {
    dribbble.setToken('560f36d81a5578ba55181eab2fb35080cd907fc97149a9a49afa3083721ae445');
    dribbble.users('rokis').shots().then(function(shots) {
      this.setState({
        shots: shots
      })
    }.bind(this));
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
          shots={ this.state.shots }
          layout={ this.state.layout }
          changeLayout={ this.changeLayout }
          shuffle={ this.shuffle }
        />
      </div>
    )
  }
});

module.exports = App;