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
exports.FieldPicker = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var Controls = require("adaptivecards-controls");
var tree_view_1 = require("./tree-view");
var data_treeitem_1 = require("./data-treeitem");
var FieldPicker = /** @class */ (function (_super) {
    __extends(FieldPicker, _super);
    function FieldPicker(dataStructure) {
        var _this = _super.call(this) || this;
        _this.dataStructure = dataStructure;
        return _this;
    }
    FieldPicker.prototype.renderContent = function () {
        var _this = this;
        var element = document.createElement("div");
        element.className = "acd-fieldPicker-host";
        var treeItem = new data_treeitem_1.DataTreeItem(this.dataStructure);
        var treeView = new tree_view_1.TreeView(treeItem);
        treeView.onSelectedItemChanged = function (sender) {
            _this._selectedField = treeView.selectedItem.field;
            if (_this._selectedField) {
                _this.closePopup(false);
            }
        };
        element.appendChild(treeView.render());
        return element;
    };
    FieldPicker.prototype.keyDown = function (e) {
        _super.prototype.keyDown.call(this, e);
        // TODO
    };
    Object.defineProperty(FieldPicker.prototype, "selectedField", {
        get: function () {
            return this._selectedField;
        },
        enumerable: false,
        configurable: true
    });
    return FieldPicker;
}(Controls.PopupControl));
exports.FieldPicker = FieldPicker;
//# sourceMappingURL=field-picker.js.map