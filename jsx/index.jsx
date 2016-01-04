// Problems with reading the .json files? Try `ulimit -n 4096`.
var React = require('react');
/*global.jQuery = require('jquery');
var jribbble = require('jribbble');
var dribbble = jQuery.jribbble;*/
var _ = require('lodash');
var data = require('./site');
var shots = require('./dribbble');
var Sidebar = require('./Sidebar');
var Work = require('./Work');

var App = React.createClass({
  getInitialState: function() {
    return {
      shots: {},
      layout: "list"
    };
  },
  componentDidMount: function() {
    /*dribbble.setToken('560f36d81a5578ba55181eab2fb35080cd907fc97149a9a49afa3083721ae445');
    dribbble.teams('instagram').shots().then(function(res) {
      this.setState({
        shots: res
      });
    }.bind(this));*/
    this.setState({
      shots: shots
    });
  },
  changeLayout: function(layout) {
    this.setState({layout:layout});
  },
  shuffleShots: function() {
    this.setState({ shots: _.shuffle(this.state.shots) });
  },
  render: function() {
    return (
      <div className="app">
        <Sidebar
          name={ data.site.name }
          tagline={ data.site.tagline }
          bio={ data.site.bio }
        />
        <Work 
          shots={ this.state.shots }
          layout={ this.state.layout }
          changeLayout={ this.changeLayout }
          shuffleShots={ this.shuffleShots }
        />
      </div>
    )
  }
});

module.exports = App;