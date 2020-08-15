import * as React from 'react';
import { useState } from 'react';
import Temporis from '../index';

type Items = {
  name: string;
  color: string;
  fontSize: string;
};

// needs to be outside of the component in order
// to maintain state outside of re-renders
const temporis = Temporis<Items>();

const initialState: Items = {
  name: 'Hello, World!',
  color: 'red',
  fontSize: '24',
};

temporis.pushOne(initialState);

export default function ExampleReact() {
  const [items, setItems] = useState<Items>(initialState);

  function pushOne(items: Items) {
    temporis.pushOne(items);
    setItems(items);
  }

  function undo() {
    temporis.undo();
    const current = temporis.getCurrentItem();
    if (current) {
      setItems(current);
    }
  }

  function redo() {
    temporis.redo();
    const current = temporis.getCurrentItem();
    if (current) {
      setItems(current);
    }
  }

  return (
    <div className="app">
      <div className="controls">
        <div className="actions">
          <button className="action-btn" onClick={undo}>
            &#8592; <span>Undo</span>
          </button>
          <button className="action-btn" onClick={redo}>
            &#8594; <span>Redo</span>
          </button>
        </div>
        <div className="selections">
          <div className="selection">
            <p className="selection-title">Name</p>
            <input
              name="name"
              value={items.name}
              onChange={(e) => {
                pushOne({
                  name: e.target.value,
                  color: items.color,
                  fontSize: items.fontSize,
                });
              }}
            />
          </div>
          <div className="selection">
            <p className="selection-title">Color</p>
            <select
              className="selector-color"
              value={items.color}
              onChange={(e) => {
                pushOne({
                  name: items.name,
                  color: e.target.value,
                  fontSize: items.fontSize,
                });
              }}>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </div>
          <div className="selection">
            <p className="selection-title">Font Size</p>
            <select
              className="selector-font-size"
              value={items.fontSize}
              onChange={(e) => {
                pushOne({
                  name: items.name,
                  color: items.color,
                  fontSize: e.target.value,
                });
              }}>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="24">24</option>
              <option value="24">28</option>
              <option value="36">36</option>
              <option value="44">44</option>
            </select>
          </div>
        </div>
      </div>
      <div className="preview">
        <p
          style={{
            color: items.color,
            fontSize: `${items.fontSize}px`,
          }}>
          {items.name}
        </p>
      </div>
    </div>
  );
}
