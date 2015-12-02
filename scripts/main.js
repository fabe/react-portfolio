var React = require('react');
var ReactDOM = require('react-dom');

var data = require('../data/data.json');

var Sidebar = require('./components/Sidebar.jsx');
var Work = require('./components/Work.jsx');

var App = React.createClass({
  render: function() {
      return (
        <div className="App">
          <Sidebar name={ data.site.name }
                   tagline={ data.site.tagline }
                   pages={ data.pages } />
          <Work />
        </div>
      )
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('main')
)