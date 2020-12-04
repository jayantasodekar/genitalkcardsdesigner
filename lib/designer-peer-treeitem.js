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
exports.DesignerPeerTreeItem = void 0;
var base_tree_item_1 = require("./base-tree-item");
var DesignerPeerTreeItem = /** @class */ (function (_super) {
    __extends(DesignerPeerTreeItem, _super);
    function DesignerPeerTreeItem(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        _this.owner.onParentChanged = function (sender) {
            _this.computeLevel();
        };
        _this.computeLevel();
        return _this;
    }
    DesignerPeerTreeItem.prototype.computeLevel = function () {
        this._level = 0;
        var peer = this.owner;
        while (peer) {
            this._level++;
            peer = peer.parent;
        }
        for (var i = 0; i < this.getChildCount(); i++) {
            this.getChildAt(i).computeLevel();
        }
    };
    DesignerPeerTreeItem.prototype.getIconClass = function () {
        return this.owner.registration.iconClass;
    };
    DesignerPeerTreeItem.prototype.getLabelText = function () {
        return this.owner.getCardObject().getJsonTypeName();
    };
    DesignerPeerTreeItem.prototype.getAdditionalText = function () {
        return this.owner.getTreeItemText();
    };
    DesignerPeerTreeItem.prototype.selectedChanged = function (scrollIntoView) {
        _super.prototype.selectedChanged.call(this, scrollIntoView);
        this.owner.isSelected = this.isSelected;
    };
    DesignerPeerTreeItem.prototype.getChildCount = function () {
        return this.owner.getChildCount();
    };
    DesignerPeerTreeItem.prototype.getChildAt = function (index) {
        return this.owner.getChildAt(index).treeItem;
    };
    return DesignerPeerTreeItem;
}(base_tree_item_1.BaseTreeItem));
exports.DesignerPeerTreeItem = DesignerPeerTreeItem;
//# sourceMappingURL=designer-peer-treeitem.js.map