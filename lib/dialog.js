"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = exports.DialogButton = void 0;
var DialogButton = /** @class */ (function () {
    function DialogButton(caption) {
        this.caption = caption;
    }
    DialogButton.prototype.render = function () {
        var _this = this;
        var element = document.createElement("button");
        element.className = "acd-dialog-button";
        element.innerText = this.caption;
        element.onclick = function (e) {
            _this.clicked();
        };
        return element;
    };
    DialogButton.prototype.clicked = function () {
        if (this.onClick) {
            this.onClick(this);
        }
    };
    return DialogButton;
}());
exports.DialogButton = DialogButton;
var Dialog = /** @class */ (function () {
    function Dialog() {
        var _this = this;
        this._isOpen = false;
        this.onClose = null;
        this.closeButton = new DialogButton("Close");
        this.closeButton.onClick = function (sender) {
            _this.close();
        };
    }
    Dialog.prototype.open = function () {
        var _this = this;
        if (!this._isOpen) {
            this._overlayElement = document.createElement("div");
            this._overlayElement.className = "acd-dialog-overlay";
            var dialogFrameElement = document.createElement("div");
            dialogFrameElement.className = "acd-dialog-frame";
            dialogFrameElement.style.width = this.width;
            dialogFrameElement.style.height = this.height;
            dialogFrameElement.style.justifyContent = "space-between";
            var titleBarElement = document.createElement("div");
            titleBarElement.style.display = "flex";
            titleBarElement.style.alignItems = "center";
            titleBarElement.style.flex = "0 0 auto";
            titleBarElement.style.marginBottom = "10px";
            var titleElement = document.createElement("div");
            titleElement.className = "acd-dialog-title";
            titleElement.innerText = this.title;
            titleElement.style.flex = "1 1 auto";
            var xButton = document.createElement("button");
            xButton.className = "acd-icon acd-dialog-titleBar-button acd-icon-remove";
            xButton.style.flex = "0 0 auto";
            xButton.title = "Close";
            xButton.onclick = function (e) { _this.close(); };
            titleBarElement.append(titleElement, xButton);
            var contentElement = this.renderContent();
            contentElement.style.flex = "1 1 auto";
            var buttonBarElement = document.createElement("div");
            buttonBarElement.className = "acd-dialog-buttonBar";
            buttonBarElement.style.flex = "0 0 auto";
            buttonBarElement.appendChild(this.closeButton.render());
            dialogFrameElement.appendChild(titleBarElement);
            dialogFrameElement.appendChild(contentElement);
            dialogFrameElement.appendChild(buttonBarElement);
            this._overlayElement.appendChild(dialogFrameElement);
            document.body.appendChild(this._overlayElement);
            this._isOpen = true;
        }
    };
    Dialog.prototype.close = function () {
        if (this._isOpen) {
            document.body.removeChild(this._overlayElement);
            this._isOpen = false;
            if (this.onClose) {
                this.onClose(this);
            }
        }
    };
    return Dialog;
}());
exports.Dialog = Dialog;
//# sourceMappingURL=dialog.js.map