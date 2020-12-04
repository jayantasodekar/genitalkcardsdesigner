"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeView = void 0;
var TreeView = /** @class */ (function () {
    function TreeView(rootItem) {
        this.rootItem = rootItem;
        this._selectedItem = undefined;
    }
    TreeView.prototype.setupTreeItemEvents = function (treeItem) {
        var _this = this;
        treeItem.onSelectedChange = function (sender) {
            _this.selectedItem = sender;
        };
        for (var i = 0; i < treeItem.getChildCount(); i++) {
            this.setupTreeItemEvents(treeItem.getChildAt(i));
        }
    };
    TreeView.prototype.selectedItemChanged = function () {
        if (this.onSelectedItemChanged) {
            this.onSelectedItemChanged(this);
        }
    };
    TreeView.prototype.render = function () {
        var treeRoot = document.createElement("div");
        treeRoot.className = "acd-treeView";
        treeRoot.tabIndex = 0;
        treeRoot.appendChild(this.rootItem.render());
        this.setupTreeItemEvents(this.rootItem);
        return treeRoot;
    };
    Object.defineProperty(TreeView.prototype, "selectedItem", {
        get: function () {
            return this._selectedItem;
        },
        set: function (value) {
            if (value !== this._selectedItem) {
                if (this._selectedItem) {
                    this._selectedItem.isSelected = false;
                }
                this._selectedItem = value;
                if (this._selectedItem) {
                    this._selectedItem.isSelected = true;
                }
                this.selectedItemChanged();
            }
        },
        enumerable: false,
        configurable: true
    });
    return TreeView;
}());
exports.TreeView = TreeView;
//# sourceMappingURL=tree-view.js.map