import Temporis from '../index';

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
