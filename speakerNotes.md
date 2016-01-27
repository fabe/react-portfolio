# I heard React was good
## The files
Let's take a look at the files inside our project first. Note that there are two folders with the same structure: `completed/` is, the name says it, the already completed project. You can find the same files but empty inside the `empty/` folder.

### gulpfile.js
Gulp is a big topic and actually a workshop on its own. Gulp is a tool, or build system, that takes care of our Javascript and allows us to be modular (we'll seperate our code into different files). It also takes care of the CSS/SASS, but that's not the topic of this workshop. Take a look into this file if you're curious.

### sass/, css/ and index.html
This is nothing special. Since we'll this is not a CSS workshop, I already set up some CSS for you. If you want to edit it, browse into the `sass/` directory and edit the `style.scss` file. Make sure gulp is running! The `index.html` file only pulls in a stylesheet and our compiled Javascript, so nothing new or exciting here.

### site.json & sample-data.json
This is just dummy data. `sample-data.json` is from an actual [Dribbble API](http://developer.dribbble.com/v1/) request, `site.json` is for things like site title and description. Later we'll cover how to request the Dribbble API.

### Also
During the workshop, you will not be required to create new files, all of that is set up in the `empty/` directory. Feel free to take a quick look inside the `completed/` directory every now and then, if you need to.

## Getting started
First things first, after cloning the repo you will have to [install Node.js](https://nodejs.org/en/). Go for the stable one. Then, `cd` into the cloned repository and do an `npm install`. This will install all of our dependencies. After that, do `npm start` to start the workshop!

I also suggest you to install the [Atom React Plugin](https://orktes.github.io/atom-react/), which will give you the correct syntax highlighting and makes development less complex.

In any case, you should end up with a white page that says "not rendered :(". If you see that, it's high time to render something!

### jsx/index.jsx
```javascript
var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      <h1>rendered yoo</h1>
    )
  }
});

module.exports = App;
```

This is pretty much the most basic React code you can get. This is how you create a component, in this case our first component is called `App`.

- We need to require React before using it. After this workshop you will know the ins and outs of requiring modules.
- Every components needs to have a render method, which returns either another component or a React element (JSX, HTML).
- You cannot render two seperate elements (let's say two seperate divs). They always have to be wrapped in one parent element.
- We export the `App` component (or module) at the end of the file. We'll do that for every component that follows, so that we can import that component whenever we need it at other places.

### jsx/client.jsx
```javascript
var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./index');

ReactDOM.render(<App />, document.querySelector('#main'));
```

If you reload your browser, you won't see any changes. That's because the component isn't actually being rendered. This file will take care of that and won't change for the rest of this project.

- We need to require React again, together with ReactDOM.
- ReactDOM is at its core an extension to React. Since we can also use React for native apps, React and ReactDOM are seperated modules. But we do want to work in the browser - that is the DOM - so we need to require it.
- We also have to grab/require the component we just created, called `App`.
- Finally, we tell ReactDOM to render our `<App/>` component inside the #main div in the `index.html` file.
- Time to reload your browser!

### jsx/index.jsx
```javascript
// start add at the top
var shots = require('./sample-api');
// end add at the top

// start state method (above render)
getInitialState: function() {
  return {
	shots: shots
  }
},
// end state method (above render)

// start render method
render: function() {
  var shotData = this.state.shots.map(function(shot) {
    return (
      <h1>{ shot.data }</h1>
    );
  });
  return (
    <div className="app">
      <div className="work">
    	{ shotData }
      </div>
    </div>
  )
}
// end render method
```

Let's start to work with some basic data.

- We pull in the dribbble data at the top and set it as state inside React's `getInitialState` method.
- We add some basic html in our render method. Notice that we use `className` instead of the usual `class` to add a CSS class. That's because class is a reserved word in Javascript, so keep that in mind when using JSX!
- Notice the `{}` in the markup. With that we tell JSX that inside these brackets there's a Javascript expression.
- Javascript's built in `.map` function loops through our dribbble state data and returns an `h1` with the title of each shot.
- Take a look at it in the browser!

### jsx/Sidebar.jsx
```javascript
var React = require('react');

var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="sidebar">
        <h1>Ron Swanson</h1>
        <h3>Interface Designer, Frontend Developer</h3>
        <p className="sidebar-bio">Hello, my name is Ron Swanson. Normally I try never to speak with people, but I've been drinking this Snake Juice thing, and it's damn good.</p>
        <p className="sidebar-copyright">Copyright &copy; 2015 Ron Swanson</p>
      </div>
    )
  }
});

module.exports = Sidebar;
```

Let's create a second component called Sidebar. It contains some information about our site.

- Require React and create a new component. That should already be familiar to you.
- We then add some basic markup in our render method. Remember to use `className` for the CSS classes!

### jsx/index.jsx
```javascript
// start add at the top
var Sidebar = require('./Sidebar');
var site = require('./site');
// end add at the top

// start state method (above render)
getInitialState: function() {
  return {
	shots: shots,
	site: site
  }
},
// end state method (above render)

// start render method
render: function() {
  var shotData = this.state.shots.map(function(shot) {
    return (
      <h1>{ shot.data }</h1>
    );
  });
  return (
    <div className="app">
      <Sidebar
        name={ this.state.site.name }
        tagline={ this.state.site.tagline }
        bio={ this.state.site.bio }
      />
      <div className="work">
        { shotData }
      </div>
    </div>
  )
}
// end render method
```
Now we pull in the Sidebar component into our App component, so that we can render the Sidebar in our markup.

- Notice that I put some attributes into the Sidebar tag. These things are called props and exist to pass on data from a parent component into a child component. In this case, we take the freshly created `site` state and pass on some of that data into our Sidebar component.
- Props are important in React. You will end up using them all the time, even more often than state. For now, just remember them as atrrubutes for a component.

### jsx/Sidebar.jsx
```javascript
// start render method
render: function() {
  return (
    <div className="sidebar">
      <h1>{ this.props.name }</h1>
      <h3>{ this.props.tagline }</h3>
      <p className="sidebar-bio">{ this.props.bio }</p>
      <p className="sidebar-copyright">Copyright &copy; 2015 { this.props.name }</p>
    </div>
  )
}
// end render method
```
The props we just passed on from our `App` component can be used in our `Sidebar` now! Go ahead and change some details inside the `site.json` file to make sure it works.

### jsx/Work.jsx
```javascript
var React = require('react');

var Work = React.createClass({
  render: function() {
    var shotData = this.props.shots.map(function(shot) {
      return (
        <h1>{ shot.data }</h1>
      );
    });
    return (
      <div className="work">
        { shotData }
      </div>
    )
  }
});

module.exports = Work;
```

Awesome, we've got ourselves a sleek sidebar. Now back to our work section. Instead of rendering our work items / shots inside the `App` component, we create a specific component for that, called `Work`.

- Notice that the `.map` function is essentially the same as in `index.jsx`. You can copy and paste it. **Instead of using state, we will be using props** to pass on the shots from `App` to `Work`. Be sure to change that in the function.

### jsx/index.jsx
```javascript
// start add at the top
var Work = require('./Work');
// end add at the top

// start render method
render: function() {
  return (
    <div className="app">
      <Sidebar
        name={ this.state.site.name }
        tagline={ this.state.site.tagline }
        bio={ this.state.site.bio }
      />
      <Work
        shots={ this.state.shots }
      />
    </div>
  )
}
// end render method
```
Now we can use the `Work` component. Don't forget to require it! We now pass on the shots state to our `Work` component, using props. That looks much cleaner!

- This should essentially not look any different from before, this will make more sense later.

### jsx/TileLayout.jsx
```javascript
var React = require('react');

var TileLayout = React.createClass({
  render: function() {
    return (
      <section className="work-item tile">
        <img src={ this.props.image } />
        <h3>{ this.props.title }</h3>
      </section>
    )
  }
});

module.exports = TileLayout;
```
A portfolio without images is 💩. Let's create a template for a shot, that displays an image and a title.

- Like before, we start by *inventing* data. That's very common with React, you could say it's reverse engineering. `this.props.image` doesn't exist yet. But we still use it! It's just important to feed our component with that data later on.

### jsx/Work.jsx
```javascript
// start add at the top
var TileLayout = require('./TileLayout');
// end add at the top

// start render method
render: function() {
  var shotData = this.props.shots.map(function(shot) {
    return (
      <TileLayout
        title={ shot.title }
        image={ shot.images.normal }
        key={ shot.id }
      />
    );
  });
  return (
    <div className="work">
      { shotData }
    </div>
  )
}
// end render method
```
Now we actually feed our `TileLayout` with the data, or the props, it wants to use, from our `Work` component.

- Notice the `key` props. That one is for React only. It's like an ID in a database, you need it to directly reference an item in a data set. It's not an requirement, but React will warn you in the console. In this case, we can use the id from the dribbble.json.
- Now we should have a nice looking layout.

## Changing Layouts
Right now, we have a typical porfolio with a nice tile layout. But we won't be stopping there. In order to show a little more data, we'll create a list layout and make it possible to switch between both.

### jsx/ListLayout.jsx
```javascript
var React = require('react');

var ListLayout = React.createClass({
  render: function() {
    return(
      <section className="work-item list">
        <img src={ this.props.image } />
        <h2>{ this.props.title }</h2>
        <div>{ this.props.description }</div>
        <p className="likes">{ this.props.likes }</p>
      </section>
    )
  }
});

module.exports = ListLayout;
```
This is nothing new, a component that renders some markup with props. Notice that we invented data again! The props `description` and `likes` don't exist yet.

If you look at this in your browser, you can see that the description contains HTML markup. That's because React doesn't like rendering HTML from strings, because it could be a security issue. We'll need to make some rather ugly workarounds that allows us to render that HTML.

```javascript
render: function() {
  return(
    <section className="work-item list">
      <img src={ this.props.image } />
      <h2>{ this.props.title }</h2>
      <div dangerouslySetInnerHTML={ { __html: this.props.description } } />
      <p className="likes">{ this.props.likes }</p>
    </section>
  )
}
```

React really wants to make it hard for developers to make this work. What happened? Instead of simply rendering `this.props.description`, we have to put that part in a method and call it in a props called `dangerouslySetInnerHTML`. This method needs to return an object with the key `__html`.

Once you've used this once or twice, this won't be as complicated to you as before. If this really upsets you, [read more about it in the official documentation](https://facebook.github.io/react/tips/dangerously-set-inner-html.html).

### jsx/Work.jsx
```javascript
// start add at the top
var ListLayout = require('./ListLayout');
// end add at the top

// start layout event
handleLayoutEvent: function(event) {
  console.log(event.target.value);
},
// end layout event

// start render method
render: function() {
  var shotData = this.props.shots.map(function(shot) {
    return (
      <TileLayout
        title={ shot.title }
        image={ shot.images.normal }
        key={ shot.id }
      />
    );
  });
  return (
    <div className="work">
      <div className="controls">
        <select value={ this.props.layout } onChange={ this.handleLayoutEvent }>
          <option value="tile">Tile</option>
          <option value="list">List</option>
        </select>
      </div>
      { shotData }
    </div>
  )
}
// end render method
```

- Notice that now the `description` and `likes` props are also passed to our Layout component.
- Now you can switch between the `ListLayout` and `TileLayout` by changing the code. That's not user friendly though. Let's change that!
- To change the layout we'll be using a `<select>` element. Add that to our markup, just above the `.map` function.
- Notice the `onChange` props in our `<select>` element? In there we can execute a function as soon as the selected value changes. That event props could also be `onClick` for example.
- The function, or rather method, that we execute once the user selects a different value is called `handleLayoutEvent`, but you could call it anything. We add that method above render and log the value of the `<select>` element for now.

### jsx/index.jsx
```javascript
// start state method
getInitialState: function() {
  return {
    shots: shots,
    site: site,
    layout: "tile"
  }
},
// end state method

// start render method
render: function() {
  return (
    <div className="app">
      <Sidebar
        name={ this.state.site.name }
        tagline={ this.state.site.tagline }
        bio={ this.state.site.bio }
      />
      <Work
        shots={ this.state.shots }
        layout={ this.state.layout }
      />
    </div>
  )
}
// end render method
```
- We now create a layout state, that holds either "list" or "tile". We pass that state on to our `Work` component by using a new props.

### jsx/Work.jsx
```javascript
// start layout event
handleLayoutEvent: function(event) {
  this.props.changeLayout(event.target.value);
},
// end layout event
```
- Now we come to a problem that's very common in React. We want to tell a component that something changed. How do we do that? We use props.
- First up, we invent a props again, specifically `changeLayout`. We use it to *broadcast* changes inside the component. `App` will pick up the props change and act upon it.

### jsx/index.jsx
```javascript
// start changeLayout method
changeLayout: function(layout) {
  this.setState({
    layout: layout
  });
},
// end changeLayout method

// start render method
render: function() {
  return (
    <div className="app">
      <Sidebar
        name={ this.state.site.name }
        tagline={ this.state.site.tagline }
        bio={ this.state.site.bio }
      />
      <Work
        shots={ this.state.shots }
        layout={ this.state.layout }
        changeLayout={ this.changeLayout }
      />
    </div>
  )
}
// end render method
```
- Notice the new props changeLayout in our `Work` component. With adding this, we listen to changes to that props. As soon as it changes inside the `Work` component, we call `this.changeLayout` and use `this.setState()` to change the layout state of `App`.
- **In React, a component is re-rendered when state has changed.** You can change props all you want, but that does not re-render anything. This is important when making the decision whether to use props or state.
- In this case, we want to re-render the `Work` component with a different layout when a different layout is selected, and that's why we need to maintain a state in our `App` for that.

### jsx/Work.jsx
```javascript
// start add at the top
var WorkItem = require('./WorkItem');
// end add at the top

// start render method
render: function() {
  var layout;
  if (this.props.layout === "tile") {
    layout = TileLayout;
  } else {
    layout = ListLayout;
  }
  
  var shotData = this.props.shots.map(function(shot) {
    return (
      <WorkItem
        title={ shot.title }
        image={ shot.images.normal }
        key={ shot.id }
        description={ shot.description }
        likes={ shot.likes_count }
        layout={ layout }
      />
    );
  });
  
  return (
    <div className="work">
      <div className="controls">
        <select value={ this.props.layout } onChange={ this.handleLayoutEvent }>
          <option value="tile">Tile</option>
          <option value="list">List</option>
        </select>
      </div>
      { shotData }
    </div>
  )
}
// end render method
```
- In order to change the layout depending on the props, we need to use another component that makes the decision to use the list or the tile layout. It will be called `WorkItem`. We didn't create it yet, we just invented it.
- So instead of `TileLayout` or `ListLayout`, we're going with `WorkItem`. Simply swap the tag!
- We're also giving `WorkItem` a new props: layout. It holds a variable that refrences either our `TileLayout` or `ListLayout`. A basic if/else statement based on `Work`'s layout props is enough.

### jsx/WorkItem.jsx
```javascript
var React = require('react');

var WorkItem = React.createClass({
  render: function() {
    return (
      <this.props.layout { ...this.props } />
    )
  }
});

module.exports = WorkItem;
```
- Okay, I know this looks weird. Remember what we saved in the layout props? A reference to either our `TileLayout` or `ListLayout` component. Therefore we can use `this.props.layout` as our component tag. React is smart enough to fill in the correct one.
- `{ ...this.props }` basically allows us to take **all** of the `WorkItem` props and pass them into the layout components. That's really neat and saves us some time! In this case it makes a lot of sense to use this feature, but keep in mind that you shouldn't use it all the time. It's not very performant.
- That's all this component needs!
- Check it out in the browser. You should now be able to switch between layouts!

## Using an API
Childs play, you say? Now we will look into using a real API/backend for our React app. Fortunately for us, there is a Dribbble API wrapper available that we can use to get the shots.

### jsx/index.jsx
```javascript
// start at the top
window.jQuery = require('jquery');
var jribbble = require('jribbble');
// end at the top

// start state method
getInitialState: function() {
  return {
    shots: {},
    site: site,
    layout: "tile"
  }
},
// end state method

// start above the render method
componentDidMount: function() {
  jQuery.jribbble.setToken('YOUR_DRIBBBLE_TOKEN');
  jQuery.jribbble.users('rokis').shots().then(function(res) {
    this.setState({
      shots: res
    });
  }.bind(this));
},
// end above the render method
```
- The `componentDidMount` is called by React once the component is mounted, that's if it is in use. We don't want to make the call to the API in the `render` method since that would mean an API call every time the layout is changed. This way we only do it once.
- First we include jQuery globally, because it is a dependency of jribbble, the API wrapper.
- Our initial `shots` state should now be an empty object, it will be filled with data by the API.
- We need to set an API token to make API calls. You can register a token in your [dribbble account settings](https://dribbble.com/account/applications) (a token was provided in the workshop).
- Then we can request the `.shots()` of `.users()`. For more information on how to use the wrapper, visit its [documentation](https://github.com/tylergaw/jribbble).
- Once we got the shots, we use the `setState()` method again to update our shots.
- `.bind(this)` allows us to use `this` inside the API call. Otherwise the function would refrence itself, and not the `App` component.

### jsx/Work.jsx
```javascript
render: function() {
  if (Object.keys(this.props.shots).length) === 0) {
    return <p>Loading</p>;
  }
  
  // and so on...
});
```
- You'll notice that the API call doesn't work yet. Actually, our whole React app crashes. That's because before the API call was made, React tries to render our components with the empty `shots` object. We need to make sure nothing, or in this case a loading message, is rendered. As soon as the API call was successfully made, we swap out the empty object for the real data and render again.

## Wrapping up
Okay, that's all I've got. You now have a neat little portfolio with a Dribbble integration, and the best, it's static! Now you could upload the `index.html` and the `build/` folder to your server, that's all there's left!