"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraggableElement = exports.DRAG_THRESHOLD = void 0;
exports.DRAG_THRESHOLD = 10;
var DraggableElement = /** @class */ (function () {
    function DraggableElement() {
    }
    DraggableElement.prototype.releasePointerCapture = function (pointerId) {
        this.getDragSourceElement().releasePointerCapture(pointerId);
        this._isPointerDown = false;
    };
    Object.defineProperty(DraggableElement.prototype, "isPointerOver", {
        get: function () {
            return this._isPointerOver;
        },
        set: function (value) {
            if (value != this._isPointerOver) {
                this._isPointerOver = value;
                this.updateLayout();
            }
        },
        enumerable: false,
        configurable: true
    });
    DraggableElement.prototype.startDrag = function () {
        if (this.isDraggable() && !this.dragging) {
            this.dragging = true;
            if (this.onStartDrag) {
                this.onStartDrag(this);
            }
        }
    };
    DraggableElement.prototype.pointerDown = function (e) {
        if (!this._isPointerDown) {
            this._isPointerDown = true;
            this._lastClickedPoint = { x: e.offsetX, y: e.offsetY };
            this.getDragSourceElement().setPointerCapture(e.pointerId);
        }
    };
    DraggableElement.prototype.pointerUp = function (e) {
        if (this._isPointerDown) {
            this.releasePointerCapture(e.pointerId);
            this.endDrag();
        }
    };
    DraggableElement.prototype.pointerMove = function (e) {
        if (this._isPointerDown) {
            if (Math.abs(e.offsetX - this._lastClickedPoint.x) >= exports.DRAG_THRESHOLD || Math.abs(e.offsetY - this._lastClickedPoint.y) >= exports.DRAG_THRESHOLD) {
                this.releasePointerCapture(e.pointerId);
                this.startDrag();
            }
        }
    };
    DraggableElement.prototype.click = function (e) {
        if (this.onClick) {
            this.onDoubleClick(this);
        }
    };
    DraggableElement.prototype.doubleClick = function (e) {
        if (this.onDoubleClick) {
            this.onDoubleClick(this);
        }
    };
    DraggableElement.prototype.internalUpdateCssStyles = function () {
        // Do nothing in base implementation
    };
    DraggableElement.prototype.internalUpdateLayout = function () {
        // Do nothing in base implementation
    };
    DraggableElement.prototype.getDragSourceElement = function () {
        return this._renderedElement;
    };
    DraggableElement.prototype.isDraggable = function () {
        return true;
    };
    DraggableElement.prototype.endDrag = function () {
        if (this.dragging) {
            this.dragging = false;
            if (this.onEndDrag) {
                this.onEndDrag(this);
            }
        }
    };
    DraggableElement.prototype.updateLayout = function () {
        this.internalUpdateCssStyles();
        this.internalUpdateLayout();
    };
    DraggableElement.prototype.render = function () {
        var _this = this;
        this._renderedElement = this.internalRender();
        var dragSourceElement = this.getDragSourceElement();
        dragSourceElement.onclick = function (e) { _this.click(e); };
        dragSourceElement.ondblclick = function (e) { _this.doubleClick(e); };
        if (this.isDraggable()) {
            dragSourceElement.onmousedown = function (e) { e.preventDefault(); };
            dragSourceElement.onpointerenter = function () { _this.isPointerOver = true; };
            dragSourceElement.onpointerleave = function () { _this.isPointerOver = false; };
            dragSourceElement.onpointerdown = function (e) { _this.pointerDown(e); };
            dragSourceElement.onpointerup = function (e) { _this.pointerUp(e); };
            dragSourceElement.onpointermove = function (e) { _this.pointerMove(e); };
        }
        return this._renderedElement;
    };
    Object.defineProperty(DraggableElement.prototype, "renderedElement", {
        get: function () {
            return this._renderedElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DraggableElement.prototype, "dragging", {
        get: function () {
            return this._dragging;
        },
        set: function (value) {
            this._dragging = value;
            this.internalUpdateCssStyles();
        },
        enumerable: false,
        configurable: true
    });
    return DraggableElement;
}());
exports.DraggableElement = DraggableElement;
//# sourceMappingURL=draggable-element.js.map