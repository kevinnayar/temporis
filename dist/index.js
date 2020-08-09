"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.useTemporis = void 0;
var use_temporis_1 = require("./use-temporis");
var createSeriesItem = function (item) { return ({ item: item, isCurrent: true }); };
var findCurrentItemIndex = function (history) { return history.findIndex(function (h) { return h.isCurrent === true; }); };
exports.useTemporis = use_temporis_1.useTemporis;
function Temporis(limit) {
    var _history = [];
    var _limit = limit || 100;
    var pushOne = function (item) {
        var index = findCurrentItemIndex(_history);
        var currentItem = _history[index];
        if (currentItem !== undefined) {
            _history[index].isCurrent = false;
        }
        var seriesItem = createSeriesItem(item);
        _history.push(seriesItem);
        if (_history.length > _limit) {
            _history.shift();
        }
    };
    var pushMany = function (items) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            pushOne(item);
        }
    };
    var undo = function () {
        var index = findCurrentItemIndex(_history);
        var currentItem = _history[index];
        var prevItem = _history[index - 1];
        if (currentItem !== undefined && prevItem !== undefined) {
            _history[index].isCurrent = false;
            _history[index - 1].isCurrent = true;
        }
    };
    var redo = function () {
        var index = findCurrentItemIndex(_history);
        var currentItem = _history[index];
        var nextItem = _history[index + 1];
        if (currentItem !== undefined && nextItem !== undefined) {
            _history[index] = __assign(__assign({}, currentItem), { isCurrent: false });
            _history[index + 1] = __assign(__assign({}, nextItem), { isCurrent: true });
        }
    };
    var getCurrentItem = function () {
        var currentItemMaybe = _history.find(function (h) { return h.isCurrent === true; });
        return currentItemMaybe ? currentItemMaybe.item : undefined;
    };
    return {
        pushOne: pushOne,
        pushMany: pushMany,
        undo: undo,
        redo: redo,
        getCurrentItem: getCurrentItem
    };
}
exports["default"] = Temporis;
