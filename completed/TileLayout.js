import React, { Component } from 'react';

class TileLayout extends Component {
  render() {
    return (
      <section className="work-item tile">
        <img src={this.props.image} />
        <h3>{this.props.title}</h3>
      </section>
    );
  }
}

export default TileLayout;
