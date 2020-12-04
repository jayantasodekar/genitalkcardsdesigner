"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Splitter = void 0;
var Splitter = /** @class */ (function () {
    function Splitter(attachedTo, sizedElement, isVertical, isAttachedAfter, minimumSize) {
        var _this = this;
        if (isVertical === void 0) { isVertical = false; }
        if (isAttachedAfter === void 0) { isAttachedAfter = false; }
        if (minimumSize === void 0) { minimumSize = 140; }
        this._isVertical = false;
        this._isAttachedAfter = false;
        this.minimum = 50;
        this.attachedTo = attachedTo;
        this._sizedELement = sizedElement;
        this._isVertical = isVertical;
        this._isAttachedAfter = isAttachedAfter;
        this.minimum = minimumSize;
        this.attachedTo.onmousedown = function (e) { e.preventDefault(); };
        this.attachedTo.onpointerdown = function (e) { _this.pointerDown(e); };
        this.attachedTo.onpointermove = function (e) { _this.pointerMove(e); };
        this.attachedTo.onpointerup = function (e) { _this.pointerUp(e); };
    }
    Splitter.prototype.resizeEnded = function () {
        if (this.onResizeEnded) {
            this.onResizeEnded(this);
        }
    };
    Splitter.prototype.pointerDown = function (e) {
        e.preventDefault();
        this.attachedTo.setPointerCapture(e.pointerId);
        this._lastClickedOffset = { x: e.x, y: e.y };
        this._isPointerDown = true;
    };
    Splitter.prototype.pointerMove = function (e) {
        if (this._isPointerDown) {
            e.preventDefault();
            var sizeApplied = false;
            var newSize = void 0;
            if (this._isVertical) {
                if (this._isAttachedAfter) {
                    newSize = this._sizedELement.getBoundingClientRect().width - (this._lastClickedOffset.x - e.x);
                }
                else {
                    newSize = this._sizedELement.getBoundingClientRect().width - (e.x - this._lastClickedOffset.x);
                }
                if (newSize >= this.minimum) {
                    this._sizedELement.style.width = newSize + "px";
                    sizeApplied = true;
                }
            }
            else {
                if (this._isAttachedAfter) {
                    newSize = this._sizedELement.getBoundingClientRect().height - (this._lastClickedOffset.y - e.y);
                }
                else {
                    newSize = this._sizedELement.getBoundingClientRect().height - (e.y - this._lastClickedOffset.y);
                }
                if (newSize >= this.minimum) {
                    this._sizedELement.style.height = newSize + "px";
                    sizeApplied = true;
                }
            }
            if (sizeApplied) {
                if (this.onResized) {
                    this.onResized(this);
                }
                this._lastClickedOffset = { x: e.x, y: e.y };
            }
        }
    };
    Splitter.prototype.pointerUp = function (e) {
        e.preventDefault();
        this.attachedTo.releasePointerCapture(e.pointerId);
        this.resizeEnded();
        this._isPointerDown = false;
    };
    return Splitter;
}());
exports.Splitter = Splitter;
//# sourceMappingURL=splitter.js.map