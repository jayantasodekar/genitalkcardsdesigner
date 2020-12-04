export declare enum ToolbarElementAlignment {
    Left = 0,
    Right = 1
}
export declare abstract class ToolbarElement {
    private _renderedElement;
    protected abstract internalRender(): HTMLElement;
    protected internalUpdateLayout(): void;
    readonly id: string;
    isVisible: boolean;
    separator: boolean;
    label: string;
    alignment: ToolbarElementAlignment;
    constructor(id: string);
    updateLayout(): void;
    render(): HTMLElement;
    get renderedElement(): HTMLElement;
}
export declare class ToolbarButton extends ToolbarElement {
    private _caption;
    private _displayCaption;
    private _iconClass;
    private _toolTip;
    private _isEnabled;
    private _allowToggle;
    private _isToggled;
    protected clicked(): void;
    protected internalUpdateLayout(): void;
    protected internalRender(): HTMLElement;
    onClick: (sender: ToolbarButton) => void;
    constructor(id: string, caption: string, iconClass: string, onClick?: (sender: ToolbarButton) => void);
    get allowToggle(): boolean;
    set allowToggle(value: boolean);
    get isToggled(): boolean;
    set isToggled(value: boolean);
    get caption(): string;
    set caption(value: string);
    get displayCaption(): boolean;
    set displayCaption(value: boolean);
    get iconClass(): string;
    set iconClass(value: string);
    get toolTip(): string;
    set toolTip(value: string);
    get isEnabled(): boolean;
    set isEnabled(value: boolean);
}
export interface IChoicePickerItem {
    name: string;
    value: string;
}
export declare class ToolbarChoicePicker extends ToolbarElement {
    private _dropDown;
    protected internalRender(): HTMLElement;
    onChanged: (sender: ToolbarChoicePicker) => void;
    label: string;
    choices: Array<IChoicePickerItem>;
    width?: number;
    get value(): string;
    get selectedIndex(): number;
    set selectedIndex(value: number);
}
export declare class Toolbar {
    private _elements;
    private _attachedTo;
    private createSeparatorElement;
    private renderElementsInto;
    attachTo(element: HTMLElement): void;
    addElement(element: ToolbarElement): void;
    getElementById(elementId: string): ToolbarElement;
    insertElementAfter(element: ToolbarElement, afterElementId: string): void;
    insertElementBefore(element: ToolbarElement, beforeElementId: string): void;
}
