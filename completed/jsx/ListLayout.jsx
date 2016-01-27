var React = require('react');

var ListLayout = React.createClass({
  render: function() {
    return (
      <section className="work-item list">
        <img src={ this.props.image } />
        <h2>{ this.props.title }</h2>
        <div dangerouslySetInnerHTML={ { __html: this.props.description } } />
        <p className="likes">{ this.props.likes }</p>
      </section>
    );
  }
});

module.exports = ListLayout;
