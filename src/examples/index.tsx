import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ExampleReact from './example-react';
import ExampleReactHooks from './example-react-hooks';

function App() {
  return (
    <div className="app">
      <div className="section">
        <h1>React</h1>
        <ExampleReact />
      </div>
      <div className="section">
        <h1>React with Hooks</h1>
        <ExampleReactHooks />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
