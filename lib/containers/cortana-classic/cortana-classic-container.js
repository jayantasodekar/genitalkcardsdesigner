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
exports.CortanaClassicContainer = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var GenietalkCards = require("genietalkcards");
var host_container_1 = require("../host-container");
var hostConfig = require("../../hostConfigs/cortana-skills-classic.json");
var CortanaClassicContainer = /** @class */ (function (_super) {
    __extends(CortanaClassicContainer, _super);
    function CortanaClassicContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CortanaClassicContainer.prototype.renderTo = function (hostElement) {
        this.cardHost.classList.add("cortana-card");
        var leftSide = document.createElement("div");
        leftSide.classList.add("cortana-leftside");
        var topLeft = document.createElement("div");
        topLeft.classList.add("cortana-topleft");
        var middleLeft = document.createElement("div");
        middleLeft.classList.add("cortana-middleleft");
        var bottomLeft = document.createElement("div");
        bottomLeft.classList.add("cortana-bottomleft");
        leftSide.appendChild(topLeft);
        leftSide.appendChild(middleLeft);
        leftSide.appendChild(bottomLeft);
        var rightSide = document.createElement("div");
        rightSide.classList.add("cortana-rightside");
        var header = document.createElement("div");
        header.classList.add("cortana-header");
        var searchBox = document.createElement("div");
        searchBox.classList.add("cortana-searchbox");
        var magnifyingGlass = document.createElement("div");
        magnifyingGlass.classList.add("cortana-searchbox-magnifyingglass");
        var searchBoxMiddle = document.createElement("div");
        searchBoxMiddle.classList.add("cortana-searchbox-middle");
        var microphone = document.createElement("div");
        microphone.classList.add("cortana-searchbox-microphone");
        searchBox.appendChild(magnifyingGlass);
        searchBox.appendChild(searchBoxMiddle);
        searchBox.appendChild(microphone);
        rightSide.appendChild(header);
        rightSide.appendChild(this.cardHost);
        rightSide.appendChild(searchBox);
        var frame = document.createElement("div");
        frame.classList.add("cortana-frame");
        frame.appendChild(leftSide);
        frame.appendChild(rightSide);
        hostElement.classList.add("cortana-outer-frame");
        hostElement.appendChild(frame);
    };
    CortanaClassicContainer.prototype.getHostConfig = function () {
        return new GenietalkCards.HostConfig(hostConfig);
    };
    return CortanaClassicContainer;
}(host_container_1.HostContainer));
exports.CortanaClassicContainer = CortanaClassicContainer;
//# sourceMappingURL=cortana-classic-container.js.map