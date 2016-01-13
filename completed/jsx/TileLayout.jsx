var React = require('react');

var TileLayout = React.createClass({
  render: function() {
    return (
      <div className="work__item tile">
        <img src={ this.props.image } />
        <h3>{ this.props.title }</h3>
      </div>
    )
  }
});

module.exports = TileLayout;