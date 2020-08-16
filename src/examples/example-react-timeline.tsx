import * as React from 'react';
import Temporis, { useTemporis } from '../index';

type Counter = { count: number };

const temporis = Temporis<Counter>();
const initialState: Counter = { count: 1 };
temporis.pushOne(initialState);

export default function ExampleReactTimeline() {
  const { items, pushOne, undo, redo, history } = useTemporis<Counter>(temporis, initialState);

  const increment = () => {
    const count = items.count + 1;
    pushOne({ count });
  }

  const decrement = () => {
    const count = items.count - 1;
    pushOne({ count });
  }

  return (
    <div className="app">
      <div className="controls">
        <div className="actions">
          <button className="action-btn" onClick={increment}>
            + <span>Add</span>
          </button>
          <button className="action-btn" onClick={decrement}>
            - <span>Subtract</span>
          </button>
          <button className="action-btn" onClick={undo}>
            &#8592; <span>Undo</span>
          </button>
          <button className="action-btn" onClick={redo}>
            &#8594; <span>Redo</span>
          </button>
        </div>
      </div>
      <div className="preview">
        <div className="timeline">
          {history.map((item, i) => {
            return (
              <div key={i} className={`timeline-item ${item.isCurrent ? 'active' : 'inactive'}`}>
                <pre>
                  {JSON.stringify(item, null, 2)}
                </pre>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
