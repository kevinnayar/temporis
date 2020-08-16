# ⏰ temporis 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

An intuitive and lightweight approach to constructing timelines. Allows you to capture a **history of app state** as immutable snapshots and implement **undo** and **redo** with predictability and ease. 

Under **8KB** minified / Under **3KB** minified + gzipped.

**Undo/Redo**

![Undo/Redo](https://github.com/kevinnayar/temporis/blob/main/src/assets/undo-redo.gif?raw=true)

**Visualizing the history of actions**

![History](https://github.com/kevinnayar/temporis/blob/main/src/assets/history-timeline.gif?raw=true)

#### [&rarr; &nbsp; 💾 &nbsp; Installation](#Installation)

#### [&rarr; &nbsp; 👍 &nbsp; Usage](#Usage)

#### [&rarr; &nbsp; 💻 &nbsp; API](#API)

## Installation
`npm install temporis` &nbsp; or &nbsp; `yarn add temporis`

## Usage

### Vanilla JS

```ts
import Temporis from 'temporis';

const temporis = Temporis();

// Push complete state with each action
temporis.pushOne({ id: 'foo', name: 'Foo', color: 'red', size: 28 }); // 1st
temporis.pushOne({ id: 'foo', name: 'Foo', color: 'green', size: 36 }); // 2nd
temporis.pushOne({ id: 'foo', name: 'Foo', color: 'blue', size: 44 }); // 3rd

let currentItem = temporis.getCurrentItem(); // returns 3rd item

temporis.undo();
temporis.undo();

currentItem = temporis.getCurrentItem(); // returns 1st item

temporis.redo();

currentItem = temporis.getCurrentItem(); // returns 2nd item
```

### React

```tsx
import * as React from 'react';
import Temporis, { useTemporis } from 'temporis'; 

const temporis = Temporis();
temporis.pushOne({ name: 'Hello, World!' });

export default function App() {
  const { items, pushOne, undo, redo } = useTemporis(temporis, initialState);

  return (
    <div className="app">
      <button className="action-btn" onClick={undo}>Undo</button>
      <button className="action-btn" onClick={redo}>Redo</button>

      <input
        className="name-input"
        name="name"
        value={items.name}
        onChange={(e) => pushOne({ name: e.target.value })}
      />

      <div className="preview">{items.name}</div>
    </div>
  );
}
```

### Check out these examples

#### [&rarr; &nbsp; ⚛️ &nbsp; `react`](https://github.com/kevinnayar/temporis/blob/main/src/examples/example-react.tsx)

#### [&rarr; &nbsp; ⚛️ &nbsp; `react` with `useTemporis` hook](https://github.com/kevinnayar/temporis/blob/main/src/examples/example-react-hooks.tsx)

#### [&rarr; &nbsp; ⚛️ &nbsp; `react` visualizing history](https://github.com/kevinnayar/temporis/blob/main/src/examples/example-react-timeline.tsx)

#### [&rarr; &nbsp; 🍦 &nbsp; `vanilla javascript`](https://github.com/kevinnayar/temporis/blob/main/src/examples/example-vanilla-js.js)

#### [&rarr; &nbsp; 🍦 &nbsp; `vanilla javascript` with DOM manipulation](https://github.com/kevinnayar/temporis/blob/main/src/examples/example-vanilla-js-dom.js)

## API

### Overview

`temporis` is sequential and synchronous by design. No promises, no asynchronous behavior, just pure sequential method calls. Each action that is passed into the `temporis` internal history should be given a full state object at that point in time. These actions construct the timeline of actions and then `temporis` provides the API to traverse over that timeline.

It's great for apps where users are performing several actions and you want to provide them the ability to undo and redo their actions. It's small, simple, and can be wired in with a few lines of code.

#### Instantiate
```ts
const temporis = Temporis(50);
```
> This is not a class, so don't use the `new` keyword when instantiating it. The function takes an optional argument `limit` which is of type `number`. This represents the number of actions stored in history and it defaults to a 100. There is no upper limit but increasing this will increase the memory footprint of your app, so caveat emptor 😊

#### Push a single action
```ts
temporis.pushOne({ color: 'red', name: 'foo' });
```
> Push a single action into history which becomes the current state.

#### Push many actions sequentially
```ts
const actions = [
  { color: 'red', name: 'foo' },
  { color: 'green', name: 'foo' },
  { color: 'blue', name: 'foo' },
];
temporis.pushMany(actions);
```
> Push many actions into history in sequence, the last of which becomes the current state.

#### Undo
```ts
temporis.undo();
```
> Go back one action and make that the current state. If there is no previous action, do nothing.

#### Redo
```ts
temporis.redo();
```
> Go forward one action and makes that the current state. If there is no future action, do nothing.

#### Get current item 
```ts
const currentItem = temporis.getCurrentItem();
```
> Returns the current state. If there is no currrent action in history (i.e, you haven't pushed anything as yet), returns `undefined`.

#### Get history
```ts
const history = temporis.getHistory();
```
> Returns the history of actions stored within the `temporis` instance. Mostly for internal purposes, but can be helpful in debugging. 




