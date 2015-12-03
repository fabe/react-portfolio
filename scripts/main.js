var React = require('react');
var ReactDOM = require('react-dom');

var data = require('../data/data.json');

var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Redirect = ReactRouter.Redirect;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var marked = require('marked');
var helpers = require('./helpers');


/*
  App
*/
var App = React.createClass({
  getInitialState: function() {
    return { tag: "" }
  },
  handleTag: function(tag) {
    this.setState({
      tag: tag
    })
  },
  render: function() {
      return (
        <div className="App">
          <Sidebar name={ data.site.name }
                   tagline={ data.site.tagline }
                   bio={ data.site.bio }
                   pages={ data.pages }
                   works={ data.works }
                   extra={ this.props.params }
                   handleTag={ this.handleTag } />
          { this.props.children || <Work works={ data.works } tag={ this.state.tag } /> }
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
        <h1>
          <Link to="/" onClick={ this.props.handleTag.bind(null, "") }>{ this.props.name }</Link>
        </h1>
        <h3>{ this.props.tagline }</h3>
        <p className="bio">{ this.props.bio }</p>
        <Navigation pages={ this.props.pages } />
        <SidebarInfo extra={ this.props.extra } />
        { this.props.children || <SidebarFilter works={ data.works } extra={ this.props.extra } handleTag={ this.props.handleTag } /> }
        <p className="Copyright">Copyright &copy; 2015 { this.props.name }</p>
      </div>
    )
  }
});

var SidebarInfo = React.createClass({
  render: function() {
    if(this.props.extra.project) {
      var project = data.works[this.props.extra.project];
      var html = {
        __html: marked(project.content)
      };
      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      var date = monthNames[new Date(project.date).getMonth()];
      var year = new Date(project.date).getFullYear();
      return (
        <div className="SidebarInfo">
          <h2>{ project.title }</h2>
          <p dangerouslySetInnerHTML={html} />
          { project.client ?
              <h3>Client: { project.client }</h3> :
              null
          }
          <h3>Date: { date + ' ' + year}</h3>
          <h3>Tags: <Tags tags={ project.tags } /></h3>
        </div>
      )
    } else {
      return <p></p>;
    }
  }
});

var SidebarFilter = React.createClass({
  render: function() {
    if(Object.keys(this.props.extra).length > 0) {
      return false;
    }

    var allTags = [];

    Object.keys(this.props.works).map(function(key) {
      var tempTags = [];
      tempTags = tempTags.concat(this.props.works[key].tags)
      allTags = allTags.concat(tempTags).filter(function (v, i, a) { return a.indexOf (v) == i });
    }.bind(this));

    var tagNodes = allTags.map(function(tag) {
      return (
        <SidebarFilterItem key={ helpers.slugify(tag) }
                           title={ tag } 
                           slug={ helpers.slugify(tag) }
                           handleTag={ this.props.handleTag } />
      )
    }.bind(this));

    return(
      <ul className="TagNavigation">
        <h3>Tags</h3>
        { tagNodes }
      </ul>
    );
  }
});

var SidebarFilterItem = React.createClass({
  mixins : [History],
  navigate: function(slug) {
    this.history.pushState(null, slug);
  },
  render: function() {
    return (
      <li>
        <a href="#" onClick={ this.props.handleTag.bind(null, this.props.title) }>
          { this.props.title }
        </a>
      </li>
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
                        slug={ helpers.slugify(this.props.pages[key].slug) } />
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
        <Link to={ '/' + this.props.slug }>
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
    var WorkNodes = Object.keys(this.props.works).map(function(key) {
      if(this.props.tag != "") {
        if(this.props.works[key].tags.indexOf(this.props.tag)== -1) {
          return false;
        }
      }     
      
      var project = this.props.works[key];
      return (
          <WorkItem key={ key }
                    title={ project.title } 
                    image={ project.image }
                    tags={ project.tags }
                    slug={ project.slug } />
        );
    }.bind(this));
    return (
      <div className="Work">
        { WorkNodes }
      </div>
    )
  }
});

var WorkItem = React.createClass({
  render: function() {
    return (
      <div className="WorkItem">
        <Link to={ '/work/' + this.props.slug }>
          <img src={ this.props.image } />
          <h3>{ this.props.title }</h3>
        </Link>
        <Tags tags={ this.props.tags } />
      </div>
    )
  }
});

var Tags = React.createClass({
  render: function() {
    var tags = this.props.tags.map(function(item) {
      return <span key={ item }>{ item }</span>
    });
    return (
      <div className="Tags">
        { tags }
      </div>
    );
  }
});

var WorkSingle = React.createClass({
  render: function() {
    var project = data.works[this.props.params.project];
    var images = project.images.map(function(item, i) {
      return <img key={ i } src={ item }/>
    });
    return (
      <div className="Page WorkSingle">
        { images }
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
      <Route path="/work/:project" component={WorkSingle} />
      <Redirect from="/work" to="/" />
      <Route path="/:page" components={Default}/>
    </Route>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));