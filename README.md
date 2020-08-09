# ⏰ temporis 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

**v0.1.0** (beta)

An intuitive and lightweight approach to constructing timelines. Allows you to capture a history of app state as immutable snapshots and implement undo and redo with predictability and ease. 

Under 8KB minified / Under 3KB minified + gzipped


## 💾 [Installation](#Installation) &nbsp; | &nbsp; 👍 [Usage](#Usage) &nbsp; | &nbsp;  💻 [API](#API)


<br />

## Installation
`npm install temporis` &nbsp; or &nbsp; `yarn add temporis`

<br />

## Usage

![alt text](https://github.com/kevinnayar/temporis/blob/master/src/assets/undo-redo.gif?raw=true)


### [&rarr; ⚛️ Use with `react`](https://github.com/kevinnayar/temporis/blob/master/src/examples/example-with-react.tsx)

### [&rarr; ⚛️ Use with `react` and the `useTemporis` hook](https://github.com/kevinnayar/temporis/blob/master/src/examples/example-with-react-hooks.tsx)

### [&rarr; 🍦 Use with `vanilla javascript`](https://github.com/kevinnayar/temporis/blob/master/src/examples/example-with-vanilla-js.js)


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

#### Instantiate
```ts
const temporis = Temporis(20);
```
> Takes an optional argument `limit (number)` for the number of actions stored in history, defaults to 100. Increasing this will increase the memory footprint of your app, so caveat emptor 😊

#### Push a single action
```ts
temporis.pushOne({ color: 'red' });
```
> Pushes a single action into history which becomes the current state.

#### Push many actions sequentially
```ts
const actions = [{ color: 'red' }, { color: 'green' }, { color: 'blue' }];
temporis.pushMany(actions);
```
> Pushes many actions into history in sequence, the last of which becomes the current state.

#### Undo
```ts
temporis.undo();
```
> Goes back one action and makes that the current state.

#### Redo
```ts
temporis.redo();
```
> Goes forward one action and makes that the current state.

#### Get current item 
```ts
const currentItem = temporis.getCurrentItem();
```
> Returns the current state.


<br />

