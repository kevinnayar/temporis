import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ExampleWithReact from './example-react';
import ExampleReactHooks from './example-react-hooks';
import ExampleReactHooksLog from './example-react-hooks-log';

function App() {
  return (
    <div className="app">
      <div className="section">
        <h1>React with Hooks with History</h1>
        <ExampleReactHooksLog />
      </div>
      <div className="section">
        <h1>React</h1>
        <ExampleWithReact />
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

