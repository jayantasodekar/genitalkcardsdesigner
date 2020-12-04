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
exports.Toolbar = exports.ToolbarChoicePicker = exports.ToolbarButton = exports.ToolbarElement = exports.ToolbarElementAlignment = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var adaptivecards_controls_1 = require("adaptivecards-controls");
var ToolbarElementAlignment;
(function (ToolbarElementAlignment) {
    ToolbarElementAlignment[ToolbarElementAlignment["Left"] = 0] = "Left";
    ToolbarElementAlignment[ToolbarElementAlignment["Right"] = 1] = "Right";
})(ToolbarElementAlignment = exports.ToolbarElementAlignment || (exports.ToolbarElementAlignment = {}));
var ToolbarElement = /** @class */ (function () {
    function ToolbarElement(id) {
        this._renderedElement = undefined;
        this.isVisible = true;
        this.separator = false;
        this.label = null;
        this.alignment = ToolbarElementAlignment.Left;
        if (!id || id === "") {
            throw new Error("Toolbar elements must have an Id.");
        }
        this.id = id;
    }
    ToolbarElement.prototype.internalUpdateLayout = function () {
        // Do nothing in base implementation
    };
    ToolbarElement.prototype.updateLayout = function () {
        if (this._renderedElement) {
            this.internalUpdateLayout();
        }
    };
    ToolbarElement.prototype.render = function () {
        this._renderedElement = this.internalRender();
        this.updateLayout();
        return this._renderedElement;
    };
    Object.defineProperty(ToolbarElement.prototype, "renderedElement", {
        get: function () {
            return this._renderedElement;
        },
        enumerable: false,
        configurable: true
    });
    return ToolbarElement;
}());
exports.ToolbarElement = ToolbarElement;
var ToolbarButton = /** @class */ (function (_super) {
    __extends(ToolbarButton, _super);
    function ToolbarButton(id, caption, iconClass, onClick) {
        if (onClick === void 0) { onClick = null; }
        var _this = _super.call(this, id) || this;
        _this._displayCaption = true;
        _this._iconClass = undefined;
        _this._toolTip = undefined;
        _this._isEnabled = true;
        _this._allowToggle = false;
        _this._isToggled = false;
        _this.caption = caption;
        _this.iconClass = iconClass;
        _this.onClick = onClick;
        return _this;
    }
    ToolbarButton.prototype.clicked = function () {
        if (this.onClick) {
            this.onClick(this);
        }
    };
    ToolbarButton.prototype.internalUpdateLayout = function () {
        this.renderedElement.className = "acd-toolbar-button";
        this.renderedElement.disabled = !this.isEnabled;
        if (this.isToggled) {
            this.renderedElement.classList.add("acd-toolbar-button-toggled");
        }
        else {
            this.renderedElement.classList.remove("acd-toolbar-button-toggled");
        }
        if (this.iconClass) {
            this.renderedElement.classList.add(this.iconClass);
        }
        if (!this.displayCaption) {
            this.renderedElement.classList.add("acd-toolbar-button-iconOnly");
            this.renderedElement.innerText = "";
        }
        else {
            this.renderedElement.innerText = this.caption;
        }
        this.renderedElement.title = this.toolTip ? this.toolTip : "";
    };
    ToolbarButton.prototype.internalRender = function () {
        var _this = this;
        var element = document.createElement("button");
        element.onclick = function (e) {
            if (_this.allowToggle) {
                _this.isToggled = !_this.isToggled;
            }
            _this.clicked();
        };
        return element;
    };
    Object.defineProperty(ToolbarButton.prototype, "allowToggle", {
        get: function () {
            return this._allowToggle;
        },
        set: function (value) {
            this._allowToggle = value;
            if (!this._allowToggle) {
                this.isToggled = false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToolbarButton.prototype, "isToggled", {
        get: function () {
            return this._isToggled;
        },
        set: function (value) {
            this._isToggled = value;
            this.updateLayout();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToolbarButton.prototype, "caption", {
        get: function () {
            return this._caption;
        },
        set: function (value) {
            this._caption = value;
            this.updateLayout();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToolbarButton.prototype, "displayCaption", {
        get: function () {
            return this._displayCaption;
        },
        set: function (value) {
            this._displayCaption = value;
            this.updateLayout();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToolbarButton.prototype, "iconClass", {
        get: function () {
            return this._iconClass;
        },
        set: function (value) {
            this._iconClass = value;
            this.updateLayout();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToolbarButton.prototype, "toolTip", {
        get: function () {
            return this._toolTip;
        },
        set: function (value) {
            this._toolTip = value;
            this.updateLayout();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToolbarButton.prototype, "isEnabled", {
        get: function () {
            return this._isEnabled;
        },
        set: function (value) {
            this._isEnabled = value;
            this.updateLayout();
        },
        enumerable: false,
        configurable: true
    });
    return ToolbarButton;
}(ToolbarElement));
exports.ToolbarButton = ToolbarButton;
var ToolbarChoicePicker = /** @class */ (function (_super) {
    __extends(ToolbarChoicePicker, _super);
    function ToolbarChoicePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.choices = [];
        _this.width = null;
        return _this;
    }
    ToolbarChoicePicker.prototype.internalRender = function () {
        var _this = this;
        this._dropDown = new adaptivecards_controls_1.DropDown();
        for (var _i = 0, _a = this.choices; _i < _a.length; _i++) {
            var choice = _a[_i];
            var dropDownItem = new adaptivecards_controls_1.DropDownItem(choice.value, choice.name);
            this._dropDown.items.add(dropDownItem);
        }
        this._dropDown.selectedIndex = 0;
        this._dropDown.onValueChanged = function (sender) {
            if (_this.onChanged) {
                _this.onChanged(_this);
            }
        };
        var pickerElement = document.createElement("div");
        if (this.width && this.width > 0) {
            pickerElement.style.width = this.width + "px";
        }
        this._dropDown.attach(pickerElement);
        var pickerContainerElement = document.createElement("div");
        pickerContainerElement.className = "acd-toolbar-choicePicker";
        pickerContainerElement.style.display = "flex";
        pickerContainerElement.style.alignItems = "center";
        if (this.label) {
            var labelElement = document.createElement("span");
            labelElement.className = "acd-toolbar-label";
            labelElement.innerText = this.label;
            pickerContainerElement.appendChild(labelElement);
        }
        pickerContainerElement.appendChild(pickerElement);
        return pickerContainerElement;
    };
    Object.defineProperty(ToolbarChoicePicker.prototype, "value", {
        get: function () {
            return this._dropDown.value.key;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToolbarChoicePicker.prototype, "selectedIndex", {
        get: function () {
            return this._dropDown.selectedIndex;
        },
        set: function (value) {
            this._dropDown.selectedIndex = value;
        },
        enumerable: false,
        configurable: true
    });
    return ToolbarChoicePicker;
}(ToolbarElement));
exports.ToolbarChoicePicker = ToolbarChoicePicker;
var Toolbar = /** @class */ (function () {
    function Toolbar() {
        this._elements = [];
    }
    Toolbar.prototype.createSeparatorElement = function () {
        var separatorElement = document.createElement("div");
        separatorElement.className = "acd-toolbar-separator";
        return separatorElement;
    };
    Toolbar.prototype.renderElementsInto = function (container, elements, separatorPosition) {
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].separator && separatorPosition == ToolbarElementAlignment.Left && i > 0) {
                container.appendChild(this.createSeparatorElement());
            }
            container.appendChild(elements[i].render());
            if (elements[i].separator && separatorPosition == ToolbarElementAlignment.Right && i < elements.length - 1) {
                container.appendChild(this.createSeparatorElement());
            }
        }
    };
    Toolbar.prototype.attachTo = function (element) {
        this._attachedTo = element;
        this._attachedTo.className = "acd-toolbar";
        this._attachedTo.style.display = "flex";
        this._attachedTo.style.justifyContent = "space-between";
        this._attachedTo.innerHTML = "";
        var leftElements = [];
        var rightElements = [];
        for (var _i = 0, _a = this._elements; _i < _a.length; _i++) {
            var element_1 = _a[_i];
            if (element_1.isVisible) {
                if (element_1.alignment == ToolbarElementAlignment.Left) {
                    leftElements.push(element_1);
                }
                else {
                    rightElements.push(element_1);
                }
            }
        }
        var leftContainer = document.createElement("div");
        leftContainer.style.display = "flex";
        leftContainer.style.alignItems = "center";
        var rightContainer = document.createElement("div");
        rightContainer.style.display = "flex";
        rightContainer.style.alignItems = "center";
        this.renderElementsInto(leftContainer, leftElements, ToolbarElementAlignment.Left);
        this.renderElementsInto(rightContainer, rightElements, ToolbarElementAlignment.Right);
        this._attachedTo.appendChild(leftContainer);
        this._attachedTo.appendChild(rightContainer);
    };
    Toolbar.prototype.addElement = function (element) {
        this._elements.push(element);
    };
    Toolbar.prototype.getElementById = function (elementId) {
        for (var _i = 0, _a = this._elements; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.id == elementId) {
                return element;
            }
        }
        return null;
    };
    Toolbar.prototype.insertElementAfter = function (element, afterElementId) {
        for (var i = 0; i < this._elements.length; i++) {
            if (this._elements[i].id == afterElementId) {
                this._elements.splice(i + 1, 0, element);
                return;
            }
        }
        // Add as the last element if no element was found with the
        // specified id
        this._elements.push(element);
    };
    Toolbar.prototype.insertElementBefore = function (element, beforeElementId) {
        for (var i = this._elements.length - 1; i >= 0; i--) {
            if (this._elements[i].id == beforeElementId) {
                this._elements.splice(i, 0, element);
                return;
            }
        }
        // Insert as first element if no element was found with the
        // specified id
        this._elements.splice(0, 0, element);
    };
    return Toolbar;
}());
exports.Toolbar = Toolbar;
//# sourceMappingURL=toolbar.js.map