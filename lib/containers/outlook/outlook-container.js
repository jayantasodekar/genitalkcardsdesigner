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
exports.OutlookContainer = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var Adaptive = require("genietalkcards");
var host_container_1 = require("../host-container");
var hostConfig = require("../../hostConfigs/outlook-desktop.json");
var OutlookContainer = /** @class */ (function (_super) {
    __extends(OutlookContainer, _super);
    function OutlookContainer(name, styleSheet) {
        var _this = _super.call(this, name, styleSheet) || this;
        _this.actionsRegistry.unregister("Action.Submit");
        _this.actionsRegistry.register("Action.Http", Adaptive.HttpAction);
        return _this;
    }
    OutlookContainer.prototype.renderTo = function (hostElement) {
        hostElement.classList.add("outlook-frame");
        hostElement.appendChild(this.cardHost);
    };
    OutlookContainer.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Adaptive.GlobalSettings.useMarkdownInRadioButtonAndCheckbox = false;
    };
    OutlookContainer.prototype.parsePadding = function (source) {
        if (source) {
            if (typeof source === "string") {
                var uniformPadding = Adaptive.parseEnum(Adaptive.Spacing, source, Adaptive.Spacing.None);
                return new Adaptive.PaddingDefinition(uniformPadding, uniformPadding, uniformPadding, uniformPadding);
            }
            else if (typeof source === "object") {
                return new Adaptive.PaddingDefinition(Adaptive.parseEnum(Adaptive.Spacing, source["top"], Adaptive.Spacing.None), Adaptive.parseEnum(Adaptive.Spacing, source["right"], Adaptive.Spacing.None), Adaptive.parseEnum(Adaptive.Spacing, source["bottom"], Adaptive.Spacing.None), Adaptive.parseEnum(Adaptive.Spacing, source["left"], Adaptive.Spacing.None));
            }
        }
        return null;
    };
    OutlookContainer.prototype.parseElement = function (element, source, context) {
        if (element instanceof Adaptive.Container && typeof source["rtl"] === "boolean") {
            element.rtl = source["rtl"];
        }
        if (element instanceof Adaptive.AdaptiveCard) {
            var card = element;
            var actionArray = [];
            card["resources"] = { actions: actionArray };
            if (typeof source["resources"] === "object") {
                var actionResources = source["resources"]["actions"];
                for (var i = 0; i < actionResources.length; i++) {
                    var action = this.actionsRegistry.createInstance(actionResources[i]["type"], context.targetVersion);
                    if (action) {
                        action.parse(actionResources[i], context);
                        action.setParent(card);
                        actionArray.push(action);
                    }
                }
            }
        }
        if (element instanceof Adaptive.Image) {
            element.backgroundColor = source["backgroundColor"];
        }
        if (element instanceof Adaptive.Container) {
            var padding = this.parsePadding(source["padding"]);
            if (padding) {
                element.padding = padding;
            }
        }
        if (element instanceof Adaptive.ColumnSet) {
            var padding = this.parsePadding(source["padding"]);
            if (padding) {
                element.padding = padding;
            }
        }
    };
    OutlookContainer.prototype.anchorClicked = function (element, anchor) {
        var regEx = /^action:([a-z0-9]+)$/ig;
        var rootCard = element.getRootElement();
        var matches = regEx.exec(anchor.href);
        if (matches) {
            var actionId = matches[1];
            if (rootCard) {
                var actionArray = rootCard["resources"]["actions"];
                for (var i = 0; i < actionArray.length; i++) {
                    if (actionArray[i].id == actionId) {
                        actionArray[i].execute();
                        return true;
                    }
                }
            }
        }
        return false;
    };
    OutlookContainer.prototype.getHostConfig = function () {
        return new Adaptive.HostConfig(hostConfig);
    };
    return OutlookContainer;
}(host_container_1.HostContainer));
exports.OutlookContainer = OutlookContainer;
//# sourceMappingURL=outlook-container.js.map