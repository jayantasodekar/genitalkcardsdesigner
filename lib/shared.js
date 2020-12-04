"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportedTargetVersions = exports.GlobalSettings = void 0;
var Adaptive = require("adaptivecards");
var GlobalSettings = /** @class */ (function () {
    function GlobalSettings() {
    }
    GlobalSettings.enableDataBindingSupport = false;
    GlobalSettings.showDataStructureToolbox = false;
    GlobalSettings.showSampleDataEditorToolbox = false;
    GlobalSettings.showVersionPicker = false;
    GlobalSettings.selectedHostContainerControlsTargetVersion = true;
    GlobalSettings.showTargetVersionMismatchWarning = true;
    return GlobalSettings;
}());
exports.GlobalSettings = GlobalSettings;
exports.SupportedTargetVersions = [
    Adaptive.Versions.v1_0,
    Adaptive.Versions.v1_1,
    Adaptive.Versions.v1_2,
    Adaptive.Versions.v1_3
];
//# sourceMappingURL=shared.js.map