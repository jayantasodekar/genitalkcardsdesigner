"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidePanel = exports.SidePanelAlignment = void 0;
var splitter_1 = require("./splitter");
var tool_box_1 = require("./tool-box");
var settings_manager_1 = require("./settings-manager");
var SidePanelAlignment;
(function (SidePanelAlignment) {
    SidePanelAlignment[SidePanelAlignment["Top"] = 0] = "Top";
    SidePanelAlignment[SidePanelAlignment["Right"] = 1] = "Right";
    SidePanelAlignment[SidePanelAlignment["Bottom"] = 2] = "Bottom";
    SidePanelAlignment[SidePanelAlignment["Left"] = 3] = "Left";
})(SidePanelAlignment = exports.SidePanelAlignment || (exports.SidePanelAlignment = {}));
var ToolboxInfo = /** @class */ (function () {
    function ToolboxInfo(toolbox) {
        var _this = this;
        this.toolbox = toolbox;
        toolbox.onToggled = function (sender) {
            if (sender.isExpanded) {
                _this.showSplitter();
                _this.toolbox.renderedElement.classList.remove("acd-hidden");
            }
            else {
                _this.hideSplitter();
                _this.toolbox.renderedElement.classList.add("acd-hidden");
            }
            if (_this.onToggled) {
                _this.onToggled(_this);
            }
        };
    }
    ToolboxInfo.prototype.resizeEnded = function () {
        if (this.onResizeEnded) {
            this.onResizeEnded(this);
        }
    };
    ToolboxInfo.prototype.resized = function () {
        if (this.onResized) {
            this.onResized(this);
        }
    };
    ToolboxInfo.prototype.showSplitter = function () {
        if (this.splitter) {
            this.splitter.attachedTo.classList.remove("acd-hidden");
        }
    };
    ToolboxInfo.prototype.hideSplitter = function () {
        if (this.splitter) {
            this.splitter.attachedTo.classList.add("acd-hidden");
        }
    };
    Object.defineProperty(ToolboxInfo.prototype, "splitter", {
        get: function () {
            return this._splitter;
        },
        set: function (value) {
            var _this = this;
            this._splitter = value;
            this._splitter.onResizeEnded = function (sender) {
                _this.resizeEnded();
            };
            this._splitter.onResized = function (sender) {
                _this.resized();
            };
        },
        enumerable: false,
        configurable: true
    });
    return ToolboxInfo;
}());
var SidePanel = /** @class */ (function () {
    function SidePanel(id, alignment, collapsedTabContainer) {
        this._toolboxes = [];
        this._isRestoring = false;
        this.isResizable = true;
        this.id = id;
        this._alignment = alignment;
        this._collapsedTabContainer = collapsedTabContainer;
    }
    SidePanel.prototype.updateLayout = function () {
        var expandedToolboxCount = 0;
        for (var _i = 0, _a = this._toolboxes; _i < _a.length; _i++) {
            var toolboxInfo = _a[_i];
            if (toolboxInfo.toolbox.isExpanded) {
                expandedToolboxCount++;
                if (expandedToolboxCount == 1) {
                    toolboxInfo.hideSplitter();
                    toolboxInfo.toolbox.stretch = true;
                }
                else {
                    toolboxInfo.showSplitter();
                    toolboxInfo.toolbox.stretch = false;
                }
            }
        }
        if (expandedToolboxCount > 0) {
            this._attachedTo.classList.remove("acd-hidden");
        }
        else {
            this._attachedTo.classList.add("acd-hidden");
        }
    };
    SidePanel.prototype.computeToolboxSize = function (toolbox) {
        var boundingRect = this._attachedTo.getBoundingClientRect();
        var toolboxBoundingRect = toolbox.renderedElement.getBoundingClientRect();
        if (this.isVertical) {
            toolbox.renderedElement.style.height = (100 / boundingRect.height * toolboxBoundingRect.height) + "%";
        }
        else {
            toolbox.renderedElement.style.width = (100 / boundingRect.width * toolboxBoundingRect.width) + "%";
        }
    };
    SidePanel.prototype.resized = function () {
        if (this.onResized) {
            this.onResized(this);
        }
        this.saveState();
    };
    SidePanel.prototype.toolboxResized = function (toolbox) {
        if (this.onToolboxResized) {
            this.onToolboxResized(this, toolbox);
        }
        this.saveState();
    };
    SidePanel.prototype.toolboxExpandedOrCollapsed = function (toolbox) {
        if (this.onToolboxExpandedOrCollapsed) {
            this.onToolboxExpandedOrCollapsed(this, toolbox);
        }
        this.saveState();
    };
    SidePanel.prototype.getDimensionSettingName = function () {
        return this.id + (this.isVertical ? "Height" : "Width");
    };
    Object.defineProperty(SidePanel.prototype, "isVertical", {
        get: function () {
            return this._alignment == SidePanelAlignment.Right || this._alignment == SidePanelAlignment.Left;
        },
        enumerable: false,
        configurable: true
    });
    SidePanel.prototype.addToolbox = function (toolbox) {
        var _this = this;
        var toolboxInfo = new ToolboxInfo(toolbox);
        toolboxInfo.onToggled = function (sender) {
            _this.updateLayout();
            _this.toolboxExpandedOrCollapsed(toolboxInfo.toolbox);
        };
        toolboxInfo.onResizeEnded = function (sender) {
            _this.computeToolboxSize(sender.toolbox);
            _this.toolboxResized(sender.toolbox);
        };
        toolboxInfo.onResized = function (sender) {
            _this.toolboxResized(sender.toolbox);
        };
        this._toolboxes.push(toolboxInfo);
    };
    SidePanel.prototype.attachTo = function (attachTo) {
        var _this = this;
        this._attachedTo = attachTo;
        this._attachedTo.style.position = "relative";
        this._contentHost = document.createElement("div");
        this._contentHost.style.display = "flex";
        this._contentHost.style.overflow = "hidden";
        this._contentHost.style.flex = "1 1 auto";
        this._contentHost.style.position = "relative";
        if (this.isVertical) {
            this._contentHost.style.flexDirection = "column";
        }
        else {
            this._contentHost.style.flexDirection = "row";
        }
        for (var i = 0; i < this._toolboxes.length; i++) {
            var toolboxInfo = this._toolboxes[i];
            toolboxInfo.toolbox.render(this.isVertical ? tool_box_1.ToolboxOrientation.Vertical : tool_box_1.ToolboxOrientation.Horizontal, this._collapsedTabContainer);
            if (i > 0) {
                var splitterElement_1 = document.createElement("div");
                if (this.isVertical) {
                    splitterElement_1.className = "acd-horizontal-splitter";
                    toolboxInfo.toolbox.renderedElement.style.height = (100 / this._toolboxes.length) + "%";
                }
                else {
                    splitterElement_1.className = "acd-vertical-splitter";
                    toolboxInfo.toolbox.renderedElement.style.width = (100 / this._toolboxes.length) + "%";
                }
                toolboxInfo.toolbox.renderedElement.appendChild(splitterElement_1);
                toolboxInfo.splitter = new splitter_1.Splitter(splitterElement_1, toolboxInfo.toolbox.renderedElement, !this.isVertical);
            }
            this._contentHost.appendChild(toolboxInfo.toolbox.renderedElement);
        }
        var splitterElement = null;
        if (this.isResizable) {
            splitterElement = document.createElement("div");
            splitterElement.className = this.isVertical ? "acd-vertical-splitter" : "acd-horizontal-splitter";
            var splitter = new splitter_1.Splitter(splitterElement, this._attachedTo, this.isVertical, this._alignment == SidePanelAlignment.Left || this._alignment == SidePanelAlignment.Top);
            splitter.onResized = function (splitter) {
                _this.resized();
            };
        }
        this._attachedTo.innerHTML = "";
        this._attachedTo.style.display = "flex";
        if (this.isVertical) {
            if (this.size) {
                this._attachedTo.style.width = this.size + "px";
            }
            this._attachedTo.style.flexDirection = "row";
            this._attachedTo.style.overflowX = "hidden";
        }
        else {
            if (this.size) {
                this._attachedTo.style.height = this.size + "px";
            }
            this._attachedTo.style.flexDirection = "column";
            this._attachedTo.style.overflowY = "hidden";
        }
        if (this._alignment == SidePanelAlignment.Right || this._alignment == SidePanelAlignment.Bottom) {
            if (splitterElement) {
                this._attachedTo.appendChild(splitterElement);
            }
            this._attachedTo.appendChild(this._contentHost);
        }
        else {
            this._attachedTo.append(this._contentHost);
            if (splitterElement) {
                this._attachedTo.appendChild(splitterElement);
            }
        }
        this.restoreState();
        this.updateLayout();
    };
    SidePanel.prototype.saveState = function () {
        if (!this._isRestoring) {
            settings_manager_1.SettingsManager.trySaveSetting(this.getDimensionSettingName(), this.isVertical ? this._attachedTo.style.width : this._attachedTo.style.height);
            for (var _i = 0, _a = this._toolboxes; _i < _a.length; _i++) {
                var toolboxInfo = _a[_i];
                toolboxInfo.toolbox.saveState();
            }
        }
    };
    SidePanel.prototype.restoreState = function () {
        if (this._attachedTo && !this._isRestoring) {
            this._isRestoring = true;
            try {
                var dimensionSetting = settings_manager_1.SettingsManager.tryLoadStringSetting(this.getDimensionSettingName());
                if (dimensionSetting.succeeded && dimensionSetting.value != undefined && dimensionSetting.value != "") {
                    if (this.isVertical) {
                        this._attachedTo.style.width = dimensionSetting.value;
                    }
                    else {
                        this._attachedTo.style.height = dimensionSetting.value;
                    }
                }
                for (var _i = 0, _a = this._toolboxes; _i < _a.length; _i++) {
                    var toolboxInfo = _a[_i];
                    toolboxInfo.toolbox.restoreState();
                }
                this.updateLayout();
                this.resized();
            }
            finally {
                this._isRestoring = false;
            }
        }
    };
    Object.defineProperty(SidePanel.prototype, "contentHost", {
        get: function () {
            return this._contentHost;
        },
        enumerable: false,
        configurable: true
    });
    return SidePanel;
}());
exports.SidePanel = SidePanel;
//# sourceMappingURL=side-panel.js.map