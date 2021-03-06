import * as GenietalkCards from "genietalkcards";
import * as Designer from "./card-designer-surface";
import { HostContainer } from "./containers/host-container";
import { Toolbar } from "./toolbar";
import { CustomPaletteItem } from "./tool-palette";
import { Toolbox } from "./tool-box";
import { FieldDefinition } from "./data";
export declare class CardDesigner extends Designer.DesignContext {
    private static internalProcessMarkdown;
    static onProcessMarkdown: (text: string, result: GenietalkCards.IMarkdownProcessingResult) => void;
    private static MAX_UNDO_STACK_SIZE;
    private _isAttached;
    private _cardEditor;
    private _sampleDataEditor;
    private _hostContainers;
    private _isMonacoEditorLoaded;
    private _designerSurface;
    private _designerHostElement;
    private _draggedPaletteItem;
    private _draggedElement;
    private _currentMousePosition;
    private _hostContainer;
    private _undoStack;
    private _undoStackIndex;
    private _startDragPayload;
    private _toolPaletteToolbox;
    private _propertySheetToolbox;
    private _treeViewToolbox;
    private _jsonEditorsPanel;
    private _cardEditorToolbox;
    private _sampleDataEditorToolbox;
    private _dataToolbox;
    private _assetPath;
    private _dataStructure;
    private _sampleData;
    private _bindingPreviewMode;
    private _customPeletteItems;
    private _sampleCatalogue;
    private togglePreview;
    private buildTreeView;
    private buildDataExplorer;
    private buildPropertySheet;
    private addPaletteItem;
    private buildPalette;
    private endDrag;
    private renderErrorPaneElement;
    private recreateDesignerSurface;
    private activeHostContainerChanged;
    private targetVersionChanged;
    private updateToolboxLayout;
    private updateJsonEditorsLayout;
    private updateFullLayout;
    private _jsonUpdateTimer;
    private _cardUpdateTimer;
    private _updateLayoutTimer;
    private _preventCardUpdate;
    private cardPayloadChanged;
    private _cardEditorUpdateCounter;
    private beginCardEditorUpdate;
    private endCardEditorUpdate;
    private setCardPayload;
    private setSampleDataPayload;
    private updateJsonFromCard;
    private scheduleUpdateJsonFromCard;
    private preventJsonUpdate;
    private getCurrentCardEditorPayload;
    private getCurrentSampleDataEditorPayload;
    private updateCardFromJson;
    private scheduleUpdateCardFromJson;
    private _isEdgeHTML?;
    private isEdgeHTML;
    private scheduleLayoutUpdate;
    private _targetVersion;
    private _fullScreenHandler;
    private _fullScreenButton;
    private _hostContainerChoicePicker;
    private _versionChoicePicker;
    private _undoButton;
    private _redoButton;
    private _newCardButton;
    private _copyJSONButton;
    private _togglePreviewButton;
    private _preventRecursiveSetTargetVersion;
    private prepareToolbar;
    private onResize;
    private updateSampleData;
    private updateToolbar;
    private addToUndoStack;
    private handlePointerUp;
    private handlePointerMove;
    readonly toolbar: Toolbar;
    lockDataStructure: boolean;
    constructor(hostContainers?: Array<HostContainer>);
    monacoModuleLoaded(monaco?: any): void;
    attachTo(root: HTMLElement): void;
    clearUndoStack(): void;
    setCard(payload: object): void;
    getCard(): object;
    undo(): void;
    redo(): void;
    newCard(): void;
    onCardPayloadChanged: (designer: CardDesigner) => void;
    onCardValidated: (designer: CardDesigner, validationLogEntries: GenietalkCards.IValidationEvent[]) => void;
    onActiveHostContainerChanged: (designer: CardDesigner) => void;
    onTargetVersionChanged: (designer: CardDesigner) => void;
    get targetVersion(): GenietalkCards.Version;
    set targetVersion(value: GenietalkCards.Version);
    get dataStructure(): FieldDefinition;
    set dataStructure(value: FieldDefinition);
    get sampleData(): any;
    set sampleData(value: any);
    get bindingPreviewMode(): Designer.BindingPreviewMode;
    set bindingPreviewMode(value: Designer.BindingPreviewMode);
    get hostContainer(): HostContainer;
    set hostContainer(value: HostContainer);
    get canUndo(): boolean;
    get canRedo(): boolean;
    get designerSurface(): Designer.CardDesignerSurface;
    get treeViewToolbox(): Toolbox;
    get propertySheetToolbox(): Toolbox;
    get jsonEditorToolbox(): Toolbox;
    get toolPaletteToolbox(): Toolbox;
    get dataToolbox(): Toolbox;
    get assetPath(): string;
    set assetPath(value: string);
    get customPaletteItems(): CustomPaletteItem[];
    set customPaletteItems(value: CustomPaletteItem[]);
    get sampleCatalogueUrl(): string;
    set sampleCatalogueUrl(value: string);
}
export declare module CardDesigner {
    class ToolbarCommands {
        static readonly HostAppPicker = "__hostAppPicker";
        static readonly VersionPicker = "__versionPicker";
        static readonly Undo = "__undoButton";
        static readonly Redo = "__redoButton";
        static readonly NewCard = "__newCardButton";
        static readonly CopyJSON = "__copyJsonButton";
        static readonly TogglePreview = "__togglePreviewButton";
    }
}
