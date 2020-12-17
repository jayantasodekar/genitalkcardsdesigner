"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHostConfig = exports.Utils = exports.Rect = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var GenietalkCards = require("genietalkcards");
var Rect = /** @class */ (function () {
    function Rect(top, right, bottom, left) {
        if (top === void 0) { top = 0; }
        if (right === void 0) { right = 0; }
        if (bottom === void 0) { bottom = 0; }
        if (left === void 0) { left = 0; }
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
    Rect.prototype.union = function (otherRect) {
        this.top = Math.min(this.top, otherRect.top);
        this.left = Math.min(this.left, otherRect.left);
        this.bottom = Math.max(this.bottom, otherRect.bottom);
        this.right = Math.max(this.right, otherRect.right);
    };
    Rect.prototype.isInside = function (point) {
        return point.x >= this.left && point.x <= this.right && point.y >= this.top && point.y <= this.bottom;
    };
    Object.defineProperty(Rect.prototype, "width", {
        get: function () {
            return this.right - this.left;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "height", {
        get: function () {
            return this.bottom - this.top;
        },
        enumerable: false,
        configurable: true
    });
    return Rect;
}());
exports.Rect = Rect;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.isAbsoluteUrl = function (urlString) {
        return urlString.indexOf('http://') === 0
            || urlString.indexOf('https://') === 0;
    };
    Utils.joinPaths = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.map(function (part, i) {
            if (!part) {
                part = "";
            }
            if (i === 0) {
                return part.trim().replace(/[\/]*$/g, '');
            }
            else {
                return part.trim().replace(/(^[\/]*|[\/]*$)/g, '');
            }
        }).filter(function (x) { return x.length; }).join('/');
    };
    return Utils;
}());
exports.Utils = Utils;
exports.defaultHostConfig = new GenietalkCards.HostConfig({
    preExpandSingleShowCardAction: true,
    supportsInteractivity: true,
    spacing: {
        small: 10,
        default: 20,
        medium: 30,
        large: 40,
        extraLarge: 50,
        padding: 20
    },
    separator: {
        lineThickness: 1,
        lineColor: "#EEEEEE"
    },
    textAlign: {
        right: "right"
    },
    imageSizes: {
        small: 40,
        medium: 80,
        large: 160
    },
    fontStyles: {
        default: {
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSizes: {
                small: 12,
                default: 14,
                medium: 17,
                large: 21,
                extraLarge: 26
            },
            fontWeights: {
                lighter: 200,
                default: 400,
                bolder: 600
            }
        },
        monospace: {
            fontFamily: "'Courier New', Courier, monospace",
            fontSizes: {
                small: 12,
                default: 14,
                medium: 17,
                large: 21,
                extraLarge: 26
            },
            fontWeights: {
                lighter: 200,
                default: 400,
                bolder: 600
            }
        }
    },
    containerStyles: {
        default: {
            backgroundColor: "#f9f9f9",
            foregroundColors: {
                default: {
                    default: "#333333",
                    subtle: "#EE333333"
                },
                accent: {
                    default: "#2E89FC",
                    subtle: "#882E89FC"
                },
                attention: {
                    default: "#cc3300",
                    subtle: "#DDcc3300"
                },
                good: {
                    default: "#54a254",
                    subtle: "#DD54a254"
                },
                warning: {
                    default: "#e69500",
                    subtle: "#DDe69500"
                }
            }
        },
        emphasis: {
            backgroundColor: "#08000000",
            foregroundColors: {
                default: {
                    default: "#333333",
                    subtle: "#EE333333"
                },
                accent: {
                    default: "#2E89FC",
                    subtle: "#882E89FC"
                },
                attention: {
                    default: "#cc3300",
                    subtle: "#DDcc3300"
                },
                good: {
                    default: "#54a254",
                    subtle: "#DD54a254"
                },
                warning: {
                    default: "#e69500",
                    subtle: "#DDe69500"
                }
            }
        },
        accent: {
            backgroundColor: "#C7DEF9",
            foregroundColors: {
                default: {
                    default: "#333333",
                    subtle: "#EE333333"
                },
                dark: {
                    default: "#000000",
                    subtle: "#66000000"
                },
                light: {
                    default: "#FFFFFF",
                    subtle: "#33000000"
                },
                accent: {
                    default: "#2E89FC",
                    subtle: "#882E89FC"
                },
                attention: {
                    default: "#cc3300",
                    subtle: "#DDcc3300"
                },
                good: {
                    default: "#54a254",
                    subtle: "#DD54a254"
                },
                warning: {
                    default: "#e69500",
                    subtle: "#DDe69500"
                }
            }
        },
        good: {
            backgroundColor: "#CCFFCC",
            foregroundColors: {
                default: {
                    default: "#333333",
                    subtle: "#EE333333"
                },
                dark: {
                    default: "#000000",
                    subtle: "#66000000"
                },
                light: {
                    default: "#FFFFFF",
                    subtle: "#33000000"
                },
                accent: {
                    default: "#2E89FC",
                    subtle: "#882E89FC"
                },
                attention: {
                    default: "#cc3300",
                    subtle: "#DDcc3300"
                },
                good: {
                    default: "#54a254",
                    subtle: "#DD54a254"
                },
                warning: {
                    default: "#e69500",
                    subtle: "#DDe69500"
                }
            }
        },
        attention: {
            backgroundColor: "#FFC5B2",
            foregroundColors: {
                default: {
                    default: "#333333",
                    subtle: "#EE333333"
                },
                dark: {
                    default: "#000000",
                    subtle: "#66000000"
                },
                light: {
                    default: "#FFFFFF",
                    subtle: "#33000000"
                },
                accent: {
                    default: "#2E89FC",
                    subtle: "#882E89FC"
                },
                attention: {
                    default: "#cc3300",
                    subtle: "#DDcc3300"
                },
                good: {
                    default: "#54a254",
                    subtle: "#DD54a254"
                },
                warning: {
                    default: "#e69500",
                    subtle: "#DDe69500"
                }
            }
        },
        warning: {
            backgroundColor: "#FFE2B2",
            foregroundColors: {
                default: {
                    default: "#333333",
                    subtle: "#EE333333"
                },
                dark: {
                    default: "#000000",
                    subtle: "#66000000"
                },
                light: {
                    default: "#FFFFFF",
                    subtle: "#33000000"
                },
                accent: {
                    default: "#2E89FC",
                    subtle: "#882E89FC"
                },
                attention: {
                    default: "#cc3300",
                    subtle: "#DDcc3300"
                },
                good: {
                    default: "#54a254",
                    subtle: "#DD54a254"
                },
                warning: {
                    default: "#e69500",
                    subtle: "#DDe69500"
                }
            }
        }
    },
    actions: {
        maxActions: 5,
        spacing: GenietalkCards.Spacing.Default,
        buttonSpacing: 10,
        showCard: {
            actionMode: GenietalkCards.ShowCardActionMode.Inline,
            inlineTopMargin: 16
        },
        actionsOrientation: GenietalkCards.Orientation.Horizontal,
        actionAlignment: GenietalkCards.ActionAlignment.Left
    },
    adaptiveCard: {
        allowCustomStyle: true
    },
    imageSet: {
        imageSize: GenietalkCards.Size.Medium,
        maxImageHeight: 100
    },
    factSet: {
        title: {
            color: GenietalkCards.TextColor.Default,
            size: GenietalkCards.TextSize.Default,
            isSubtle: false,
            weight: GenietalkCards.TextWeight.Bolder,
            wrap: true,
            maxWidth: 150,
        },
        value: {
            color: GenietalkCards.TextColor.Default,
            size: GenietalkCards.TextSize.Default,
            isSubtle: false,
            weight: GenietalkCards.TextWeight.Default,
            wrap: true,
        },
        spacing: 10
    }
});
exports.defaultHostConfig.cssClassNamePrefix = "default";
//# sourceMappingURL=miscellaneous.js.map