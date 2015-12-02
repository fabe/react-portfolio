var React = require('react');
var ReactDOM = require('react-dom');

var data = require('../data/data.json');

var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var marked = require('marked');


/*
  App
*/
var App = React.createClass({
  render: function() {
      return (
        <div className="App">
          <Sidebar name={ data.site.name }
                   tagline={ data.site.tagline }
                   pages={ data.pages } />
          { this.props.children || <Work/> }
        </div>
      )
  }
})



/*
  Sidebar
*/
var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="Sidebar">
        <h1>{ this.props.name }</h1>
        <h3>{ this.props.tagline }</h3>
        <Navigation pages={ this.props.pages } />
      </div>
    )
  }
});


/*
  Navigation
*/
var Navigation = React.createClass({
  render: function() {
    var NavigationNodes = Object.keys(this.props.pages).map(function(key) {
      return (
        <NavigationItem key={ key }
                        title={ this.props.pages[key].title } 
                        slug={ this.props.pages[key].slug } />
      );
    }.bind(this));
    return (
      <ul className="Navigation">
        { NavigationNodes }
      </ul>
    )
  }
});

var NavigationItem = React.createClass({
  mixins : [History],
  navigate: function(slug) {
    this.history.pushState(null, slug);
  },
  render: function() {
    return (
      <li>
        <Link to={ this.props.slug } activeClassName="active">
          { this.props.title }
        </Link>
      </li>
    )
  }
});



/*
  Work
*/
var Work = React.createClass({
  render: function() {
    return (
      <div className="Sidebar">
        <p>Work</p>
      </div>
    )
  }
});


/*
  Default
*/
var Default = React.createClass({
  render: function() {
    var page = data.pages[this.props.params.page];
    var html = {
      __html: marked(page.content)
    };
    return (
      <div className="Page">
        <h2>{ page.title }</h2>
        <div dangerouslySetInnerHTML={html}></div>
      </div>
    )
  }
});



/*
  Routes
*/
var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <Route path="/:page" component={Default}/>
    </Route>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));