# ⏰ temporis

An intuitive and lightweight approach to constructing timelines. Allows you to capture a history of app state as immutable snapshots and to implement undo and redo with predictability and ease.


💾 [Installation](#Installation) &nbsp; | &nbsp; 👍 [Example](#Example) &nbsp; | &nbsp;  💻 [API](#API)


<br />

## Installation
`npm install temporis` &nbsp; or &nbsp; `yarn add temporis`

<br />

## Example

![alt text](https://github.com/kevinnayar/temporis/blob/master/src/assets/undo-redo.gif?raw=true)

```ts
// Create an instance
const temporis = Temporis(50);

// Push complete state with each action
temporis.pushOne({ id: 'foo', name: 'Foo', color: 'red', size: 28 }); // 1st
temporis.pushOne({ id: 'foo', name: 'Foo', color: 'green', size: 36 }); // 2nd
temporis.pushOne({ id: 'foo', name: 'Foo', color: 'blue', size: 44 }); // 3rd
temporis.pushOne({ id: 'foo', name: 'Bar', color: 'blue', size: 44 }); // 4th
temporis.pushOne({ id: 'foo', name: 'Bar', color: 'orange', size: 44 }); // 5th

// Get current item -> returns the 5th action
let currentItem = temporis.getCurrentItem(); 

// Undo
temporis.undo();
temporis.undo();

// Get current item -> returns the 3rd action
currentItem = temporis.getCurrentItem();

// Redo
temporis.redo();

// Get current item -> returns the 4th action
currentItem = temporis.getCurrentItem();
```

### Other Examples
🍦[Vanilla JS](https://github.com/kevinnayar/temporis/blob/master/src/examples/example-with-vanilla-js.js)

⚛️ [React](https://github.com/kevinnayar/temporis/blob/master/src/examples/example-with-react.tsx)

⚛️ [React using Hooks](https://github.com/kevinnayar/temporis/blob/master/src/examples/example-with-react-hooks.tsx)

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

