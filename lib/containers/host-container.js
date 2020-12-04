"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostContainer = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var adaptivecards_1 = require("adaptivecards");
var hostConfig = require("../hostConfigs/sample.json");
var HostContainer = /** @class */ (function () {
    function HostContainer(name, styleSheet) {
        this._elementsRegistry = new adaptivecards_1.CardObjectRegistry();
        this._actionsRegistry = new adaptivecards_1.CardObjectRegistry();
        this.supportsActionBar = false;
        this.name = name;
        this.styleSheet = styleSheet;
        this._cardHost = document.createElement("div");
        this._cardHost.className = "cardHost";
        adaptivecards_1.GlobalRegistry.populateWithDefaultElements(this._elementsRegistry);
        adaptivecards_1.GlobalRegistry.populateWithDefaultActions(this._actionsRegistry);
    }
    HostContainer.prototype.initialize = function () {
        adaptivecards_1.GlobalSettings.useMarkdownInRadioButtonAndCheckbox = true;
        adaptivecards_1.GlobalSettings.useAdvancedCardBottomTruncation = false;
        adaptivecards_1.GlobalSettings.useAdvancedTextBlockTruncation = true;
    };
    HostContainer.prototype.createSerializationContext = function (targetVersion) {
        var context = new adaptivecards_1.SerializationContext(targetVersion);
        context.setElementRegistry(this.elementsRegistry);
        context.setActionRegistry(this.actionsRegistry);
        return context;
    };
    HostContainer.prototype.getBackgroundColor = function () {
        return "#F6F6F6";
    };
    HostContainer.prototype.parseElement = function (element, source, context) {
        // Do nothing in base implementation
    };
    HostContainer.prototype.anchorClicked = function (element, anchor) {
        // Not handled by the host container by default
        return false;
    };
    HostContainer.prototype.getHostConfig = function () {
        return new adaptivecards_1.HostConfig(hostConfig);
    };
    Object.defineProperty(HostContainer.prototype, "cardHost", {
        get: function () {
            return this._cardHost;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HostContainer.prototype, "isFixedHeight", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HostContainer.prototype, "elementsRegistry", {
        get: function () {
            return this._elementsRegistry;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HostContainer.prototype, "actionsRegistry", {
        get: function () {
            return this._actionsRegistry;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HostContainer.prototype, "targetVersion", {
        get: function () {
            return adaptivecards_1.Versions.v1_0;
        },
        enumerable: false,
        configurable: true
    });
    return HostContainer;
}());
exports.HostContainer = HostContainer;
//# sourceMappingURL=host-container.js.map