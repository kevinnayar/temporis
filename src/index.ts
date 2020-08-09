type TemporisItem<T> = { 
  item: T;
  isCurrent: boolean;
};

export function createSeriesItem<T>(item: T): TemporisItem<T> {
  return {
    item,
    isCurrent: true,
  };
}

export function findCurrentItemIndex<T>(history: TemporisItem<T>[]): number {
  return history.findIndex((h) => h.isCurrent === true);
}

type TemporisInstance<T> = {
  pushOne: (item: T) => void;
  pushMany: (items: Array<T>) => void;
  undo: () => void;
  redo: () => void;
  getCurrentItem: () => void | T;
};

export default function Temporis<T>(limit?: number): TemporisInstance<T> {
  const _history: TemporisItem<T>[] = [];
  const _limit = limit || 35;

  const pushOne = (item: T) => {
    const index = findCurrentItemIndex(_history);
    const currentItem = _history[index];

    if (currentItem !== undefined) {
      _history[index].isCurrent = false;
    }

    const seriesItem: TemporisItem<T> = createSeriesItem(item);
    _history.push(seriesItem);

    if (_history.length > _limit) {
      _history.shift();
    }
  };

  const pushMany = (items: T[]) => {
    for (const item of items) {
      pushOne(item);
    }
  };

  const undo = () => {
    const index = findCurrentItemIndex(_history);
    const currentItem = _history[index];
    const prevItem = _history[index - 1];

    if (currentItem !== undefined && prevItem !== undefined) {
      _history[index].isCurrent = false;
      _history[index - 1].isCurrent = true;
    }
  };

  const redo = () => {
    const index = findCurrentItemIndex(_history);
    const currentItem = _history[index];
    const nextItem = _history[index + 1];

    if (currentItem !== undefined && nextItem !== undefined) {
      _history[index] = { ...currentItem, isCurrent: false };
      _history[index + 1] = { ...nextItem, isCurrent: true };
    }
  };

  const getCurrentItem = (): void | T => {
    const currentItemMaybe = _history.find((h) => h.isCurrent === true);
    return currentItemMaybe ? currentItemMaybe.item : undefined;
  };

  return {
    pushOne,
    pushMany,
    undo,
    redo,
    getCurrentItem,
  };
}
