import React, { Component } from 'react';

class WorkItem extends Component {
  render() {
    return <this.props.layout {...this.props} />;
  }
}

export default WorkItem;
