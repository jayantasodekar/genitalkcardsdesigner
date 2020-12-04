import { Toolbox } from "./tool-box";
export declare enum SidePanelAlignment {
    Top = 0,
    Right = 1,
    Bottom = 2,
    Left = 3
}
export declare class SidePanel {
    private _attachedTo;
    private _alignment;
    private _collapsedTabContainer;
    private _contentHost;
    private _toolboxes;
    private _isRestoring;
    private updateLayout;
    private computeToolboxSize;
    private resized;
    private toolboxResized;
    private toolboxExpandedOrCollapsed;
    private getDimensionSettingName;
    private get isVertical();
    onResized: (sender: SidePanel) => void;
    onToolboxResized: (sender: SidePanel, toolbox: Toolbox) => void;
    onToolboxExpandedOrCollapsed: (sender: SidePanel, toolbox: Toolbox) => void;
    readonly id: any;
    size?: number;
    isResizable: boolean;
    addToolbox(toolbox: Toolbox): void;
    attachTo(attachTo: HTMLElement): void;
    constructor(id: string, alignment: SidePanelAlignment, collapsedTabContainer: HTMLElement);
    saveState(): void;
    restoreState(): void;
    get contentHost(): HTMLElement;
}
