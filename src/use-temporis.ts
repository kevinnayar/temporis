import { useState } from 'react';
import { TemporisInstance } from './index';

export function useTemporis<T>(temporisInstance: TemporisInstance<T>, initialState: T) {
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
