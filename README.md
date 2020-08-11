# ⏰ temporis 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

An intuitive and lightweight approach to constructing timelines. Allows you to capture a history of app state as immutable snapshots and implement undo and redo with predictability and ease. 

Under **8KB** minified / Under **3KB** minified + gzipped.

<br />

- **💾 [Installation](#Installation)**
- **👍 [Usage](#Usage)**
- **💻 [API](#API)**


<br />

## Installation
`npm install temporis` &nbsp; or &nbsp; `yarn add temporis`

<br />

## Usage

![alt text](https://github.com/kevinnayar/temporis/blob/master/src/assets/undo-redo.gif?raw=true)

### Check out these examples

#### [&rarr; &nbsp; ⚛️ &nbsp; Use with `react`](https://github.com/kevinnayar/temporis/blob/master/src/examples/example-with-react.tsx)

#### [&rarr; &nbsp; ⚛️ &nbsp; Use with `react` and the `useTemporis` hook](https://github.com/kevinnayar/temporis/blob/master/src/examples/example-with-react-hooks.tsx)

#### [&rarr; &nbsp; 🍦 &nbsp; Use with `vanilla javascript`](https://github.com/kevinnayar/temporis/blob/master/src/examples/example-with-vanilla-js.js)

<br />


```ts
const temporis = Temporis(50);

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


<br />

## API

### Overview

`temporis` is sequential and synchronous by design. No promises, no asynchronous behavior, just pure sequential method calls. Each action that is passed into the `temporis` internal history should be given a full state object at that point in time. These actions construct the timeline of actions and then `temporis` provides the API to traverse over that timeline.

It's great for apps where users are performing several actions and you want to provide them the ability to undo and redo their actions. It's small, simple, and can be wired in with a few lines of code.

#### Instantiate
```ts
const temporis = Temporis(20);
```
> This is not a class, so you don't need the `new` keyword when instantiating it. The function takes an optional argument `limit` which is of type `number`. This represents the number of actions stored in history and it defaults to a 100. There is no upper limit but increasing this will increase the memory footprint of your app, so caveat emptor 😊

#### Push a single action
```ts
temporis.pushOne({ color: 'red', name: 'foo' });
```
> Pushes a single action into history which becomes the current state.

#### Push many actions sequentially
```ts
const actions = [
  { color: 'red', name: 'foo' },
  { color: 'green', name: 'foo' },
  { color: 'blue', name: 'foo' },
];
temporis.pushMany(actions);
```
> Pushes many actions into history in sequence, the last of which becomes the current state.

#### Undo
```ts
temporis.undo();
```
> Goes back one action and makes that the current state. If there is no previous action, it does nothing.

#### Redo
```ts
temporis.redo();
```
> Goes forward one action and makes that the current state. If there is no future action, it does nothing.

#### Get current item 
```ts
const currentItem = temporis.getCurrentItem();
```
> Returns the current state. If there is no currrent action in history (i.e, you have not pushed anything as yet) it returns `undefined`.


<br />

