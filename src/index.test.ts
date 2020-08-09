import Temporis from './index';

describe('Temporis', () => {
  test('temporis', () => {
    // instantiate
    const limit = 5;
    const temporis = Temporis(limit);

    // pushOne
    temporis.pushOne({ name: 0 });

    // getCurrentItem (pushOne)
    let currentItem = temporis.getCurrentItem();
    expect(currentItem).toEqual({ name: 0 });

    // pushMany
    const actions = [
      { name: 1 },
      { name: 2 },
      { name: 3 },
      { name: 4 },
      { name: 5 },
      { name: 6 },
      { name: 7 },
      { name: 8 },
      { name: 9 },
    ];
    temporis.pushMany(actions);

    // getCurrentItem (pushMany)
    currentItem = temporis.getCurrentItem();
    expect(currentItem).toEqual({ name: 9 });

    // undo
    temporis.undo();
    currentItem = temporis.getCurrentItem();
    expect(currentItem).toEqual({ name: 8 });

    temporis.undo();
    currentItem = temporis.getCurrentItem();
    expect(currentItem).toEqual({ name: 7 });

    temporis.undo();
    currentItem = temporis.getCurrentItem();
    expect(currentItem).toEqual({ name: 6 });

    temporis.undo();
    currentItem = temporis.getCurrentItem();
    expect(currentItem).toEqual({ name: 5 });

    // undo <- check limit
    temporis.undo();
    currentItem = temporis.getCurrentItem();
    expect(currentItem).toEqual({ name: 5 });

    // redo
    temporis.redo();
    currentItem = temporis.getCurrentItem();
    expect(currentItem).toEqual({ name: 6 });

    temporis.redo();
    currentItem = temporis.getCurrentItem();
    expect(currentItem).toEqual({ name: 7 });
    
    temporis.redo();
    currentItem = temporis.getCurrentItem();
    expect(currentItem).toEqual({ name: 8 });

    temporis.redo();
    currentItem = temporis.getCurrentItem();
    expect(currentItem).toEqual({ name: 9 });

    // redo <- check limit
    temporis.redo();
    currentItem = temporis.getCurrentItem();
    expect(currentItem).toEqual({ name: 9 });
  });
});

