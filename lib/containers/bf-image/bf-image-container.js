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
exports.BotFrameworkContainer = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var GenietalkCards = require("genietalkcards");
var host_container_1 = require("../host-container");
var hostConfig = require("../../hostConfigs/render-to-image.json");
var BotFrameworkContainer = /** @class */ (function (_super) {
    __extends(BotFrameworkContainer, _super);
    function BotFrameworkContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BotFrameworkContainer.prototype.renderTo = function (hostElement) {
        this.cardHost.classList.add("bf-images-card");
        var frame = document.createElement("div");
        frame.className = "bf-images-frame";
        frame.appendChild(this.cardHost);
        hostElement.appendChild(frame);
    };
    BotFrameworkContainer.prototype.getHostConfig = function () {
        return new GenietalkCards.HostConfig(hostConfig);
    };
    return BotFrameworkContainer;
}(host_container_1.HostContainer));
exports.BotFrameworkContainer = BotFrameworkContainer;
//# sourceMappingURL=bf-image-container.js.map