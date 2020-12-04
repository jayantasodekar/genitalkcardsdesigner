"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolbox = exports.ToolboxOrientation = void 0;
var settings_manager_1 = require("./settings-manager");
var ToolboxOrientation;
(function (ToolboxOrientation) {
    ToolboxOrientation[ToolboxOrientation["Horizontal"] = 0] = "Horizontal";
    ToolboxOrientation[ToolboxOrientation["Vertical"] = 1] = "Vertical";
})(ToolboxOrientation = exports.ToolboxOrientation || (exports.ToolboxOrientation = {}));
var Toolbox = /** @class */ (function () {
    function Toolbox(id, title) {
        this._isExpanded = true;
        this._stretch = false;
        this._isRestoring = false;
        this.commands = null;
        this.id = id;
        this.title = title;
    }
    Toolbox.prototype.getDimensionSettingName = function () {
        return "Toolbox" + this.id + (this._orientation == ToolboxOrientation.Vertical ? "Height" : "Width");
    };
    Toolbox.prototype.updateContent = function () {
        if (this._contentHost) {
            this._contentHost.innerHTML = "";
            if (this._content) {
                this._contentHost.appendChild(this._content);
            }
        }
    };
    Toolbox.prototype.toggled = function () {
        if (this.onToggled) {
            this.onToggled(this);
        }
    };
    Toolbox.prototype.render = function (orientation, collapsedTabContainer) {
        var _this = this;
        this._orientation = orientation;
        this._collapsedTabContainer = collapsedTabContainer;
        this._renderedElement = document.createElement("div");
        this._renderedElement.style.overflow = "auto";
        this._renderedElement.style.display = "flex";
        this._renderedElement.style.flexDirection = "column";
        this._renderedElement.style.position = "relative";
        this._headerRootElement = document.createElement("div");
        this._headerRootElement.innerHTML = "";
        this._headerRootElement.className = "acd-toolbox-header";
        var headerContentElement = document.createElement("div");
        headerContentElement.className = "acd-toolbox-header-content";
        var headerTitleElement = document.createElement("span");
        headerTitleElement.className = "acd-toolbox-header-title";
        headerTitleElement.innerText = this.title;
        headerContentElement.appendChild(headerTitleElement);
        var headerCommandsHostElement = document.createElement("span");
        headerCommandsHostElement.className = "acd-toolbox-header-commandsHost";
        this._customCommandsHost = document.createElement("div");
        this._customCommandsHost.style.display = "flex";
        if (this.commands) {
            var _loop_1 = function (command) {
                var commandButtonElement = document.createElement("div");
                commandButtonElement.className = "acd-toolbox-header-commandButton";
                commandButtonElement.title = command.title;
                commandButtonElement.onclick = function (e) {
                    command.execute(command);
                };
                var commandIconElement = document.createElement("div");
                commandIconElement.classList.add("acd-icon", command.iconClass);
                commandButtonElement.appendChild(commandIconElement);
                this_1._customCommandsHost.appendChild(commandButtonElement);
            };
            var this_1 = this;
            for (var _i = 0, _a = this.commands; _i < _a.length; _i++) {
                var command = _a[_i];
                _loop_1(command);
            }
        }
        headerCommandsHostElement.appendChild(this._customCommandsHost);
        this._expandCollapseButtonElement = document.createElement("span");
        this._expandCollapseButtonElement.className = "acd-toolbox-header-commandButton";
        this._expandCollapseButtonElement.title = "Hide";
        this._headerIconElement = document.createElement("span");
        this._headerIconElement.classList.add("acd-icon", "acd-icon-header-expanded");
        this._expandCollapseButtonElement.appendChild(this._headerIconElement);
        this._expandCollapseButtonElement.onmousedown = function (e) {
            e.preventDefault();
            return true;
        };
        this._expandCollapseButtonElement.onclick = function (e) {
            _this.toggle();
            e.preventDefault();
            return true;
        };
        headerCommandsHostElement.appendChild(this._expandCollapseButtonElement);
        headerContentElement.appendChild(headerCommandsHostElement);
        this._headerRootElement.appendChild(headerContentElement);
        this._contentHost = document.createElement("div");
        this._contentHost.style.overflow = "auto";
        this._renderedElement.append(this._headerRootElement, this._contentHost);
        this.updateContent();
    };
    Toolbox.prototype.collapse = function () {
        if (this._isExpanded) {
            this._headerIconElement.classList.add("acd-icon-header-collapsed");
            this._headerIconElement.classList.remove("acd-icon-header-expanded");
            this._customCommandsHost.classList.add("acd-hidden");
            if (this._collapsedTabContainer) {
                this._renderedElement.removeChild(this._headerRootElement);
                this._collapsedTabContainer.appendChild(this._headerRootElement);
            }
            this._expandCollapseButtonElement.title = "Show";
            this._isExpanded = false;
            this.toggled();
        }
    };
    Toolbox.prototype.expand = function () {
        if (!this._isExpanded) {
            this._headerIconElement.classList.add("acd-icon-header-expanded");
            this._headerIconElement.classList.remove("acd-icon-header-collapsed");
            this._customCommandsHost.classList.remove("acd-hidden");
            if (this._collapsedTabContainer) {
                this._collapsedTabContainer.removeChild(this._headerRootElement);
                this._renderedElement.insertBefore(this._headerRootElement, this._renderedElement.firstChild);
            }
            this._expandCollapseButtonElement.title = "Hide";
            this._isExpanded = true;
            this.toggled();
        }
    };
    Toolbox.prototype.toggle = function () {
        if (this.isExpanded) {
            this.collapse();
        }
        else {
            this.expand();
        }
    };
    Toolbox.prototype.getHeaderBoundingRect = function () {
        return this._headerRootElement.getBoundingClientRect();
    };
    Toolbox.prototype.saveState = function () {
        if (!this._isRestoring) {
            settings_manager_1.SettingsManager.trySaveSetting("Toolbox" + this.id + "IsExpanded", this.isExpanded.toString());
            settings_manager_1.SettingsManager.trySaveSetting(this.getDimensionSettingName(), this.orientation == ToolboxOrientation.Vertical ? this.renderedElement.style.height : this.renderedElement.style.width);
        }
    };
    Toolbox.prototype.restoreState = function () {
        if (this.renderedElement && !this._isRestoring) {
            this._isRestoring = true;
            try {
                var dimensionSetting = settings_manager_1.SettingsManager.tryLoadStringSetting(this.getDimensionSettingName());
                if (dimensionSetting.succeeded && dimensionSetting.value != undefined && dimensionSetting.value != "") {
                    if (this.orientation == ToolboxOrientation.Vertical) {
                        this.renderedElement.style.height = dimensionSetting.value;
                    }
                    else {
                        this.renderedElement.style.width = dimensionSetting.value;
                    }
                }
                var isExpandedSetting = settings_manager_1.SettingsManager.tryLoadBooleanSetting("Toolbox" + this.id + "IsExpanded", true);
                if (isExpandedSetting.succeeded) {
                    if (isExpandedSetting.value) {
                        this.expand();
                    }
                    else {
                        this.collapse();
                    }
                }
            }
            finally {
                this._isRestoring = false;
            }
        }
    };
    Object.defineProperty(Toolbox.prototype, "orientation", {
        get: function () {
            return this._orientation;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Toolbox.prototype, "renderedElement", {
        get: function () {
            return this._renderedElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Toolbox.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = value;
            this.updateContent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Toolbox.prototype, "isExpanded", {
        get: function () {
            return this._isExpanded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Toolbox.prototype, "stretch", {
        get: function () {
            return this._stretch;
        },
        set: function (value) {
            this._stretch = value;
            if (this._stretch) {
                this.renderedElement.style.flex = "1 1 auto";
            }
            else {
                this.renderedElement.style.flex = "0 0 auto";
            }
        },
        enumerable: false,
        configurable: true
    });
    return Toolbox;
}());
exports.Toolbox = Toolbox;
//# sourceMappingURL=tool-box.js.map