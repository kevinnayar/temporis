"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTemporis = void 0;
const use_temporis_1 = require("./use-temporis");
const createSeriesItem = (item) => ({ item, isCurrent: true });
const findCurrentItemIndex = (history) => history.findIndex((h) => h.isCurrent === true);
exports.useTemporis = use_temporis_1.useTemporis;
function Temporis(limit) {
    const _history = [];
    const _limit = limit || 100;
    const pushOne = (item) => {
        const index = findCurrentItemIndex(_history);
        const currentItem = _history[index];
        if (currentItem !== undefined) {
            _history[index].isCurrent = false;
        }
        const seriesItem = createSeriesItem(item);
        _history.push(seriesItem);
        if (_history.length > _limit) {
            _history.shift();
        }
    };
    const pushMany = (items) => {
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
    const getCurrentItem = () => {
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
exports.default = Temporis;
