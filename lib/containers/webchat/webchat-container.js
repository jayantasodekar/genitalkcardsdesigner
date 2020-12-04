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
exports.WebChatContainer = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var Adaptive = require("adaptivecards");
var host_container_1 = require("../host-container");
var hostConfig = require("../../hostConfigs/webchat.json");
var WebChatContainer = /** @class */ (function (_super) {
    __extends(WebChatContainer, _super);
    function WebChatContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebChatContainer.prototype.renderTo = function (hostElement) {
        this.cardHost.classList.add("webChatOuterContainer");
        var frame = document.createElement("div");
        frame.className = "webChatInnerContainer";
        frame.appendChild(this.cardHost);
        hostElement.appendChild(frame);
    };
    WebChatContainer.prototype.getHostConfig = function () {
        return new Adaptive.HostConfig(hostConfig);
    };
    Object.defineProperty(WebChatContainer.prototype, "targetVersion", {
        get: function () {
            return Adaptive.Versions.v1_2;
        },
        enumerable: false,
        configurable: true
    });
    return WebChatContainer;
}(host_container_1.HostContainer));
exports.WebChatContainer = WebChatContainer;
//# sourceMappingURL=webchat-container.js.map