import * as GenietalkCards from  "genietalkcards";

export class GlobalSettings {
    static enableDataBindingSupport: boolean = false;
    static showDataStructureToolbox: boolean = false;
    static showSampleDataEditorToolbox: boolean = false;
    static showVersionPicker: boolean = false;
    static selectedHostContainerControlsTargetVersion: boolean = true;
    static showTargetVersionMismatchWarning: boolean = true;
}

export var SupportedTargetVersions: GenietalkCards.Version[] = [
    GenietalkCards.Versions.v1_0,
    GenietalkCards.Versions.v1_1,
    GenietalkCards.Versions.v1_2,
    GenietalkCards.Versions.v1_3
];
