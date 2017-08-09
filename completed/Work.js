import React, { Component } from 'react';
import TileLayout from './TileLayout';
import ListLayout from './ListLayout';
import WorkItem from './WorkItem';

class Work extends Component {
  handleLayoutEvent(event) {
    this.props.changeLayout(event.target.value);
  }

  render() {
    // Check if data has been loaded from the API.
    if (this.props.shots.length === 0) {
      return (
        <div className="work">
          <h3>Loading...</h3>
        </div>
      );
    }

    // Set layout variable.
    let layout;
    if (this.props.layout === 'tile') {
      layout = TileLayout;
    } else {
      layout = ListLayout;
    }

    const shotNode = this.props.shots.map(shot => (
      <WorkItem
        image={shot.images.normal}
        title={shot.title}
        description={shot.description}
        likes={shot.likes_count}
        layout={layout}
        key={shot.id}
      />
    ));

    return (
      <div className="work">
        <div className="controls">
          <select value={this.props.layout} onChange={this.handleLayoutEvent.bind(this)}>
            <option value="tile">Tile</option>
            <option value="list">List</option>
          </select>
        </div>
        {shotNode}
      </div>
    );
  }
}

export default Work;
