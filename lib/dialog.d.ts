export declare class DialogButton {
    caption: string;
    onClick: (sender: DialogButton) => void;
    constructor(caption: string);
    render(): HTMLElement;
    clicked(): void;
}
export declare abstract class Dialog {
    private _overlayElement;
    private _isOpen;
    protected abstract renderContent(): HTMLElement;
    onClose: (sender: Dialog) => void;
    readonly closeButton: DialogButton;
    title: string;
    width: string;
    height: string;
    constructor();
    open(): void;
    close(): void;
}
