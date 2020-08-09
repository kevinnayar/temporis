"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTemporis = void 0;
const react_1 = require("react");
function useTemporis(temporisInstance, initialState) {
    const [items, setItems] = react_1.useState(initialState);
    function pushOne(items) {
        temporisInstance.pushOne(items);
        setItems(items);
    }
    function undo() {
        temporisInstance.undo();
        const current = temporisInstance.getCurrentItem();
        if (current)
            setItems(current);
    }
    function redo() {
        temporisInstance.redo();
        const current = temporisInstance.getCurrentItem();
        if (current)
            setItems(current);
    }
    return {
        items,
        pushOne,
        undo,
        redo,
    };
}
exports.useTemporis = useTemporis;
