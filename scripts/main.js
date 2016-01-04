// ulimit -n 4096

var React = require('react');
var ReactDOM = require('react-dom');

global.jQuery = require("jquery");
var jribbble = require('jribbble');
var dribbble = jQuery.jribbble;

var data = require('../data/data.json');
var shots = require('../data/dribbble.json');

var helpers = require('./helpers');
var _ = require('lodash');

/*
  App
*/
var App = React.createClass({
  getInitialState: function() {
    return {
      shots: {},
      layout: "tile"
    };
  },
  componentDidMount: function() {
    /*dribbble.setToken('560f36d81a5578ba55181eab2fb35080cd907fc97149a9a49afa3083721ae445');
    dribbble.teams('facebook').shots().then(function(res) {
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
  render: function() {
      return (
        <div className="App">
          <Sidebar name={ data.site.name }
                   tagline={ data.site.tagline }
                   bio={ data.site.bio } />
          <Work works={ data.works }
                shots={ this.state.shots }
                layout={ this.state.layout }
                changeLayout={ this.changeLayout } />
        </div>
      )
  }
})



/*
  Sidebar
*/
var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="Sidebar">
        <h1>{ this.props.name }</h1>
        <h3>{ this.props.tagline }</h3>
        <p className="bio">{ this.props.bio }</p>
        <p className="Copyright">Copyright &copy; 2015 { this.props.name }</p>
      </div>
    )
  }
});


/*
  Work
*/
var Work = React.createClass({
  handleLayoutEvent: function(e) {
    this.props.changeLayout(e.target.value);
  },
  render: function() {
    if (_.size(this.props.shots) === 0) {
      return <div/>;
    }
    
    /* var tags = [];
    _.each(this.props.shots, function(shot) {
      _.each(shot.tags, function(tag) {
        tags.push(tag);
      });
    });

    var TagNodes = tags.map(function(tag) {
      return(
        <option value={ tag }>{ tag }</option>
      )
    }); */

    var layout;

    if (this.props.layout === "tile") {
      layout = TileLayout;
    } else {
      layout = ListLayout;
    }

    var WorkNodes = this.props.shots.map(function(shot) {
      return (
        <WorkItem key={ shot.id }
                  title={ shot.title } 
                  image={ shot.images.teaser }
                  views_count={ shot.views_count }
                  layout={ layout } />
      );
    }.bind(this));

    return (
      <div className="Work">
        {/* <select>
          { TagNodes }
        </select> */}
        <select value={ this.props.layout } onChange={ this.handleLayoutEvent }>
          <option value="tile">Tile</option>
          <option value="list">List</option>
        </select>
        { WorkNodes }
      </div>
    )
  }
});

var WorkItem = React.createClass({
  render: function() {
    return (
      <this.props.layout { ...this.props } />
    )
  }
});

var TileLayout = React.createClass({
  render: function() {
    return(
      <div className="WorkItem">
        <img src={ this.props.image } />
        <h3>{ this.props.title }</h3>
      </div>
    )
  }
});

var ListLayout = React.createClass({
  render: function() {
    return(
      <div className="WorkItem">
        <img src={ this.props.image } />
        <h3>{ this.props.title }</h3>
        <h4>{ this.props.views_count }</h4>
      </div>
    )
  }
});



ReactDOM.render(<App />, document.querySelector('#main'));