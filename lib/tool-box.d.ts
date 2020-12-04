export interface IToolboxCommand {
    title: string;
    iconClass: string;
    execute: (sender: IToolboxCommand) => void;
}
export declare enum ToolboxOrientation {
    Horizontal = 0,
    Vertical = 1
}
export declare class Toolbox {
    private _renderedElement;
    private _headerRootElement;
    private _headerIconElement;
    private _expandCollapseButtonElement;
    private _customCommandsHost;
    private _contentHost;
    private _isExpanded;
    private _content;
    private _stretch;
    private _orientation;
    private _isRestoring;
    private _collapsedTabContainer;
    private getDimensionSettingName;
    private updateContent;
    private toggled;
    onToggled: (sender: Toolbox) => void;
    readonly id: string;
    readonly title: string;
    commands: Array<IToolboxCommand>;
    constructor(id: string, title: string);
    render(orientation: ToolboxOrientation, collapsedTabContainer: HTMLElement): void;
    collapse(): void;
    expand(): void;
    toggle(): void;
    getHeaderBoundingRect(): ClientRect;
    saveState(): void;
    restoreState(): void;
    get orientation(): ToolboxOrientation;
    get renderedElement(): HTMLElement;
    get content(): HTMLElement;
    set content(value: HTMLElement);
    get isExpanded(): boolean;
    get stretch(): boolean;
    set stretch(value: boolean);
}
