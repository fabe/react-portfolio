var React = require('react');
var _ = require('lodash');
var WorkItem = require('./WorkItem');
var ListLayout = require('./ListLayout');
var TileLayout = require('./TileLayout');

var Work = React.createClass({
  handleLayoutEvent: function(e) {
    this.props.changeLayout(e.target.value);
  },
  handleShuffleEvent: function() {
    this.props.shuffleShots(1);
  },
  render: function() {
    if (_.size(this.props.shots) === 0) {
      return <div/>;
    }

    var layout;
    if (this.props.layout === "tile") {
      layout = TileLayout;
    } else {
      layout = ListLayout;
    }

    return (
      <div className="work">
        <div className="controls">
          <button onClick={ this.handleShuffleEvent }>Shuffle</button>
          <select value={ this.props.layout } onChange={ this.handleLayoutEvent }>
            <option value="tile">Tile</option>
            <option value="list">List</option>
          </select>
        </div>
        {this.props.shots.map(function(shot) { 
          return (
            <WorkItem
              key={ shot.id }
              title={ shot.title } 
              image={ shot.images.normal }
              description={ shot.description }
              link={ shot.html_url }
              likes={ shot.likes_count }
              layout={ layout }
            />
          );
        })}
      </div>
    );
  }
});

module.exports = Work;