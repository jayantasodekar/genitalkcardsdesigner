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
exports.DarkTeamsContainer = exports.LightTeamsContainer = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var Adaptive = require("genietalkcards");
var host_container_1 = require("../host-container");
var hostConfigLight = require("../../hostConfigs/microsoft-teams-light.json");
var hostConfigDark = require("../../hostConfigs/microsoft-teams-dark.json");
var BaseTeamsContainer = /** @class */ (function (_super) {
    __extends(BaseTeamsContainer, _super);
    function BaseTeamsContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseTeamsContainer.prototype.renderTo = function (hostElement) {
        var outerFrame = document.createElement("div");
        outerFrame.className = "teams-frame";
        // Draw the hexagon bot logo
        var hexagonOuter = document.createElement("div");
        hexagonOuter.className = "teams-hexagon-outer";
        var hexagonInner = document.createElement("div");
        hexagonInner.className = "teams-hexagon-inner";
        var botLogo = document.createElement("div");
        botLogo.className = "teams-bot-logo";
        hexagonOuter.appendChild(hexagonInner);
        hexagonInner.appendChild(botLogo);
        outerFrame.appendChild(hexagonOuter);
        var innerFrame = document.createElement("div");
        innerFrame.className = "teams-inner-frame";
        this.cardHost.classList.add("teams-card");
        var botNameAndTime = document.createElement("div");
        botNameAndTime.className = "teams-botNameAndTime";
        botNameAndTime.innerText = "Test Bot    2:36 PM";
        innerFrame.appendChild(botNameAndTime);
        innerFrame.appendChild(this.cardHost);
        outerFrame.appendChild(innerFrame);
        hostElement.appendChild(outerFrame);
    };
    Object.defineProperty(BaseTeamsContainer.prototype, "targetVersion", {
        get: function () {
            return Adaptive.Versions.v1_2;
        },
        enumerable: false,
        configurable: true
    });
    return BaseTeamsContainer;
}(host_container_1.HostContainer));
var LightTeamsContainer = /** @class */ (function (_super) {
    __extends(LightTeamsContainer, _super);
    function LightTeamsContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LightTeamsContainer.prototype.getHostConfig = function () {
        return new Adaptive.HostConfig(hostConfigLight);
    };
    return LightTeamsContainer;
}(BaseTeamsContainer));
exports.LightTeamsContainer = LightTeamsContainer;
var DarkTeamsContainer = /** @class */ (function (_super) {
    __extends(DarkTeamsContainer, _super);
    function DarkTeamsContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DarkTeamsContainer.prototype.getBackgroundColor = function () {
        return "#201E1F";
    };
    DarkTeamsContainer.prototype.getHostConfig = function () {
        return new Adaptive.HostConfig(hostConfigDark);
    };
    return DarkTeamsContainer;
}(BaseTeamsContainer));
exports.DarkTeamsContainer = DarkTeamsContainer;
//# sourceMappingURL=teams-container.js.map