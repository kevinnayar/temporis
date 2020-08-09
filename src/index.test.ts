import Temporis, { createSeriesItem, findCurrentItemIndex } from './index';

describe('Temporis', () => {
  test('createSeriesItem', () => {
    expect(createSeriesItem(true)).toEqual({ item: true, isCurrent: true }); // boolean
    expect(createSeriesItem(1)).toEqual({ item: 1, isCurrent: true }); // number
    expect(createSeriesItem('foo')).toEqual({ item: 'foo', isCurrent: true }); // string

    expect(createSeriesItem([1, 2, 3, 4])).toEqual({ item: [1, 2, 3, 4], isCurrent: true }); // array
    expect(createSeriesItem({ name: 'foo', num: 1, arr: [1, 2, 3, 4] })).toEqual({ item: { name: 'foo', num: 1, arr: [1, 2, 3, 4] }, isCurrent: true }); // object

    expect(createSeriesItem(undefined)).toEqual({ item: undefined, isCurrent: true }); // undefined
    expect(createSeriesItem(null)).toEqual({ item: null, isCurrent: true }); // null
  });

  test('findCurrentItemIndex', () => {
    const history = [
      {
        item: { id: 'id_foo', name: 'Foo', color: 'red', size: 28 },
        isCurrent: false,
      },
      {
        item: { id: 'id_foo', name: 'Foo', color: 'green', size: 36 },
        isCurrent: false,
      },
      {
        item: { id: 'id_foo', name: 'Foo', color: 'blue', size: 44 },
        isCurrent: true,
      },
    ];

    expect(findCurrentItemIndex([])).toEqual(-1);
    expect(findCurrentItemIndex([history[0], history[1]])).toEqual(-1);
    expect(findCurrentItemIndex(history)).toEqual(2);
  });

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

