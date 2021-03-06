import * as GenietalkCards from "genietalkcards";
import { DraggableElement } from "./draggable-element";
import { PeerCommand } from "./peer-command";
import { CardDesignerSurface, DesignContext } from "./card-designer-surface";
import { DesignerPeerTreeItem } from "./designer-peer-treeitem";
import { Rect, IPoint } from "./miscellaneous";
export declare abstract class DesignerPeerInplaceEditor {
    onClose: (applyChanges: boolean) => void;
    abstract initialize(): any;
    abstract applyChanges(): any;
    abstract render(): HTMLElement;
}
export declare abstract class CardElementPeerInplaceEditor<TCardElement extends GenietalkCards.CardElement> extends DesignerPeerInplaceEditor {
    readonly cardElement: TCardElement;
    constructor(cardElement: TCardElement);
}
export declare class DesignerPeerRegistrationBase {
    readonly category: string;
    readonly iconClass: string;
    constructor(category: string, iconClass?: string);
}
export declare class DesignerPeerRegistration<TSource, TPeer> extends DesignerPeerRegistrationBase {
    readonly sourceType: TSource;
    peerType: TPeer;
    constructor(sourceType: TSource, peerType: TPeer, category: string, iconClass?: string);
}
export declare class PropertySheetCategory {
    readonly name: string;
    static readonly DefaultCategory = "__defaultCategory";
    static readonly LayoutCategory = "Layout";
    static readonly StyleCategory = "Style";
    static readonly SelectionAction = "Selection action";
    static readonly InlineAction = "Inline action";
    private _entries;
    constructor(name: string);
    render(container: GenietalkCards.Container, context: PropertySheetContext, displayCategoryName: boolean): void;
    add(...entries: PropertySheetEntry[]): void;
    remove(...entries: PropertySheetEntry[]): void;
    getEntryAt(index: number): PropertySheetEntry;
    get length(): number;
}
export declare class PropertySheet {
    readonly displayCategoryNames: boolean;
    private _categories;
    constructor(displayCategoryNames?: boolean);
    add(categoryName: string, ...entries: PropertySheetEntry[]): void;
    remove(...entries: PropertySheetEntry[]): void;
    render(container: GenietalkCards.Container, context: PropertySheetContext): void;
}
export declare class PropertySheetContext {
    readonly designContext: DesignContext;
    readonly peer: DesignerPeer;
    private _target;
    constructor(designContext: DesignContext, peer: DesignerPeer, target?: object);
    get target(): object;
}
export declare abstract class PropertySheetEntry {
    readonly targetVersion: GenietalkCards.TargetVersion;
    abstract render(context: PropertySheetContext): GenietalkCards.CardElement;
    constructor(targetVersion: GenietalkCards.TargetVersion);
}
export declare class SubPropertySheetEntry {
    readonly targetVersion: GenietalkCards.TargetVersion;
    readonly target: object;
    readonly propertySheet: PropertySheet;
    render(context: PropertySheetContext): GenietalkCards.CardElement;
    constructor(targetVersion: GenietalkCards.TargetVersion, target: object, propertySheet: PropertySheet);
}
export declare class CustomPropertySheetEntry extends PropertySheetEntry {
    readonly targetVersion: GenietalkCards.TargetVersion;
    readonly onRender: (context: PropertySheetContext) => GenietalkCards.CardElement;
    render(context: PropertySheetContext): GenietalkCards.CardElement;
    constructor(targetVersion: GenietalkCards.TargetVersion, onRender: (context: PropertySheetContext) => GenietalkCards.CardElement);
}
export interface IPropertySheetEditorCommand {
    caption: string;
    onExecute: (sender: SingleInputPropertyEditor, clickedElement: HTMLElement) => void;
}
export declare abstract class SingleInputPropertyEditor extends PropertySheetEntry {
    readonly targetVersion: GenietalkCards.TargetVersion;
    readonly propertyName: string;
    readonly label: string;
    readonly causesPropertySheetRefresh: boolean;
    protected abstract createInput(context: PropertySheetContext): GenietalkCards.Input;
    protected getPropertyValue(context: PropertySheetContext): any;
    protected setPropertyValue(context: PropertySheetContext, value: string): void;
    protected getAdditionalCommands(context: PropertySheetContext): IPropertySheetEditorCommand[];
    render(context: PropertySheetContext): GenietalkCards.CardElement;
    constructor(targetVersion: GenietalkCards.TargetVersion, propertyName: string, label: string, causesPropertySheetRefresh?: boolean);
}
export declare class StringPropertyEditor extends SingleInputPropertyEditor {
    readonly targetVersion: GenietalkCards.TargetVersion;
    readonly propertyName: string;
    readonly label: string;
    readonly allowBinding: boolean;
    readonly isMultiline: boolean;
    readonly causesPropertySheetRefresh: boolean;
    protected createInput(context: PropertySheetContext): GenietalkCards.Input;
    protected getAdditionalCommands(context: PropertySheetContext): IPropertySheetEditorCommand[];
    constructor(targetVersion: GenietalkCards.TargetVersion, propertyName: string, label: string, allowBinding?: boolean, isMultiline?: boolean, causesPropertySheetRefresh?: boolean);
}
export declare class NumberPropertyEditor extends SingleInputPropertyEditor {
    readonly targetVersion: GenietalkCards.TargetVersion;
    readonly propertyName: string;
    readonly label: string;
    readonly defaultValue: number | undefined;
    readonly causesPropertySheetRefresh: boolean;
    protected setPropertyValue(context: PropertySheetContext, value: string): void;
    protected createInput(context: PropertySheetContext): GenietalkCards.Input;
    constructor(targetVersion: GenietalkCards.TargetVersion, propertyName: string, label: string, defaultValue?: number | undefined, causesPropertySheetRefresh?: boolean);
}
export declare class ObjectPropertyEditor extends StringPropertyEditor {
    protected getPropertyValue(context: PropertySheetContext): any;
    protected setPropertyValue(context: PropertySheetContext, value: string): void;
}
export declare class CustomCardObjectPropertyEditor extends StringPropertyEditor {
    protected getPropertyValue(context: PropertySheetContext): any;
    protected setPropertyValue(context: PropertySheetContext, value: string): void;
}
export declare class BooleanPropertyEditor extends SingleInputPropertyEditor {
    protected getPropertyValue(context: PropertySheetContext): any;
    protected setPropertyValue(context: PropertySheetContext, value: string): void;
    protected createInput(context: PropertySheetContext): GenietalkCards.Input;
}
export interface IVersionedChoice {
    targetVersion: GenietalkCards.TargetVersion;
    name: string;
    value: string;
}
export declare class ChoicePropertyEditor extends SingleInputPropertyEditor {
    readonly targetVersion: GenietalkCards.TargetVersion;
    readonly propertyName: string;
    readonly label: string;
    readonly choices: IVersionedChoice[];
    readonly causesPropertySheetRefresh: boolean;
    protected createInput(context: PropertySheetContext): GenietalkCards.Input;
    constructor(targetVersion: GenietalkCards.TargetVersion, propertyName: string, label: string, choices: IVersionedChoice[], causesPropertySheetRefresh?: boolean);
}
export declare class ContainerStylePropertyEditor extends ChoicePropertyEditor {
    readonly targetVersion: GenietalkCards.TargetVersion;
    readonly propertyName: string;
    readonly label: string;
    protected getPropertyValue(context: PropertySheetContext): any;
    protected setPropertyValue(context: PropertySheetContext, value: string): void;
    constructor(targetVersion: GenietalkCards.TargetVersion, propertyName: string, label: string);
}
export declare class ColumnWidthPropertyEditor extends ChoicePropertyEditor {
    protected getPropertyValue(context: PropertySheetContext): any;
    protected setPropertyValue(context: PropertySheetContext, value: string): void;
}
export declare class HeightPropertyEditor extends ChoicePropertyEditor {
    protected setPropertyValue(context: PropertySheetContext, value: string): void;
}
export declare class SizeAndUnitPropertyEditor extends NumberPropertyEditor {
    readonly targetVersion: GenietalkCards.TargetVersion;
    readonly propertyName: string;
    readonly label: string;
    readonly sizeUnit: GenietalkCards.SizeUnit;
    readonly defaultValue: number | undefined;
    readonly causesPropertySheetRefresh: boolean;
    protected getPropertyValue(context: PropertySheetContext): any;
    protected setPropertyValue(context: PropertySheetContext, value: string): void;
    constructor(targetVersion: GenietalkCards.TargetVersion, propertyName: string, label: string, sizeUnit: GenietalkCards.SizeUnit, defaultValue?: number | undefined, causesPropertySheetRefresh?: boolean);
}
export declare class ActionPropertyEditor extends SingleInputPropertyEditor {
    readonly targetVersion: GenietalkCards.TargetVersion;
    readonly propertyName: string;
    readonly label: string;
    readonly forbiddenActionTypes: string[];
    readonly causesPropertySheetRefresh: boolean;
    protected getPropertyValue(context: PropertySheetContext): any;
    protected setPropertyValue(context: PropertySheetContext, value: string): void;
    protected createInput(context: PropertySheetContext): GenietalkCards.Input;
    constructor(targetVersion: GenietalkCards.TargetVersion, propertyName: string, label: string, forbiddenActionTypes?: string[], causesPropertySheetRefresh?: boolean);
}
export declare class CompoundPropertyEditor extends PropertySheetEntry {
    readonly targetVersion: GenietalkCards.TargetVersion;
    readonly propertyName: string;
    readonly entries: PropertySheetEntry[];
    render(context: PropertySheetContext): GenietalkCards.CardElement;
    constructor(targetVersion: GenietalkCards.TargetVersion, propertyName: string, entries?: PropertySheetEntry[]);
}
export declare class EnumPropertyEditor extends SingleInputPropertyEditor {
    readonly targetVersion: GenietalkCards.TargetVersion;
    readonly propertyName: string;
    readonly label: string;
    readonly enumType: {
        [s: number]: string;
    };
    readonly causesPropertySheetRefresh: boolean;
    protected setPropertyValue(context: PropertySheetContext, value: string): void;
    protected createInput(context: PropertySheetContext): GenietalkCards.Input;
    constructor(targetVersion: GenietalkCards.TargetVersion, propertyName: string, label: string, enumType: {
        [s: number]: string;
    }, causesPropertySheetRefresh?: boolean);
}
declare class NameValuePairPropertyEditor extends PropertySheetEntry {
    readonly targetVersion: GenietalkCards.TargetVersion;
    readonly collectionPropertyName: string;
    readonly namePropertyName: string;
    readonly valuePropertyName: string;
    readonly createCollectionItem: (name: string, value: string) => any;
    readonly namePropertyLabel: string;
    readonly valuePropertyLabel: string;
    readonly addButtonTitle: string;
    readonly messageIfEmpty: string;
    private collectionChanged;
    render(context: PropertySheetContext): GenietalkCards.CardElement;
    constructor(targetVersion: GenietalkCards.TargetVersion, collectionPropertyName: string, namePropertyName: string, valuePropertyName: string, createCollectionItem: (name: string, value: string) => any, namePropertyLabel?: string, valuePropertyLabel?: string, addButtonTitle?: string, messageIfEmpty?: string);
}
export declare abstract class DesignerPeer extends DraggableElement {
    static readonly idProperty: StringPropertyEditor;
    private _parent;
    private _cardObject;
    private _children;
    private _isSelected;
    private _inplaceEditorOverlay;
    private _inplaceEditor;
    private closeInplaceEditor;
    private tryOpenInplaceEditor;
    protected click(e: MouseEvent): void;
    protected doubleClick(e: MouseEvent): void;
    protected isContainer(): boolean;
    protected getToolTip(): string;
    protected internalAddCommands(context: DesignContext, commands: Array<PeerCommand>): void;
    protected internalRender(): HTMLElement;
    protected internalUpdateCssStyles(): void;
    protected peerAdded(newPeer: DesignerPeer): void;
    protected peerRemoved(peer: DesignerPeer): void;
    protected internalUpdateLayout(): void;
    protected createInplaceEditor(): DesignerPeerInplaceEditor;
    protected internalGetTreeItemText(): string;
    protected abstract internalRemove(): boolean;
    readonly registration: DesignerPeerRegistrationBase;
    readonly designerSurface: CardDesignerSurface;
    readonly treeItem: DesignerPeerTreeItem;
    onParentChanged: (sender: DesignerPeer) => void;
    onSelectedChanged: (sender: DesignerPeer) => void;
    onChanged: (sender: DesignerPeer, updatePropertySheet: boolean) => void;
    onPeerRemoved: (sender: DesignerPeer) => void;
    onPeerAdded: (sender: DesignerPeer, newPeer: DesignerPeer) => void;
    getCardObject(): GenietalkCards.CardObject;
    constructor(parent: DesignerPeer, designerSurface: CardDesignerSurface, registration: DesignerPeerRegistrationBase, cardObject: GenietalkCards.CardObject);
    abstract getBoundingRect(): Rect;
    abstract getCardObjectBoundingRect(): Rect;
    changed(updatePropertySheet: boolean): void;
    getTreeItemText(): string;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    canDrop(peer: DesignerPeer): boolean;
    canBeRemoved(): boolean;
    tryDrop(peer: DesignerPeer, insertionPoint: IPoint): boolean;
    insertChild(peer: DesignerPeer, index?: number): void;
    removeChild(peer: DesignerPeer): void;
    getChildCount(): number;
    getChildAt(index: number): DesignerPeer;
    getCommands(context: DesignContext, promoteParentCommands?: boolean): Array<PeerCommand>;
    remove(onlyFromCard: boolean, removeChildren: boolean): boolean;
    addElementsToDesignerSurface(designerSurface: HTMLElement, processChildren?: boolean): void;
    removeElementsFromDesignerSurface(processChildren?: boolean): void;
    buildPropertySheetCard(context: DesignContext): GenietalkCards.GenietalkCard;
    scrollIntoView(): void;
    get parent(): DesignerPeer;
    set parent(value: DesignerPeer);
    get isSelected(): boolean;
    set isSelected(value: boolean);
}
export declare class ActionPeer extends DesignerPeer {
    static readonly titleProperty: StringPropertyEditor;
    static readonly styleProperty: ChoicePropertyEditor;
    static readonly iconUrlProperty: StringPropertyEditor;
    protected doubleClick(e: MouseEvent): void;
    protected internalRemove(): boolean;
    constructor(parent: DesignerPeer, designerSurface: CardDesignerSurface, registration: DesignerPeerRegistrationBase, action: GenietalkCards.Action);
    protected internalGetTreeItemText(): string;
    isDraggable(): boolean;
    getBoundingRect(): Rect;
    getCardObjectBoundingRect(): Rect;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    get action(): GenietalkCards.Action;
}
export declare abstract class TypedActionPeer<TAction extends GenietalkCards.Action> extends ActionPeer {
    constructor(parent: DesignerPeer, designerSurface: CardDesignerSurface, registration: DesignerPeerRegistrationBase, action: TAction);
    get action(): TAction;
}
export declare class HttpActionPeer extends TypedActionPeer<GenietalkCards.HttpAction> {
    static readonly ignoreInputValidationProperty: BooleanPropertyEditor;
    static readonly methodProperty: ChoicePropertyEditor;
    static readonly urlProperty: StringPropertyEditor;
    static readonly bodyProperty: StringPropertyEditor;
    static readonly headersProperty: NameValuePairPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class SubmitActionPeer extends TypedActionPeer<GenietalkCards.SubmitAction> {
    static readonly ignoreInputValidationProperty: BooleanPropertyEditor;
    static readonly dataProperty: ObjectPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class OpenUrlActionPeer extends TypedActionPeer<GenietalkCards.OpenUrlAction> {
    static readonly urlProperty: StringPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class ShowCardActionPeer extends TypedActionPeer<GenietalkCards.ShowCardAction> {
    protected getToolTip(): string;
}
export declare class ToggleVisibilityActionPeer extends TypedActionPeer<GenietalkCards.ToggleVisibilityAction> {
}
export declare class CardElementPeer extends DesignerPeer {
    static readonly dataContextProperty: CustomCardObjectPropertyEditor;
    static readonly whenProperty: CustomCardObjectPropertyEditor;
    static readonly idProperty: StringPropertyEditor;
    static readonly isVisibleProperty: BooleanPropertyEditor;
    static readonly spacingProperty: EnumPropertyEditor;
    static readonly separatorProperty: BooleanPropertyEditor;
    static readonly horizontalAlignmentProperty: EnumPropertyEditor;
    static readonly heightProperty: HeightPropertyEditor;
    protected insertElementAfter(newElement: GenietalkCards.CardElement): void;
    protected internalRemove(): boolean;
    protected internalUpdateCssStyles(): void;
    constructor(parent: DesignerPeer, designerSurface: CardDesignerSurface, registration: DesignerPeerRegistrationBase, cardElement: GenietalkCards.CardElement);
    getTreeItemText(): string;
    initializeCardElement(): void;
    canDrop(peer: DesignerPeer): boolean;
    tryDrop(peer: DesignerPeer, insertionPoint: IPoint): boolean;
    getBoundingRect(): Rect;
    getCardObjectBoundingRect(): Rect;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    get cardElement(): GenietalkCards.CardElement;
}
export declare abstract class TypedCardElementPeer<TCardElement extends GenietalkCards.CardElement> extends CardElementPeer {
    constructor(parent: DesignerPeer, designerSurface: CardDesignerSurface, registration: DesignerPeerRegistrationBase, cardElement: TCardElement);
    get cardElement(): TCardElement;
}
export declare class AdaptiveCardPeer extends TypedCardElementPeer<GenietalkCards.GenietalkCard> {
    static readonly langProperty: StringPropertyEditor;
    static readonly fallbackTextProperty: StringPropertyEditor;
    static readonly speakProperty: StringPropertyEditor;
    protected addAction(action: GenietalkCards.Action): void;
    protected internalRemove(): boolean;
    protected internalAddCommands(context: DesignContext, commands: Array<PeerCommand>): void;
    isDraggable(): boolean;
    canBeRemoved(): boolean;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class ColumnPeer extends TypedCardElementPeer<GenietalkCards.Column> {
    private static readonly pixelWidthProperty;
    private static readonly weightProperty;
    static readonly widthProperty: ColumnWidthPropertyEditor;
    protected isContainer(): boolean;
    protected internalGetTreeItemText(): string;
    isDraggable(): boolean;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class ColumnSetPeer extends TypedCardElementPeer<GenietalkCards.ColumnSet> {
    protected isContainer(): boolean;
    protected internalAddCommands(context: DesignContext, commands: Array<PeerCommand>): void;
    protected internalGetTreeItemText(): string;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    canDrop(peer: DesignerPeer): boolean;
}
export declare class ContainerPeer extends TypedCardElementPeer<GenietalkCards.Container> {
    static readonly selectActionProperty: ActionPropertyEditor;
    static readonly minHeightProperty: NumberPropertyEditor;
    static readonly verticalContentAlignmentProperty: EnumPropertyEditor;
    static readonly styleProperty: ContainerStylePropertyEditor;
    static readonly bleedProperty: BooleanPropertyEditor;
    static readonly backgroundImageProperty: CompoundPropertyEditor;
    protected isContainer(): boolean;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class ActionSetPeer extends TypedCardElementPeer<GenietalkCards.GenietalkCard> {
    protected addAction(action: GenietalkCards.Action): void;
    protected internalAddCommands(context: DesignContext, commands: Array<PeerCommand>): void;
}
export declare class ImageSetPeer extends TypedCardElementPeer<GenietalkCards.ImageSet> {
    static readonly ImageSizeProperty: EnumPropertyEditor;
    protected internalAddCommands(context: DesignContext, commands: Array<PeerCommand>): void;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class ImagePeer extends TypedCardElementPeer<GenietalkCards.Image> {
    static readonly urlProperty: StringPropertyEditor;
    static readonly altTextProperty: StringPropertyEditor;
    static readonly sizeProperty: EnumPropertyEditor;
    static readonly pixelWidthProperty: NumberPropertyEditor;
    static readonly pixelHeightProperty: NumberPropertyEditor;
    static readonly styleProperty: EnumPropertyEditor;
    static readonly backgroundColorProperty: StringPropertyEditor;
    private get isParentImageSet();
    protected internalAddCommands(context: DesignContext, commands: Array<PeerCommand>): void;
    isDraggable(): boolean;
    getBoundingRect(): Rect;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class MediaPeer extends TypedCardElementPeer<GenietalkCards.Media> {
    static readonly altTextProperty: StringPropertyEditor;
    static readonly posterUrlProperty: StringPropertyEditor;
    static readonly sourcesProperty: NameValuePairPropertyEditor;
    protected internalGetTreeItemText(): string;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class FactSetPeer extends TypedCardElementPeer<GenietalkCards.FactSet> {
    static readonly factsProperty: NameValuePairPropertyEditor;
    protected internalGetTreeItemText(): string;
    initializeCardElement(): void;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare abstract class InputPeer<TInput extends GenietalkCards.Input> extends TypedCardElementPeer<TInput> {
    static readonly validationProperty: CompoundPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class TextInputPeer extends InputPeer<GenietalkCards.TextInput> {
    static readonly defaultValueProperty: StringPropertyEditor;
    static readonly placeholderProperty: StringPropertyEditor;
    static readonly isMultilineProperty: BooleanPropertyEditor;
    static readonly styleProperty: EnumPropertyEditor;
    static readonly maxLengthProperty: NumberPropertyEditor;
    static readonly inlineActionProperty: ActionPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    initializeCardElement(): void;
}
export declare class NumberInputPeer extends InputPeer<GenietalkCards.NumberInput> {
    static readonly defaultValueProperty: NumberPropertyEditor;
    static readonly placeholderProperty: StringPropertyEditor;
    static readonly minProperty: NumberPropertyEditor;
    static readonly maxProperty: NumberPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    initializeCardElement(): void;
}
export declare class DateInputPeer extends InputPeer<GenietalkCards.DateInput> {
    static readonly defaultValueProperty: StringPropertyEditor;
    static readonly minProperty: StringPropertyEditor;
    static readonly maxProperty: StringPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class TimeInputPeer extends InputPeer<GenietalkCards.TimeInput> {
    static readonly defaultValueProperty: StringPropertyEditor;
    static readonly minProperty: StringPropertyEditor;
    static readonly maxProperty: StringPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class ToggleInputPeer extends InputPeer<GenietalkCards.ToggleInput> {
    static readonly defaultValueProperty: StringPropertyEditor;
    static readonly titleProperty: StringPropertyEditor;
    static readonly valueOnProperty: StringPropertyEditor;
    static readonly valueOffProperty: StringPropertyEditor;
    static readonly wrapProperty: BooleanPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    initializeCardElement(): void;
}
export declare class ChoiceSetInputPeer extends InputPeer<GenietalkCards.ChoiceSetInput> {
    static readonly defaultValueProperty: StringPropertyEditor;
    static readonly placeholderProperty: StringPropertyEditor;
    static readonly isMultiselectProperty: BooleanPropertyEditor;
    static readonly isCompactProperty: BooleanPropertyEditor;
    static readonly wrapProperty: BooleanPropertyEditor;
    static readonly choicesProperty: NameValuePairPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    initializeCardElement(): void;
}
export declare class TextBlockPeer extends TypedCardElementPeer<GenietalkCards.TextBlock> {
    static readonly textProperty: StringPropertyEditor;
    static readonly wrapProperty: BooleanPropertyEditor;
    static readonly maxLinesProperty: NumberPropertyEditor;
    static readonly fontTypeProperty: EnumPropertyEditor;
    static readonly sizeProperty: EnumPropertyEditor;
    static readonly weightProperty: EnumPropertyEditor;
    static readonly colorProperty: EnumPropertyEditor;
    static readonly subtleProperty: BooleanPropertyEditor;
    protected createInplaceEditor(): DesignerPeerInplaceEditor;
    protected internalGetTreeItemText(): string;
    protected internalAddCommands(context: DesignContext, commands: Array<PeerCommand>): void;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    getToolTip(): string;
    initializeCardElement(): void;
}
export declare class RichTextBlockPeer extends TypedCardElementPeer<GenietalkCards.RichTextBlock> {
    protected internalGetTreeItemText(): string;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    initializeCardElement(): void;
}
export {};
