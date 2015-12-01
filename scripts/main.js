var React = require('react');
var ReactDOM = require('react-dom');

var aja = require('aja');

var Sidebar = require('./components/Sidebar.jsx');
var Work = require('./components/Work.jsx');

var App = React.createClass({
  getInitialState: function() {
    return {
      data: [],
    };
  },
  componentDidMount: function() {
    aja().url('/data/data.json').on('success', function (data) {
      this.setState({
        data: data
      });
    }.bind(this)).go();
  },
  render: function() {
    var data = this.state.data;

    if(data.length < 1) {
      return <p>Loading...</p>
    } else {
      return (
        <div className="App">
          <Sidebar name={ data.site.name } tagline={ data.site.tagline } />
          <Work />
        </div>
      )
    }
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('main')
)