import { useState } from 'react';
import { TemporisInstance } from './index';

export type UseTemporisHook<T> = {
    items: T;
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

  return {
    items,
    pushOne,
    undo,
    redo,
  };
}
