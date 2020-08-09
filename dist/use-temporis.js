"use strict";
exports.__esModule = true;
exports.useTemporis = void 0;
var react_1 = require("react");
function useTemporis(temporisInstance, initialState) {
    var _a = react_1.useState(initialState), items = _a[0], setItems = _a[1];
    function pushOne(items) {
        temporisInstance.pushOne(items);
        setItems(items);
    }
    function undo() {
        temporisInstance.undo();
        var current = temporisInstance.getCurrentItem();
        if (current)
            setItems(current);
    }
    function redo() {
        temporisInstance.redo();
        var current = temporisInstance.getCurrentItem();
        if (current)
            setItems(current);
    }
    return {
        items: items,
        pushOne: pushOne,
        undo: undo,
        redo: redo
    };
}
exports.useTemporis = useTemporis;
