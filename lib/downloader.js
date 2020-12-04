"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Downloader = void 0;
var Downloader = /** @class */ (function () {
    function Downloader(url) {
        this.url = url;
        this.onError = null;
        this.onSuccess = null;
    }
    Downloader.prototype.error = function () {
        if (this.onError) {
            this.onError(this);
        }
    };
    Downloader.prototype.success = function () {
        if (this.onSuccess) {
            this.onSuccess(this);
        }
    };
    Downloader.prototype.download = function () {
        var _this = this;
        var request = new XMLHttpRequest();
        request.onerror = function () {
            _this.error();
        };
        request.onload = function () {
            _this._data = request.responseText;
            _this.success();
        };
        try {
            request.open("GET", this.url, true);
            request.send();
        }
        catch (e) {
            this.error();
        }
    };
    Object.defineProperty(Downloader.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    return Downloader;
}());
exports.Downloader = Downloader;
//# sourceMappingURL=downloader.js.map