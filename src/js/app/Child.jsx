'use strict';

/*var React = require('react');*/

var Child = React.createClass({
  render: function(){
    return (
      <div>
        Hello {this.props.first} {this.props.last}
      </div>
    );
  }
});

module.exports = Child;
