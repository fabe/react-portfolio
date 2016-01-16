var React = require('react');
var TileLayout = require('./TileLayout');
var ListLayout = require('./ListLayout');
var WorkItem = require('./WorkItem');

var Work = React.createClass({
  handleLayoutEvent: function(event) {
    this.props.changeLayout(event.target.value);
  },
  handleShuffleEvent: function() {
    this.props.shuffle(1);
  },
  render: function() {
    if(Object.keys(this.props.shots).length === 0) {
      return (
        <div className="work">
          <h3>Loading...</h3>
        </div>
      )
    }

    var layout;

    if(this.props.layout === "tile") {
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
        { this.props.shots.map(function(shot) {
          return (
            <WorkItem
              image={ shot.images.normal }
              title={ shot.title }
              description={ shot.description }
              likes={ shot.likes_count }
              layout={ layout }
              key={ shot.id }
            />
          )
        }) }
      </div>
    )
  }
})

module.exports = Work;