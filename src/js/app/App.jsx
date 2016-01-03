'use strict';

import Child from './Child.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Child first="Erik" last="Pena"/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
