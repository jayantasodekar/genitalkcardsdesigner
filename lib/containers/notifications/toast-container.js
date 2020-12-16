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
exports.ToastContainer = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var Adaptive = require("genietalkcards");
var host_container_1 = require("../host-container");
var hostConfig = require("../../hostConfigs/windows-notification.json");
var ToastContainer = /** @class */ (function (_super) {
    __extends(ToastContainer, _super);
    function ToastContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToastContainer.prototype.renderTo = function (hostElement) {
        this.cardHost.classList.add("toast-card");
        var frame = document.createElement("div");
        frame.className = "toast-frame";
        frame.appendChild(this.cardHost);
        hostElement.appendChild(frame);
    };
    ToastContainer.prototype.getHostConfig = function () {
        return new Adaptive.HostConfig(hostConfig);
    };
    return ToastContainer;
}(host_container_1.HostContainer));
exports.ToastContainer = ToastContainer;
//# sourceMappingURL=toast-container.js.map