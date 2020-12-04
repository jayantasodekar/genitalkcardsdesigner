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
exports.SkypeContainer = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var Adaptive = require("adaptivecards");
var host_container_1 = require("../host-container");
var hostConfig = require("../../hostConfigs/skype.json");
var SkypeContainer = /** @class */ (function (_super) {
    __extends(SkypeContainer, _super);
    function SkypeContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkypeContainer.prototype.renderTo = function (hostElement) {
        this.cardHost.classList.add("skype-card");
        var frame = document.createElement("div");
        frame.className = "skype-frame";
        // Draw the hexagon bot logo
        var hexagonOuter = document.createElement("div");
        hexagonOuter.className = "skype-hexagon-outer";
        var hexagonInner = document.createElement("div");
        hexagonInner.className = "skype-hexagon-inner";
        var botLogo = document.createElement("div");
        botLogo.className = "skype-bot-logo";
        hexagonOuter.appendChild(hexagonInner);
        hexagonInner.appendChild(botLogo);
        frame.appendChild(hexagonOuter);
        frame.appendChild(this.cardHost);
        hostElement.appendChild(frame);
    };
    SkypeContainer.prototype.getHostConfig = function () {
        return new Adaptive.HostConfig(hostConfig);
    };
    return SkypeContainer;
}(host_container_1.HostContainer));
exports.SkypeContainer = SkypeContainer;
//# sourceMappingURL=skype-container.js.map