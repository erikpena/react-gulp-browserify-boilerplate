'use strict';

class Child extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Hello {this.props.first} {this.props.last}
      </div>
    );
  }
}

export default Child;
