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

    var WorkItems = [];
    _.each(this.props.shots, function(shot) {   
      WorkItems.push(
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
    });

    return (
      <div className="work">
        <div className="controls">
          <button onClick={ this.handleShuffleEvent }>Shuffle</button>
          <select value={ this.props.layout } onChange={ this.handleLayoutEvent }>
            <option value="tile">Tile</option>
            <option value="list">List</option>
          </select>
        </div>
        { WorkItems }
      </div>
    );
  }
});

module.exports = Work;