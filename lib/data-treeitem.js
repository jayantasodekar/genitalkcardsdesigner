"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTreeItem = void 0;
var base_tree_item_1 = require("./base-tree-item");
var DataTreeItem = /** @class */ (function (_super) {
    __extends(DataTreeItem, _super);
    function DataTreeItem(field) {
        var _this = _super.call(this) || this;
        _this._children = null;
        _this.field = field;
        _this._level = 0;
        var currentField = field;
        while (currentField) {
            _this._level++;
            currentField = currentField.parent;
        }
        return _this;
    }
    DataTreeItem.prototype.buildChildList = function () {
        if (!this._children) {
            this._children = [];
            var properties = this.field.children;
            if (properties) {
                var keys = Object.keys(properties);
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    this._children.push(new DataTreeItem(properties[key]));
                }
            }
        }
    };
    DataTreeItem.prototype.getLabelText = function () {
        return this.field.displayName;
    };
    DataTreeItem.prototype.getAdditionalText = function () {
        return this.field.valueType;
    };
    DataTreeItem.prototype.getAdditionalTextClass = function () {
        return "acd-data-tree-item-additionalText";
    };
    DataTreeItem.prototype.isDraggable = function () {
        return false;
    };
    DataTreeItem.prototype.getChildCount = function () {
        this.buildChildList();
        return this._children.length;
    };
    DataTreeItem.prototype.getChildAt = function (index) {
        this.buildChildList();
        return this._children[index];
    };
    return DataTreeItem;
}(base_tree_item_1.BaseTreeItem));
exports.DataTreeItem = DataTreeItem;
//# sourceMappingURL=data-treeitem.js.map