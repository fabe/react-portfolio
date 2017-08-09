import React, { Component } from 'react';
import data from 'data/sample-api';
import site from 'data/site';
import Sidebar from './Sidebar';
import Work from './Work';
import dribbbleApi from './dribbbleApi';

class App extends Component {
  constructor() {
    super();

    this.state = {
      shots: [],
      site: site,
      layout: 'tile',
    };
  }

  componentDidMount() {
    dribbbleApi.shots('simplebits', shots => {
      this.setState({ shots });
    });
  }

  changeLayout(layout) {
    this.setState({
      layout,
    });
  }

  render() {
    return (
      <div className="app">
        <Sidebar
          name={this.state.site.name}
          tagline={this.state.site.tagline}
          bio={this.state.site.bio}
        />
        <Work
          shots={this.state.shots}
          layout={this.state.layout}
          changeLayout={this.changeLayout.bind(this)}
        />
      </div>
    );
  }
}

export default App;
