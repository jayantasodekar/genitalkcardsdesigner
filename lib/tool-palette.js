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
exports.SnippetPaletteItem = exports.CustomPaletteItem = exports.DataPaletteItem = exports.ElementPaletteItem = exports.BasePaletteItem = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var Adaptive = require("genietalkcards");
var draggable_element_1 = require("./draggable-element");
var card_designer_surface_1 = require("./card-designer-surface");
var BasePaletteItem = /** @class */ (function (_super) {
    __extends(BasePaletteItem, _super);
    function BasePaletteItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasePaletteItem.prototype.internalRender = function () {
        var element = document.createElement("div");
        element.className = "acd-palette-item";
        element.style.display = "flex";
        var iconElement = document.createElement("div");
        iconElement.classList.add("acd-icon", "acd-toolPalette-icon", this.getIconClass());
        iconElement.style.flex = "0 0 auto";
        var labelElement = document.createElement("div");
        labelElement.className = "acd-palette-item-label";
        labelElement.style.flex = "1 1 100%";
        labelElement.innerText = this.getText();
        element.appendChild(iconElement);
        element.appendChild(labelElement);
        return element;
    };
    BasePaletteItem.prototype.renderDragVisual = function () {
        return this.internalRender();
    };
    return BasePaletteItem;
}(draggable_element_1.DraggableElement));
exports.BasePaletteItem = BasePaletteItem;
var ElementPaletteItem = /** @class */ (function (_super) {
    __extends(ElementPaletteItem, _super);
    function ElementPaletteItem(typeRegistration, peerRegistration) {
        var _this = _super.call(this) || this;
        _this.typeRegistration = typeRegistration;
        _this.peerRegistration = peerRegistration;
        return _this;
    }
    ElementPaletteItem.prototype.getText = function () {
        return this.typeRegistration.typeName;
    };
    ElementPaletteItem.prototype.getIconClass = function () {
        return this.peerRegistration.iconClass;
    };
    ElementPaletteItem.prototype.createPeer = function (context, designer) {
        var peer = card_designer_surface_1.CardDesignerSurface.cardElementPeerRegistry.createPeerInstance(designer, null, new this.typeRegistration.objectType());
        peer.initializeCardElement();
        return peer;
    };
    return ElementPaletteItem;
}(BasePaletteItem));
exports.ElementPaletteItem = ElementPaletteItem;
var DataPaletteItem = /** @class */ (function (_super) {
    __extends(DataPaletteItem, _super);
    function DataPaletteItem(field) {
        var _this = _super.call(this) || this;
        _this.field = field;
        return _this;
    }
    DataPaletteItem.prototype.getText = function () {
        return this.field.name;
    };
    DataPaletteItem.prototype.getIconClass = function () {
        return null;
    };
    DataPaletteItem.prototype.createPeer = function (context, designer) {
        var element;
        if (this.field.isCollection) {
            element = new Adaptive.Container();
            element.setCustomProperty("$data", "{" + this.field.getPath() + "}");
        }
        else {
            var textBlock = new Adaptive.TextBlock();
            textBlock.text = "{" + this.field.getPath() + "}";
            element = textBlock;
        }
        var peer = card_designer_surface_1.CardDesignerSurface.cardElementPeerRegistry.createPeerInstance(designer, null, element);
        peer.initializeCardElement();
        return peer;
    };
    return DataPaletteItem;
}(BasePaletteItem));
exports.DataPaletteItem = DataPaletteItem;
var CustomPaletteItem = /** @class */ (function (_super) {
    __extends(CustomPaletteItem, _super);
    function CustomPaletteItem(category) {
        var _this = _super.call(this) || this;
        _this.category = category;
        return _this;
    }
    CustomPaletteItem.prototype.getIconClass = function () {
        return "acd-icon-customPaletteItem";
    };
    return CustomPaletteItem;
}(BasePaletteItem));
exports.CustomPaletteItem = CustomPaletteItem;
var SnippetPaletteItem = /** @class */ (function (_super) {
    __extends(SnippetPaletteItem, _super);
    function SnippetPaletteItem(category, name) {
        var _this = _super.call(this, category) || this;
        _this.name = name;
        return _this;
    }
    SnippetPaletteItem.prototype.getText = function () {
        return this.name;
    };
    SnippetPaletteItem.prototype.createPeer = function (context, designer) {
        if (this.snippet) {
            var rootElementTypeName = this.snippet["type"];
            if (rootElementTypeName) {
                var adaptiveElement = context.hostContainer.elementsRegistry.createInstance(rootElementTypeName, context.targetVersion);
                if (adaptiveElement) {
                    adaptiveElement.parse(this.snippet);
                    var peer = card_designer_surface_1.CardDesignerSurface.cardElementPeerRegistry.createPeerInstance(designer, null, adaptiveElement);
                    peer.initializeCardElement();
                    return peer;
                }
            }
        }
    };
    return SnippetPaletteItem;
}(CustomPaletteItem));
exports.SnippetPaletteItem = SnippetPaletteItem;
//# sourceMappingURL=tool-palette.js.map