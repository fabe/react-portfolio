var React = require('react');
var TileLayout = require('./TileLayout');
var ListLayout = require('./ListLayout');
var WorkItem = require('./WorkItem');

var Work = React.createClass({
  handleLayoutEvent: function(event) {
    this.props.changeLayout(event.target.value);
  },
  render: function() {
    if(!this.props.shots) {
      return (
        <div className="work">
          <h3>Loading...</h3>
        </div>
      );
    }

    var layout;
    if(this.props.layout === "tile") {
      layout = TileLayout;
    } else {
      layout = ListLayout;
    }

    var shotData = this.props.shots.map(function(shot) {
      return (
        <WorkItem
          image={ shot.images.normal }
          title={ shot.title }
          description={ shot.description }
          likes={ shot.likes_count }
          layout={ layout }
          key={ shot.id }
        />
      );
    });

    return (
      <div className="work">
        <div className="controls">
          <select value={ this.props.layout } onChange={ this.handleLayoutEvent }>
            <option value="tile">Tile</option>
            <option value="list">List</option>
          </select>
        </div>
        { shotData }
      </div>
    )
  }
});

module.exports = Work;