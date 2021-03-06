import { useState } from 'react';
import { TemporisInstance, TemporisItem } from './index';

export type UseTemporisHook<T> = {
  items: T;
  history: TemporisItem<T>[];
  pushOne: (items: T) => void;
  undo: () => void;
  redo: () => void;
};

export function useTemporis<T>(temporisInstance: TemporisInstance<T>, initialState: T): UseTemporisHook<T> {
  const [items, setItems] = useState<T>(initialState);

  function pushOne(items: T) {
    temporisInstance.pushOne(items);
    setItems(items);
  }

  function undo() {
    temporisInstance.undo();
    const current: void | T = temporisInstance.getCurrentItem();
    if (current) setItems(current);
  }

  function redo() {
    temporisInstance.redo();
    const current: void | T = temporisInstance.getCurrentItem();
    if (current) setItems(current);
  }

  const history = temporisInstance.getHistory();

  return {
    items,
    history,
    pushOne,
    undo,
    redo,
  };
}
