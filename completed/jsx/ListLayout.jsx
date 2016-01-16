var React = require('react');

var ListLayout = React.createClass({
  renderDescription: function() {
    return {
      __html: this.props.description
    }
  },
  render: function() {
    return (
      <section className="work__item list">
        <img src={ this.props.image } />
        <h2>{ this.props.title }</h2>
        <div dangerouslySetInnerHTML={ this.renderDescription() } />
        <p className="likes">{ this.props.likes }</p>
      </section>
    )
  }
});

module.exports = ListLayout;