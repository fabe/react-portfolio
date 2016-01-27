var React = require('react');

var TileLayout = React.createClass({
  render: function() {
    return (
      <section className="work-item tile">
        <img src={ this.props.image } />
        <h3>{ this.props.title }</h3>
      </section>
    );
  }
});

module.exports = TileLayout;
