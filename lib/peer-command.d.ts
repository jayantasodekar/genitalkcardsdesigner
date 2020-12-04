export declare class PeerCommand {
    private _renderedElement;
    protected internalRender(): HTMLElement;
    name: string;
    alwaysShowName: boolean;
    toolTip: string;
    iconClass: string;
    isPromotable: boolean;
    showInPropertySheet: boolean;
    execute: (command: PeerCommand, clickedElement: HTMLElement) => void;
    constructor(init?: Partial<PeerCommand>);
    render(): HTMLElement;
    get renderedElement(): HTMLElement;
}
