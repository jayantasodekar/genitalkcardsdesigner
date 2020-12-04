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
exports.TimelineContainer = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var Adaptive = require("adaptivecards");
var host_container_1 = require("../host-container");
var hostConfig = require("../../hostConfigs/windows-timeline.json");
var TimelineContainer = /** @class */ (function (_super) {
    __extends(TimelineContainer, _super);
    function TimelineContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimelineContainer.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Adaptive.GlobalSettings.useMarkdownInRadioButtonAndCheckbox = true;
        Adaptive.GlobalSettings.useAdvancedCardBottomTruncation = true;
        Adaptive.GlobalSettings.useAdvancedTextBlockTruncation = true;
    };
    TimelineContainer.prototype.renderTo = function (hostElement) {
        var target = document.getElementById("designerHost");
        var frame = document.createElement("div");
        frame.className = "timeline-frame";
        target.appendChild(frame);
        var cardContainer = document.createElement("div");
        cardContainer.className = "timeline-card";
        frame.appendChild(cardContainer);
        this.cardHost.style.height = "100%";
        this.cardHost.style.width = "100%";
        this.cardHost.style.overflow = "hidden";
        cardContainer.appendChild(this.cardHost);
        hostElement.appendChild(frame);
    };
    TimelineContainer.prototype.getHostConfig = function () {
        return new Adaptive.HostConfig(hostConfig);
    };
    Object.defineProperty(TimelineContainer.prototype, "isFixedHeight", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    return TimelineContainer;
}(host_container_1.HostContainer));
exports.TimelineContainer = TimelineContainer;
//# sourceMappingURL=timeline-container.js.map