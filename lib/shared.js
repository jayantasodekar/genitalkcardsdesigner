"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportedTargetVersions = exports.GlobalSettings = void 0;
var GenietalkCards = require("genietalkcards");
var GlobalSettings = /** @class */ (function () {
    function GlobalSettings() {
    }
    GlobalSettings.enableDataBindingSupport = false;
    GlobalSettings.showDataStructureToolbox = false;
    GlobalSettings.showSampleDataEditorToolbox = false;
    GlobalSettings.showVersionPicker = false;
    GlobalSettings.selectedHostContainerControlsTargetVersion = true;
    GlobalSettings.showTargetVersionMismatchWarning = true;
    GlobalSettings.defaulttemplate = '';
    return GlobalSettings;
}());
exports.GlobalSettings = GlobalSettings;
exports.SupportedTargetVersions = [
    GenietalkCards.Versions.v1_0,
    GenietalkCards.Versions.v1_1,
    GenietalkCards.Versions.v1_2,
    GenietalkCards.Versions.v1_3
];
//# sourceMappingURL=shared.js.map