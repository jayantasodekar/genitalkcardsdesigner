import * as Adaptive from "adaptivecards";
import { DraggableElement } from "./draggable-element";
import { FieldDefinition } from "./data";
import { DesignContext, CardDesignerSurface } from "./card-designer-surface";
import { CardElementPeer, DesignerPeerRegistrationBase } from "./designer-peers";
export declare abstract class BasePaletteItem extends DraggableElement {
    protected abstract getText(): string;
    protected abstract getIconClass(): string;
    protected internalRender(): HTMLElement;
    renderDragVisual(): HTMLElement;
    abstract createPeer(context: DesignContext, designer: CardDesignerSurface): CardElementPeer;
}
export declare class ElementPaletteItem extends BasePaletteItem {
    protected getText(): string;
    protected getIconClass(): string;
    readonly typeRegistration: Adaptive.ITypeRegistration<Adaptive.CardElement>;
    readonly peerRegistration: DesignerPeerRegistrationBase;
    constructor(typeRegistration: Adaptive.ITypeRegistration<Adaptive.CardElement>, peerRegistration: DesignerPeerRegistrationBase);
    createPeer(context: DesignContext, designer: CardDesignerSurface): CardElementPeer;
}
export declare class DataPaletteItem extends BasePaletteItem {
    readonly field: FieldDefinition;
    protected getText(): string;
    protected getIconClass(): string;
    constructor(field: FieldDefinition);
    createPeer(context: DesignContext, designer: CardDesignerSurface): CardElementPeer;
}
export declare abstract class CustomPaletteItem extends BasePaletteItem {
    readonly category: string;
    protected getIconClass(): string;
    constructor(category: string);
}
export declare class SnippetPaletteItem extends CustomPaletteItem {
    protected getText(): string;
    readonly name: string;
    snippet: object;
    constructor(category: string, name: string);
    createPeer(context: DesignContext, designer: CardDesignerSurface): CardElementPeer;
}
