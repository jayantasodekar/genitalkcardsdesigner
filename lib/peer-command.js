"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerCommand = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var PeerCommand = /** @class */ (function () {
    function PeerCommand(init) {
        this.alwaysShowName = false;
        this.toolTip = undefined;
        this.isPromotable = false;
        this.showInPropertySheet = false;
        Object.assign(this, init);
    }
    PeerCommand.prototype.internalRender = function () {
        var _this = this;
        var buttonElement = document.createElement("button");
        buttonElement.classList.add("acd-peerButton");
        buttonElement.type = "button";
        buttonElement.title = this.toolTip ? this.toolTip : this.name;
        if (this.iconClass) {
            var iconElement = document.createElement("div");
            iconElement.classList.add("acd-peerButton-icon", this.iconClass);
            buttonElement.appendChild(iconElement);
        }
        if (this.name && (!this.iconClass || this.alwaysShowName)) {
            var nameElement = document.createElement("div");
            nameElement.classList.add("acd-peerButton-text");
            nameElement.innerText = this.name;
            buttonElement.classList.add("variableWidth");
            buttonElement.appendChild(nameElement);
        }
        else {
            buttonElement.classList.add("fixedWidth");
        }
        buttonElement.onclick = function (e) {
            if (_this.execute) {
                _this.execute(_this, buttonElement);
            }
        };
        buttonElement.onpointerdown = function (e) { e.cancelBubble = true; };
        return buttonElement;
    };
    PeerCommand.prototype.render = function () {
        this._renderedElement = this.internalRender();
        return this._renderedElement;
    };
    Object.defineProperty(PeerCommand.prototype, "renderedElement", {
        get: function () {
            return this._renderedElement;
        },
        enumerable: false,
        configurable: true
    });
    return PeerCommand;
}());
exports.PeerCommand = PeerCommand;
//# sourceMappingURL=peer-command.js.map