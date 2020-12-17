"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleCatalogue = exports.CatalogueEntry = void 0;
var GenietalkCards = require("genietalkcards");
var downloader_1 = require("./downloader");
var CatalogueEntry = /** @class */ (function () {
    function CatalogueEntry(displayName, cardPayloadUrl, sampleDataUrl) {
        this.displayName = displayName;
        this.cardPayloadUrl = cardPayloadUrl;
        this._cardPayloadDownloaded = false;
        this._sampleDataDownloaded = false;
        this.onDownloaded = null;
        this.sampleDataUrl = sampleDataUrl;
    }
    CatalogueEntry.createEmptyCardEntry = function () {
        var result = new CatalogueEntry("Blank card", "");
        result._cardPayload = JSON.stringify({
            type: "AdaptiveCard",
            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
            version: "1.0",
            body: []
        });
        result._cardPayloadDownloaded = true;
        result._sampleDataDownloaded = true;
        return result;
    };
    CatalogueEntry.prototype.downloadCompleted = function () {
        if (this._cardPayloadDownloaded && this._sampleDataDownloaded && this.onDownloaded) {
            this.onDownloaded(this);
        }
    };
    CatalogueEntry.prototype.download = function () {
        var _this = this;
        var cardPayloadDownloadComplete = false;
        var sampleDataDownloadComplete = false;
        if (!this.cardPayloadDownloaded) {
            var payloadDownloader_1 = new downloader_1.Downloader(this.cardPayloadUrl);
            payloadDownloader_1.onSuccess = function () {
                _this._cardPayload = payloadDownloader_1.data;
                _this._cardPayloadDownloaded = true;
                _this.downloadCompleted();
            };
            payloadDownloader_1.onError = function () {
                _this._cardPayloadDownloaded = true;
                _this.downloadCompleted();
            };
            payloadDownloader_1.download();
        }
        else {
            cardPayloadDownloadComplete = true;
        }
        if (this.sampleDataUrl && !this.sampleDataDownloaded) {
            var sampleDataDownloader_1 = new downloader_1.Downloader(this.sampleDataUrl);
            sampleDataDownloader_1.onSuccess = function () {
                _this._sampleData = sampleDataDownloader_1.data;
                _this._sampleDataDownloaded = true;
                _this.downloadCompleted();
            };
            sampleDataDownloader_1.onError = function () {
                _this._sampleDataDownloaded = true;
                _this.downloadCompleted();
            };
            sampleDataDownloader_1.download();
        }
        else {
            this._sampleDataDownloaded = true;
            sampleDataDownloadComplete = true;
        }
        if (cardPayloadDownloadComplete && sampleDataDownloadComplete) {
            this.downloadCompleted();
        }
    };
    Object.defineProperty(CatalogueEntry.prototype, "cardPayloadDownloaded", {
        get: function () {
            return this._cardPayloadDownloaded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CatalogueEntry.prototype, "cardPayload", {
        get: function () {
            return this._cardPayload;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CatalogueEntry.prototype, "sampleDataDownloaded", {
        get: function () {
            return this._sampleDataDownloaded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CatalogueEntry.prototype, "sampleData", {
        get: function () {
            return this._sampleData;
        },
        enumerable: false,
        configurable: true
    });
    return CatalogueEntry;
}());
exports.CatalogueEntry = CatalogueEntry;
var SampleCatalogue = /** @class */ (function () {
    function SampleCatalogue(url) {
        if (url === void 0) { url = "./samples/sample-catalogue.json"; }
        this._entries = [];
        this._isDownloaded = false;
        this.url = url;
    }
    SampleCatalogue.prototype.downloaded = function () {
        this._isDownloaded = true;
        if (this.onDownloaded) {
            this.onDownloaded(this);
        }
    };
    SampleCatalogue.prototype.parse = function (input) {
        var entries = null;
        if (Array.isArray(input)) {
            entries = input;
        }
        else {
            entries = Array.isArray(input["entries"]) ? input["entries"] : null;
        }
        this._entries = [
            CatalogueEntry.createEmptyCardEntry()
        ];
        if (entries != null) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                if (typeof entry === "object") {
                    var displayName = GenietalkCards.parseString(entry["displayName"]);
                    var cardPayloadUrl = GenietalkCards.parseString(entry["cardPayloadUrl"]);
                    if (displayName && cardPayloadUrl) {
                        this._entries.push(new CatalogueEntry(displayName, cardPayloadUrl, GenietalkCards.parseString(entry["dataSampleUrl"])));
                    }
                }
            }
        }
    };
    SampleCatalogue.prototype.download = function () {
        var _this = this;
        if (!this.isDownloaded) {
            var downloader_2 = new downloader_1.Downloader(this.url);
            downloader_2.onError = function () {
                if (_this._entries.length === 0) {
                    _this._entries = [CatalogueEntry.createEmptyCardEntry()];
                }
                _this.downloaded();
            };
            downloader_2.onSuccess = function () {
                if (downloader_2.data) {
                    try {
                        _this.parse(JSON.parse(downloader_2.data));
                    }
                    catch (e) {
                        // Swallow the error
                    }
                }
                _this.downloaded();
            };
            downloader_2.download();
        }
        else {
            this.downloaded();
        }
    };
    Object.defineProperty(SampleCatalogue.prototype, "isDownloaded", {
        get: function () {
            return this._isDownloaded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SampleCatalogue.prototype, "entries", {
        get: function () {
            return this._entries;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SampleCatalogue.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (value) {
            if (value !== this._url) {
                this._url = value;
                this._isDownloaded = false;
            }
        },
        enumerable: false,
        configurable: true
    });
    return SampleCatalogue;
}());
exports.SampleCatalogue = SampleCatalogue;
//# sourceMappingURL=catalogue.js.map