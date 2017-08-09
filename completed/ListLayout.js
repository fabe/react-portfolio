import React, { Component } from 'react';

class ListLayout extends Component {
  render() {
    return (
      <section className="work-item list">
        <img src={this.props.image} />
        <h2>{this.props.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: this.props.description }} />
        <p className="likes">{this.props.likes}</p>
      </section>
    );
  }
}

export default ListLayout;
