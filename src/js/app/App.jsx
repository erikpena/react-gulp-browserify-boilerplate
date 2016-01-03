'use strict';

/*var React = require('react');
var ReactDOM = require('react-dom');
var _ = require("lodash");*/

var Child = require('./Child.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Child first="Erik" last="Pena"/>
      </div>
    )
  }
});

ReactDOM.render(<App />, document.getElementById('app'));

module.exports = App;
