export declare class Splitter {
    private _isVertical;
    private _isAttachedAfter;
    private _sizedELement;
    private _isPointerDown;
    private _lastClickedOffset;
    private resizeEnded;
    private pointerDown;
    private pointerMove;
    private pointerUp;
    onResizeEnded: (sender: Splitter) => void;
    onResized: (sender: Splitter) => void;
    readonly attachedTo: HTMLElement;
    minimum: number;
    constructor(attachedTo: HTMLElement, sizedElement: HTMLElement, isVertical?: boolean, isAttachedAfter?: boolean, minimumSize?: number);
}
