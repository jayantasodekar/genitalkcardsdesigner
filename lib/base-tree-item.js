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
exports.BaseTreeItem = void 0;
var draggable_element_1 = require("./draggable-element");
var BaseTreeItem = /** @class */ (function (_super) {
    __extends(BaseTreeItem, _super);
    function BaseTreeItem() {
        var _this = _super.call(this) || this;
        _this._isExpanded = true;
        _this._isSelected = false;
        _this._level = 0;
        return _this;
    }
    BaseTreeItem.prototype.setIsSelected = function (value, scrollIntoView) {
        if (this._isSelected !== value) {
            this._isSelected = value;
            if (this._isSelected) {
                this._treeItemElement.classList.add("selected");
            }
            else {
                this._treeItemElement.classList.remove("selected");
            }
            this.selectedChanged(scrollIntoView);
        }
    };
    BaseTreeItem.prototype.click = function (e) {
        _super.prototype.click.call(this, e);
        console.log('jayant====>', e);
        this.setIsSelected(true, false);
    };
    BaseTreeItem.prototype.getIconClass = function () {
        return null;
    };
    BaseTreeItem.prototype.getAdditionalText = function () {
        return null;
    };
    BaseTreeItem.prototype.getAdditionalTextClass = function () {
        return "acd-tree-item-additionalText";
    };
    BaseTreeItem.prototype.getIndentationLevelIncrement = function () {
        return 8;
    };
    BaseTreeItem.prototype.getDragSourceElement = function () {
        return this._treeItemElement;
    };
    BaseTreeItem.prototype.selectedChanged = function (scrollIntoView) {
        if (this.isSelected && scrollIntoView) {
            this._rootElement.scrollIntoView();
        }
        if (this.onSelectedChange) {
            this.onSelectedChange(this);
        }
    };
    BaseTreeItem.prototype.internalRender = function () {
        var _this = this;
        this._rootElement = document.createElement("div");
        this._treeItemElement = document.createElement("div");
        this._treeItemElement.classList.add("acd-tree-item");
        this._treeItemElement.style.display = "flex";
        this._treeItemElement.style.alignItems = "center";
        this._treeItemElement.style.paddingLeft = this.getIndentationLevelIncrement() * (1 + this.level) + "px";
        this._expandCollapseElement = document.createElement("div");
        this._expandCollapseElement.classList.add("acd-tree-item-expandCollapseButton");
        this._expandCollapseElement.style.flex = "0 0 auto";
        this._expandCollapseElement.style.visibility = this.getChildCount() > 0 ? "visible" : "hidden";
        this._expandCollapseElement.onclick = function (e) {
            _this._isExpanded = !_this._isExpanded;
            _this.updateLayout();
            e.cancelBubble = true;
            e.preventDefault();
        };
        this._treeItemElement.appendChild(this._expandCollapseElement);
        var textElement = document.createElement("div");
        textElement.classList.add("acd-tree-item-text");
        textElement.style.flex = "1 1 auto";
        textElement.style.display = "flex";
        textElement.style.alignItems = "center";
        textElement.style.whiteSpace = "nowrap";
        textElement.style.textOverflow = "ellipsis";
        textElement.style.overflow = "hidden";
        if (this.getIconClass()) {
            var iconElement = document.createElement("div");
            iconElement.classList.add("acd-icon", "acd-treeView-icon", this.getIconClass());
            textElement.appendChild(iconElement);
        }
        var labelSpan = document.createElement("span");
        labelSpan.classList.add("acd-tree-item-typeName");
        labelSpan.innerText = this.getLabelText();
        textElement.appendChild(labelSpan);
        var text = this.getAdditionalText();
        if (text && text != "") {
            var additionalTextSpan = document.createElement("span");
            additionalTextSpan.classList.add(this.getAdditionalTextClass());
            additionalTextSpan.innerText = " [" + text + "]";
            textElement.appendChild(additionalTextSpan);
        }
        this._treeItemElement.appendChild(textElement);
        this._rootElement.appendChild(this._treeItemElement);
        this._childContainerElement = document.createElement("div");
        for (var i = 0; i < this.getChildCount(); i++) {
            var renderedChildItem = this.getChildAt(i).render();
            this._childContainerElement.appendChild(renderedChildItem);
        }
        this._rootElement.appendChild(this._childContainerElement);
        this.updateLayout();
        return this._rootElement;
    };
    BaseTreeItem.prototype.updateLayout = function () {
        if (this._isExpanded) {
            this._childContainerElement.classList.remove("acd-hidden");
            this._expandCollapseElement.classList.remove(BaseTreeItem.collapsedIconClass);
            this._expandCollapseElement.classList.add(BaseTreeItem.expandedIconClass);
        }
        else {
            this._childContainerElement.classList.add("acd-hidden");
            this._expandCollapseElement.classList.add(BaseTreeItem.collapsedIconClass);
            this._expandCollapseElement.classList.remove(BaseTreeItem.expandedIconClass);
        }
    };
    BaseTreeItem.prototype.expand = function () {
        this._isExpanded = true;
        this.updateLayout();
    };
    BaseTreeItem.prototype.isDraggable = function () {
        return false;
    };
    Object.defineProperty(BaseTreeItem.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTreeItem.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (value) {
            this.setIsSelected(value, true);
        },
        enumerable: false,
        configurable: true
    });
    BaseTreeItem.collapsedIconClass = "acd-icon-chevronRight";
    BaseTreeItem.expandedIconClass = "acd-icon-chevronDown";
    return BaseTreeItem;
}(draggable_element_1.DraggableElement));
exports.BaseTreeItem = BaseTreeItem;
//# sourceMappingURL=base-tree-item.js.map