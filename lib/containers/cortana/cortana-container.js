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
exports.DarkCortanaContainer = exports.LightCortanaContainer = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var Adaptive = require("adaptivecards");
var host_container_1 = require("../host-container");
var hostConfigLight = require("../../hostConfigs/cortana-skills-light.json");
var hostConfigDark = require("../../hostConfigs/cortana-skills-dark.json");
var BaseCortanaContainer = /** @class */ (function (_super) {
    __extends(BaseCortanaContainer, _super);
    function BaseCortanaContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseCortanaContainer.prototype.renderTo = function (hostElement) {
        var frame = document.createElement("div");
        frame.appendChild(this.cardHost);
        hostElement.appendChild(frame);
    };
    Object.defineProperty(BaseCortanaContainer.prototype, "targetVersion", {
        get: function () {
            return Adaptive.Versions.v1_2;
        },
        enumerable: false,
        configurable: true
    });
    return BaseCortanaContainer;
}(host_container_1.HostContainer));
var LightCortanaContainer = /** @class */ (function (_super) {
    __extends(LightCortanaContainer, _super);
    function LightCortanaContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LightCortanaContainer.prototype.getHostConfig = function () {
        return new Adaptive.HostConfig(hostConfigLight);
    };
    return LightCortanaContainer;
}(BaseCortanaContainer));
exports.LightCortanaContainer = LightCortanaContainer;
var DarkCortanaContainer = /** @class */ (function (_super) {
    __extends(DarkCortanaContainer, _super);
    function DarkCortanaContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DarkCortanaContainer.prototype.getBackgroundColor = function () {
        return "#201E1F";
    };
    DarkCortanaContainer.prototype.getHostConfig = function () {
        return new Adaptive.HostConfig(hostConfigDark);
    };
    return DarkCortanaContainer;
}(BaseCortanaContainer));
exports.DarkCortanaContainer = DarkCortanaContainer;
//# sourceMappingURL=cortana-container.js.map