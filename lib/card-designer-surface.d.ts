import * as GenietalkCards from "genietalkcards";
import { IPoint } from "./miscellaneous";
import * as DesignerPeers from "./designer-peers";
import { HostContainer } from "./containers";
import { FieldDefinition } from "./data";
export declare enum BindingPreviewMode {
    NoPreview = 0,
    GeneratedData = 1,
    SampleData = 2
}
export declare type CardElementType = {
    new (): GenietalkCards.CardElement;
};
export declare type ActionType = {
    new (): GenietalkCards.Action;
};
export declare type CardElementPeerType = {
    new (parent: DesignerPeers.DesignerPeer, designerSurface: CardDesignerSurface, registration: DesignerPeers.DesignerPeerRegistrationBase, cardElement: GenietalkCards.CardElement): DesignerPeers.CardElementPeer;
};
export declare type ActionPeerType = {
    new (parent: DesignerPeers.DesignerPeer, designerSurface: CardDesignerSurface, registration: DesignerPeers.DesignerPeerRegistrationBase, action: GenietalkCards.Action): DesignerPeers.ActionPeer;
};
export declare abstract class DesignerPeerRegistry<TSource, TPeer> {
    protected _items: Array<DesignerPeers.DesignerPeerRegistration<TSource, TPeer>>;
    readonly defaultRegistration: DesignerPeers.DesignerPeerRegistrationBase;
    constructor();
    abstract reset(): any;
    clear(): void;
    findTypeRegistration(sourceType: TSource): DesignerPeers.DesignerPeerRegistration<TSource, TPeer>;
    registerPeer(sourceType: TSource, peerType: TPeer, category: string, iconClass?: string): void;
    unregisterPeer(sourceType: TSource): void;
}
export declare class CardElementPeerRegistry extends DesignerPeerRegistry<CardElementType, CardElementPeerType> {
    reset(): void;
    createPeerInstance(designerSurface: CardDesignerSurface, parent: DesignerPeers.DesignerPeer, cardElement: GenietalkCards.CardElement): DesignerPeers.CardElementPeer;
}
export declare class ActionPeerRegistry extends DesignerPeerRegistry<ActionType, ActionPeerType> {
    reset(): void;
    createPeerInstance(designerSurface: CardDesignerSurface, parent: DesignerPeers.DesignerPeer, action: GenietalkCards.Action): DesignerPeers.ActionPeer;
}
export declare abstract class DesignContext {
    abstract get hostContainer(): HostContainer;
    abstract get targetVersion(): GenietalkCards.Version;
    abstract get dataStructure(): FieldDefinition;
    abstract get bindingPreviewMode(): BindingPreviewMode;
    abstract get sampleData(): any;
}
export declare class CardDesignerSurface {
    readonly context: DesignContext;
    static readonly cardElementPeerRegistry: CardElementPeerRegistry;
    static readonly actionPeerRegistry: ActionPeerRegistry;
    private _updateCount;
    private _card;
    private _allPeers;
    private _rootPeer;
    private _cardHost;
    private _designerSurface;
    private _selectedPeer;
    private _draggedPeer;
    private _dropTarget;
    private _dragHandle;
    private _removeCommandElement;
    private _peerCommandsHostElement;
    private _serializationContext;
    private _isPreviewMode;
    private _dragVisual?;
    private updatePeerCommandsLayout;
    private setSelectedPeer;
    private peerChanged;
    private peerRemoved;
    private renderCard;
    private addPeer;
    private internalFindDropTarget;
    private findCardElementPeer;
    private findActionPeer;
    private inlineCardExpanded;
    private get card();
    private setDraggedPeer;
    constructor(context: DesignContext);
    onCardValidated: (logEntries: GenietalkCards.IValidationEvent[]) => void;
    onSelectedPeerChanged: (peer: DesignerPeers.DesignerPeer) => void;
    onLayoutUpdated: (isFullRefresh: boolean) => void;
    fixedHeightCard: boolean;
    getDesignerSurfaceOffset(): IPoint;
    findDropTarget(pointerPosition: IPoint, peer: DesignerPeers.DesignerPeer): DesignerPeers.DesignerPeer;
    findPeer(cardObject: GenietalkCards.CardObject): DesignerPeers.DesignerPeer;
    beginUpdate(): void;
    endUpdate(renderCard: boolean): void;
    render(): void;
    getCardPayloadAsObject(): object;
    setCardPayloadAsObject(payload: object): void;
    setCardPayloadAsString(payload: string): void;
    updateLayout(isFullRefresh?: boolean): void;
    removeSelected(): void;
    onStartDrag: (sender: CardDesignerSurface) => void;
    onEndDrag: (sender: CardDesignerSurface, wasCancelled: boolean) => void;
    startDrag(peer: DesignerPeers.DesignerPeer): void;
    endDrag(wasCancelled: boolean): void;
    tryDrop(pointerPosition: IPoint, peer: DesignerPeers.DesignerPeer): boolean;
    isPointerOver(x: number, y: number): boolean;
    pageToClientCoordinates(x: number, y: number): IPoint;
    get rootPeer(): DesignerPeers.DesignerPeer;
    get selectedPeer(): DesignerPeers.DesignerPeer;
    get draggedPeer(): DesignerPeers.DesignerPeer;
    get isPreviewMode(): boolean;
    set isPreviewMode(value: boolean);
}
