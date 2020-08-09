import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ExampleWithReact from './example-with-react';
import ExampleWithReactHooks from './example-with-react-hooks';

function App() {
  return (
    <div className="app">
      <div className="section">
        <h1>React</h1>
        <ExampleWithReact />
      </div>
      <div className="section">
        <h1>React with Hooks</h1>
        <ExampleWithReactHooks />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

