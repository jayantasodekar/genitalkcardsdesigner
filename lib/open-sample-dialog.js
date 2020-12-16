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
exports.OpenSampleDialog = void 0;
var ACData = require("adaptivecards-templating");
var Adaptive = require("genietalkcards");
var dialog_1 = require("./dialog");
var CatalogueItem = /** @class */ (function () {
    function CatalogueItem(entry) {
        this.entry = entry;
    }
    CatalogueItem.prototype.render = function () {
        var _this = this;
        var element = document.createElement("div");
        element.className = "acd-open-sample-item";
        element.onclick = function (e) {
            if (_this.onClick) {
                _this.onClick(_this);
            }
        };
        var thumbnailHost = document.createElement("div");
        thumbnailHost.className = "acd-open-sample-item-thumbnail";
        var spinner = document.createElement("div");
        spinner.className = "acd-spinner";
        spinner.style.width = "28px";
        spinner.style.height = "28px";
        thumbnailHost.appendChild(spinner);
        var displayNameElement = document.createElement("div");
        displayNameElement.className = "acd-open-sample-item-title";
        displayNameElement.innerText = this.entry.displayName;
        element.append(thumbnailHost, displayNameElement);
        this.entry.onDownloaded = function (sender) {
            thumbnailHost.removeChild(spinner);
            if (sender.cardPayloadDownloaded) {
                var cardPayload = JSON.parse(sender.cardPayload);
                if (sender.sampleData) {
                    var template = new ACData.Template(cardPayload);
                    cardPayload = template.expand({
                        $root: JSON.parse(sender.sampleData)
                    });
                }
                var card = new Adaptive.AdaptiveCard();
                card.parse(cardPayload);
                card.render();
                card.renderedElement.style.width = "100%";
                thumbnailHost.appendChild(card.renderedElement);
            }
            else {
                var errorMessage = document.createElement("div");
                errorMessage.className = "acd-dialog-message";
                errorMessage.innerText = "Preview not available";
                thumbnailHost.appendChild(errorMessage);
            }
        };
        this.entry.download();
        return element;
    };
    return CatalogueItem;
}());
var OpenSampleDialog = /** @class */ (function (_super) {
    __extends(OpenSampleDialog, _super);
    function OpenSampleDialog(catalogue) {
        var _this = _super.call(this) || this;
        _this.catalogue = catalogue;
        return _this;
    }
    OpenSampleDialog.prototype.setContent = function (element) {
        while (this._renderedElement.firstChild) {
            this._renderedElement.removeChild(this._renderedElement.firstChild);
        }
        if (element) {
            this._renderedElement.appendChild(element);
        }
    };
    OpenSampleDialog.prototype.renderMessage = function (message, showSpinner) {
        var messageHostElement = document.createElement("div");
        messageHostElement.style.display = "flex";
        messageHostElement.style.flexDirection = "column";
        messageHostElement.style.alignItems = "center";
        messageHostElement.style.justifyContent = "center";
        messageHostElement.style.height = "100%";
        if (showSpinner) {
            var spinnerElement = document.createElement("div");
            spinnerElement.className = "acd-spinner";
            spinnerElement.style.width = "28px";
            spinnerElement.style.height = "28px";
            messageHostElement.appendChild(spinnerElement);
        }
        var textElement = document.createElement("div");
        textElement.className = "acd-dialog-message";
        textElement.innerText = message;
        textElement.style.marginTop = "10px";
        messageHostElement.appendChild(textElement);
        return messageHostElement;
    };
    OpenSampleDialog.prototype.renderCatalogue = function () {
        var _this = this;
        var renderedElement = document.createElement("div");
        renderedElement.className = "acd-open-sample-item-container";
        for (var _i = 0, _a = this.catalogue.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            var item = new CatalogueItem(entry);
            item.onClick = function (sender) {
                _this._selectedSample = sender.entry;
                _this.close();
            };
            renderedElement.appendChild(item.render());
        }
        return renderedElement;
    };
    OpenSampleDialog.prototype.renderContent = function () {
        var _this = this;
        this._renderedElement = document.createElement("div");
        this._renderedElement.style.overflow = "auto";
        this.setContent(this.renderMessage("Loading sample catalogue, please wait...", true));
        this.catalogue.onDownloaded = function (sender) {
            if (sender.isDownloaded) {
                _this.setContent(_this.renderCatalogue());
            }
            else {
                _this.setContent(_this.renderMessage("The catalogue couldn't be loaded. Please try again later.", false));
            }
        };
        this.catalogue.download();
        return this._renderedElement;
    };
    Object.defineProperty(OpenSampleDialog.prototype, "selectedSample", {
        get: function () {
            return this._selectedSample;
        },
        enumerable: false,
        configurable: true
    });
    return OpenSampleDialog;
}(dialog_1.Dialog));
exports.OpenSampleDialog = OpenSampleDialog;
//# sourceMappingURL=open-sample-dialog.js.map