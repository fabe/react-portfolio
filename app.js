require("babel-core/register")({
  presets: "react"
});

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var _ = require('lodash');
var fs = require('fs');

var baseTemplate = fs.readFileSync('./template.html');
var ClientApp = require('./jsx/index.jsx');

app.use('/', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  var rendered = ReactDOMServer.renderToString(React.createElement(ClientApp));
  res.send(_.template(baseTemplate)({body:rendered}));
});

server.listen(3000);