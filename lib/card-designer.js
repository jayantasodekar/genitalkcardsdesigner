"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardDesigner = void 0;
var Adaptive = require("adaptivecards");
var Constants = require("./constants");
var Designer = require("./card-designer-surface");
var open_sample_dialog_1 = require("./open-sample-dialog");
var adaptive_card_schema_1 = require("./adaptive-card-schema");
var fullscreen_handler_1 = require("./fullscreen-handler");
var toolbar_1 = require("./toolbar");
var miscellaneous_1 = require("./miscellaneous");
var tool_palette_1 = require("./tool-palette");
var default_container_1 = require("./containers/default/default-container");
var side_panel_1 = require("./side-panel");
var tool_box_1 = require("./tool-box");
var data_1 = require("./data");
var data_treeitem_1 = require("./data-treeitem");
var strings_1 = require("./strings");
var Shared = require("./shared");
var tree_view_1 = require("./tree-view");
var catalogue_1 = require("./catalogue");
var CardDesigner = /** @class */ (function (_super) {
    __extends(CardDesigner, _super);
    function CardDesigner(hostContainers) {
        if (hostContainers === void 0) { hostContainers = null; }
        var _this = _super.call(this) || this;
        _this._isAttached = false;
        _this._isMonacoEditorLoaded = false;
        _this._undoStack = [];
        _this._undoStackIndex = -1;
        _this._bindingPreviewMode = Designer.BindingPreviewMode.NoPreview;
        _this._sampleCatalogue = new catalogue_1.SampleCatalogue();
        _this._preventCardUpdate = false;
        _this._cardEditorUpdateCounter = 0;
        _this.preventJsonUpdate = false;
        _this._isEdgeHTML = undefined;
        _this._targetVersion = Adaptive.Versions.latest;
        _this._fullScreenHandler = new fullscreen_handler_1.FullScreenHandler();
        _this._preventRecursiveSetTargetVersion = false;
        _this.toolbar = new toolbar_1.Toolbar();
        _this.lockDataStructure = false;
        Adaptive.GlobalSettings.enableFullJsonRoundTrip = true;
        Adaptive.GlobalSettings.allowPreProcessingPropertyValues = true;
        Adaptive.AdaptiveCard.onProcessMarkdown = function (text, result) {
            CardDesigner.internalProcessMarkdown(text, result);
        };
        _this._hostContainers = hostContainers ? hostContainers : [];
        _this.prepareToolbar();
        return _this;
    }
    CardDesigner.internalProcessMarkdown = function (text, result) {
        if (CardDesigner.onProcessMarkdown) {
            CardDesigner.onProcessMarkdown(text, result);
        }
        else {
            // Check for markdownit
            if (window["markdownit"]) {
                result.outputHtml = window["markdownit"]().render(text);
                result.didProcess = true;
            }
        }
    };
    CardDesigner.prototype.togglePreview = function () {
        this._designerSurface.isPreviewMode = !this._designerSurface.isPreviewMode;
        if (this._designerSurface.isPreviewMode) {
            this._togglePreviewButton.toolTip = "Return to Design mode";
            this._designerSurface.setCardPayloadAsString(this.getCurrentCardEditorPayload());
        }
        else {
            this._togglePreviewButton.toolTip = "Switch to Preview mode";
            this.updateCardFromJson(false);
        }
        this.buildTreeView();
    };
    CardDesigner.prototype.buildTreeView = function () {
        if (this._treeViewToolbox.content) {
            this._treeViewToolbox.content.innerHTML = "";
            if (this.designerSurface.isPreviewMode) {
                this.treeViewToolbox.content.innerHTML =
                    '<div style="padding: 8px; display: flex; justify-content: center;">' +
                        '<div>The Card Structure isn\'t available in Preview mode.</div>' +
                        '</div>';
            }
            else {
                var treeView = new tree_view_1.TreeView(this.designerSurface.rootPeer.treeItem);
                this._treeViewToolbox.content.appendChild(treeView.render());
            }
        }
    };
    CardDesigner.prototype.buildDataExplorer = function () {
        if (this._dataToolbox && this._dataToolbox.content) {
            this._dataToolbox.content.innerHTML = "";
            if (this.dataStructure) {
                var treeItem = new data_treeitem_1.DataTreeItem(this.dataStructure);
                var treeView = new tree_view_1.TreeView(treeItem);
                this._dataToolbox.content.appendChild(treeView.render());
            }
        }
    };
    CardDesigner.prototype.buildPropertySheet = function (peer) {
        if (this._propertySheetToolbox.content) {
            this._propertySheetToolbox.content.innerHTML = "";
            var card = void 0;
            if (peer) {
                card = peer.buildPropertySheetCard(this);
            }
            else {
                card = new Adaptive.AdaptiveCard();
                card.parse({
                    type: "AdaptiveCard",
                    version: "1.0",
                    body: [
                        {
                            type: "TextBlock",
                            wrap: true,
                            text: "**Nothing is selected**"
                        },
                        {
                            type: "TextBlock",
                            wrap: true,
                            text: "Select an element in the card to modify its properties."
                        }
                    ]
                }, new Adaptive.SerializationContext(this.targetVersion));
                card.padding = new Adaptive.PaddingDefinition(Adaptive.Spacing.Small, Adaptive.Spacing.Small, Adaptive.Spacing.Small, Adaptive.Spacing.Small);
            }
            card.hostConfig = miscellaneous_1.defaultHostConfig;
            this._propertySheetToolbox.content.appendChild(card.render());
        }
    };
    CardDesigner.prototype.addPaletteItem = function (paletteItem, hostElement) {
        var _this = this;
        paletteItem.render();
        paletteItem.onStartDrag = function (sender) {
            _this._draggedPaletteItem = sender;
            _this._draggedElement = sender.renderDragVisual();
            _this._draggedElement.style.position = "absolute";
            _this._draggedElement.style.left = _this._currentMousePosition.x + "px";
            _this._draggedElement.style.top = _this._currentMousePosition.y + "px";
            document.body.appendChild(_this._draggedElement);
        };
        hostElement.appendChild(paletteItem.renderedElement);
    };
    CardDesigner.prototype.buildPalette = function () {
        if (!this._isAttached) {
            return;
        }
        this._toolPaletteToolbox.content.innerHTML = "";
        var categorizedTypes = {};
        for (var i_1 = 0; i_1 < this.hostContainer.elementsRegistry.getItemCount(); i_1++) {
            var registration = this.hostContainer.elementsRegistry.getItemAt(i_1);
            if (registration.schemaVersion.compareTo(this.targetVersion) <= 0) {
                var peerRegistration = Designer.CardDesignerSurface.cardElementPeerRegistry.findTypeRegistration(registration.objectType);
                if (peerRegistration) {
                    if (!categorizedTypes.hasOwnProperty(peerRegistration.category)) {
                        categorizedTypes[peerRegistration.category] = [];
                    }
                    var paletteItem = new tool_palette_1.ElementPaletteItem(registration, peerRegistration);
                    categorizedTypes[peerRegistration.category].push(paletteItem);
                }
            }
        }
        if (this.customPaletteItems) {
            for (var _i = 0, _a = this.customPaletteItems; _i < _a.length; _i++) {
                var item = _a[_i];
                if (!categorizedTypes.hasOwnProperty(item.category)) {
                    categorizedTypes[item.category] = [];
                }
                categorizedTypes[item.category].push(item);
            }
        }
        for (var category in categorizedTypes) {
            var node = document.createElement('div');
            node.innerText = category;
            node.className = "acd-palette-category";
            this._toolPaletteToolbox.content.appendChild(node);
            for (var i = 0; i < categorizedTypes[category].length; i++) {
                this.addPaletteItem(categorizedTypes[category][i], this._toolPaletteToolbox.content);
            }
        }
    };
    CardDesigner.prototype.endDrag = function () {
        if (this._draggedPaletteItem) {
            this._draggedPaletteItem.endDrag();
            this._draggedElement.remove();
            this._draggedPaletteItem = null;
            this._draggedElement = null;
        }
    };
    CardDesigner.prototype.renderErrorPaneElement = function (message, source) {
        var _this = this;
        var errorElement = document.createElement("div");
        errorElement.className = "acd-error-pane-message";
        if (source && source instanceof Adaptive.CardObject) {
            errorElement.classList.add("selectable");
            errorElement.title = "Click to select this element";
            errorElement.onclick = function (e) {
                var peer = _this.designerSurface.findPeer(source);
                if (peer) {
                    peer.isSelected = true;
                    peer.scrollIntoView();
                }
            };
        }
        errorElement.innerText = message;
        return errorElement;
    };
    CardDesigner.prototype.recreateDesignerSurface = function () {
        var _this = this;
        var styleSheetLinkElement = document.getElementById("adaptiveCardStylesheet");
        if (styleSheetLinkElement == null) {
            styleSheetLinkElement = document.createElement("link");
            styleSheetLinkElement.id = "adaptiveCardStylesheet";
            document.getElementsByTagName("head")[0].appendChild(styleSheetLinkElement);
        }
        styleSheetLinkElement.rel = "stylesheet";
        styleSheetLinkElement.type = "text/css";
        if (miscellaneous_1.Utils.isAbsoluteUrl(this.hostContainer.styleSheet)) {
            styleSheetLinkElement.href = this.hostContainer.styleSheet;
        }
        else {
            styleSheetLinkElement.href = miscellaneous_1.Utils.joinPaths(this._assetPath, this.hostContainer.styleSheet);
        }
        var _cardArea = document.getElementById("cardArea");
        if (_cardArea) {
            _cardArea.style.backgroundColor = this.hostContainer.getBackgroundColor();
        }
        this.hostContainer.initialize();
        this._designerHostElement.innerHTML = "";
        this.hostContainer.renderTo(this._designerHostElement);
        var wasInPreviewMode = this._designerSurface ? this._designerSurface.isPreviewMode : false;
        this._designerSurface = new Designer.CardDesignerSurface(this);
        this._designerSurface.fixedHeightCard = this.hostContainer.isFixedHeight;
        this._designerSurface.onSelectedPeerChanged = function (peer) {
            //this.buildPropertySheet(peer);
        };
        this._designerSurface.onLayoutUpdated = function (isFullRefresh) {
            if (isFullRefresh) {
                _this.scheduleUpdateJsonFromCard();
                _this.buildTreeView();
            }
        };
        this._designerSurface.onCardValidated = function (logEntries) {
            if (_this.onCardValidated) {
                _this.onCardValidated(_this, logEntries);
            }
            var errorPane = document.getElementById("errorPane");
            errorPane.innerHTML = "";
            if (_this.targetVersion.compareTo(_this.hostContainer.targetVersion) > 0 && Shared.GlobalSettings.showTargetVersionMismatchWarning) {
                errorPane.appendChild(_this.renderErrorPaneElement("[Warning] The selected Target Version (" + _this.targetVersion.toString() + ") is greater than the version supported by " + _this.hostContainer.name + " (" + _this.hostContainer.targetVersion.toString() + ")"));
            }
            if (logEntries.length > 0) {
                var dedupedEntries = [];
                for (var _i = 0, logEntries_1 = logEntries; _i < logEntries_1.length; _i++) {
                    var entry = logEntries_1[_i];
                    if (dedupedEntries.indexOf(entry) < 0) {
                        dedupedEntries.push(entry);
                    }
                }
                for (var _a = 0, dedupedEntries_1 = dedupedEntries; _a < dedupedEntries_1.length; _a++) {
                    var entry = dedupedEntries_1[_a];
                    var s = "";
                    switch (entry.phase) {
                        case Adaptive.ValidationPhase.Parse:
                            s = "[Parse]";
                            break;
                        case Adaptive.ValidationPhase.ToJSON:
                            s = "[Serialize]";
                            break;
                        default:
                            s = "[Validation]";
                            break;
                    }
                    errorPane.appendChild(_this.renderErrorPaneElement(s + " " + entry.message, entry.source));
                }
            }
            if (errorPane.childElementCount > 0) {
                errorPane.classList.remove("acd-hidden");
            }
            else {
                errorPane.classList.add("acd-hidden");
            }
        };
        this._designerSurface.onStartDrag = function (sender) {
            _this._startDragPayload = JSON.parse(_this.getCurrentCardEditorPayload());
        };
        this._designerSurface.onEndDrag = function (sender, wasCancelled) {
            if (wasCancelled) {
                _this.setCardPayload(_this._startDragPayload, false);
            }
            else {
                _this.addToUndoStack(_this._designerSurface.getCardPayloadAsObject());
            }
        };
        this.buildPalette();
        // this.buildPropertySheet(null);
        this.updateCardFromJson(false);
        this.updateSampleData();
        this._designerSurface.isPreviewMode = wasInPreviewMode;
        this.updateFullLayout();
    };
    CardDesigner.prototype.activeHostContainerChanged = function () {
        this.recreateDesignerSurface();
        if (this.onActiveHostContainerChanged) {
            this.onActiveHostContainerChanged(this);
        }
    };
    CardDesigner.prototype.targetVersionChanged = function () {
        var cardPayload = this.designerSurface.getCardPayloadAsObject();
        if (typeof cardPayload === "object") {
            cardPayload["version"] = this.targetVersion.toString();
            this.setCardPayload(cardPayload, false);
        }
        this.recreateDesignerSurface();
        if (this.onTargetVersionChanged) {
            this.onTargetVersionChanged(this);
        }
    };
    CardDesigner.prototype.updateToolboxLayout = function (toolbox, hostPanelRect) {
        if (toolbox) {
            var jsonEditorHeaderRect = toolbox.getHeaderBoundingRect();
            toolbox.content.style.height = (hostPanelRect.height - jsonEditorHeaderRect.height) + "px";
        }
    };
    CardDesigner.prototype.updateJsonEditorsLayout = function () {
        if (this._isMonacoEditorLoaded) {
            var jsonEditorsPaneRect = this._jsonEditorsPanel.contentHost.getBoundingClientRect();
            this.updateToolboxLayout(this._cardEditorToolbox, jsonEditorsPaneRect);
            this._cardEditor.layout();
            if (this._sampleDataEditorToolbox) {
                this.updateToolboxLayout(this._sampleDataEditorToolbox, jsonEditorsPaneRect);
                this._sampleDataEditor.layout();
            }
        }
    };
    CardDesigner.prototype.updateFullLayout = function () {
        this.scheduleLayoutUpdate();
        this.updateJsonEditorsLayout();
    };
    CardDesigner.prototype.cardPayloadChanged = function () {
        if (this.onCardPayloadChanged) {
            this.onCardPayloadChanged(this);
        }
    };
    CardDesigner.prototype.beginCardEditorUpdate = function () {
        this._cardEditorUpdateCounter++;
    };
    CardDesigner.prototype.endCardEditorUpdate = function () {
        if (this._cardEditorUpdateCounter > 0) {
            this._cardEditorUpdateCounter--;
        }
    };
    CardDesigner.prototype.setCardPayload = function (payload, addToUndoStack) {
        if (this._isMonacoEditorLoaded) {
            this.beginCardEditorUpdate();
            try {
                if (payload.hasOwnProperty("version")) {
                    payload["version"] = this.targetVersion.toString();
                }
                this._cardEditor.setValue(JSON.stringify(payload, null, 4));
                this.updateCardFromJson(addToUndoStack);
            }
            finally {
                this.endCardEditorUpdate();
            }
        }
        this.cardPayloadChanged();
    };
    CardDesigner.prototype.setSampleDataPayload = function (payload) {
        if (this._isMonacoEditorLoaded && this._sampleDataEditor) {
            this._sampleDataEditor.setValue(JSON.stringify(payload, null, 4));
        }
    };
    CardDesigner.prototype.updateJsonFromCard = function (addToUndoStack) {
        if (addToUndoStack === void 0) { addToUndoStack = true; }
        try {
            this._preventCardUpdate = true;
            if (!this.preventJsonUpdate && this._isMonacoEditorLoaded) {
                var cardPayload = this._designerSurface.getCardPayloadAsObject();
                this.setCardPayload(cardPayload, addToUndoStack);
            }
        }
        finally {
            this._preventCardUpdate = false;
        }
    };
    CardDesigner.prototype.scheduleUpdateJsonFromCard = function () {
        var _this = this;
        clearTimeout(this._jsonUpdateTimer);
        if (!this.preventJsonUpdate) {
            this._jsonUpdateTimer = setTimeout(function () { _this.updateJsonFromCard(); }, 100);
        }
    };
    CardDesigner.prototype.getCurrentCardEditorPayload = function () {
        return this._isMonacoEditorLoaded ? this._cardEditor.getValue() : Constants.defaultPayload;
    };
    CardDesigner.prototype.getCurrentSampleDataEditorPayload = function () {
        return this._isMonacoEditorLoaded && this._sampleDataEditor ? this._sampleDataEditor.getValue() : "";
    };
    CardDesigner.prototype.updateCardFromJson = function (addToUndoStack) {
        try {
            this.preventJsonUpdate = true;
            var currentEditorPayload = this.getCurrentCardEditorPayload();
            if (addToUndoStack) {
                try {
                    this.addToUndoStack(JSON.parse(currentEditorPayload));
                }
                catch (_a) {
                    // Swallow the parse error
                }
            }
            if (!this._preventCardUpdate) {
                this.designerSurface.setCardPayloadAsString(currentEditorPayload);
                this.cardPayloadChanged();
            }
        }
        finally {
            this.preventJsonUpdate = false;
        }
    };
    CardDesigner.prototype.scheduleUpdateCardFromJson = function () {
        var _this = this;
        clearTimeout(this._cardUpdateTimer);
        if (!this._preventCardUpdate) {
            this._cardUpdateTimer = setTimeout(function () { _this.updateCardFromJson(true); }, 300);
        }
    };
    CardDesigner.prototype.isEdgeHTML = function () {
        if (this._isEdgeHTML === undefined) {
            this._isEdgeHTML = window.navigator.userAgent.toLowerCase().indexOf("edge") > -1;
        }
        return this._isEdgeHTML;
    };
    CardDesigner.prototype.scheduleLayoutUpdate = function () {
        var _this = this;
        if (this.designerSurface) {
            if (!this.isEdgeHTML()) {
                this.designerSurface.updateLayout(false);
            }
            else {
                // In "old" Edge, updateLayout() is *super* slow (because it uses getBoundingClientRect
                // heavily which is itself super slow) and we have to call it only on idle
                clearTimeout(this._updateLayoutTimer);
                this._updateLayoutTimer = setTimeout(function () {
                    if (_this.designerSurface) {
                        _this.designerSurface.updateLayout(false);
                    }
                }, 5);
            }
        }
    };
    CardDesigner.prototype.prepareToolbar = function () {
        // if (Shared.GlobalSettings.showVersionPicker) {
        //     this._versionChoicePicker = new ToolbarChoicePicker(CardDesigner.ToolbarCommands.VersionPicker);
        //     this._versionChoicePicker.label = "Target version:"
        //     this._versionChoicePicker.width = 80;
        //     this._versionChoicePicker.alignment = ToolbarElementAlignment.Right;
        //     this._versionChoicePicker.separator = true;
        var _this = this;
        //     for (let i = 0; i < Shared.SupportedTargetVersions.length; i++) {
        //         this._versionChoicePicker.choices.push(
        //             {
        //                 name: Shared.SupportedTargetVersions[i].label,
        //                 value: i.toString()
        //             });
        //     }
        //     this.toolbar.addElement(this._versionChoicePicker);
        // }
        this._newCardButton = new toolbar_1.ToolbarButton(CardDesigner.ToolbarCommands.NewCard, "New card", "acd-icon-newCard", function (sender) {
            var dialog = new open_sample_dialog_1.OpenSampleDialog(_this._sampleCatalogue);
            dialog.title = "Pick a sample as a starting point";
            dialog.closeButton.caption = "Cancel";
            dialog.width = "80%";
            dialog.height = "80%";
            dialog.onClose = function (d) {
                if (dialog.selectedSample) {
                    dialog.selectedSample.onDownloaded = function () {
                        try {
                            var cardPayload = JSON.parse(dialog.selectedSample.cardPayload);
                            _this.setCardPayload(cardPayload, true);
                        }
                        catch (_a) {
                            alert("The sample could not be loaded.");
                        }
                        if (dialog.selectedSample.sampleData) {
                            try {
                                var sampleDataPayload = JSON.parse(dialog.selectedSample.sampleData);
                                _this.setSampleDataPayload(sampleDataPayload);
                                _this.dataStructure = data_1.FieldDefinition.deriveFrom(sampleDataPayload);
                            }
                            catch (_b) {
                                alert("The sample could not be loaded.");
                            }
                        }
                    };
                    dialog.selectedSample.download();
                }
            };
            dialog.open();
        });
        this._newCardButton.separator = true;
        this.toolbar.addElement(this._newCardButton);
        // if (this._hostContainers && this._hostContainers.length > 0) {
        //     this._hostContainerChoicePicker = new ToolbarChoicePicker(CardDesigner.ToolbarCommands.HostAppPicker);
        //     this._hostContainerChoicePicker.separator = true;
        //     this._hostContainerChoicePicker.label = "Select host app:"
        //     this._hostContainerChoicePicker.width = 350;
        //     for (let i = 0; i < this._hostContainers.length; i++) {
        //         this._hostContainerChoicePicker.choices.push(
        //             {
        //                 name: this._hostContainers[i].name,
        //                 value: i.toString(),
        //             }
        //         );
        //     }
        //     this._hostContainerChoicePicker.onChanged = (sender) => {
        //         this.hostContainer = this._hostContainers[Number.parseInt(this._hostContainerChoicePicker.value)];
        //         this.activeHostContainerChanged();
        //     };
        //     this.toolbar.addElement(this._hostContainerChoicePicker);
        // }
        // this._undoButton = new ToolbarButton(
        //     CardDesigner.ToolbarCommands.Undo,
        //     "Undo",
        //     "acd-icon-undo",
        //     (sender: ToolbarButton) => { this.undo(); });
        // this._undoButton.separator = true;
        // this._undoButton.toolTip = "Undo your last change";
        // this._undoButton.isEnabled = false;
        // this._undoButton.displayCaption = false;
        // this.toolbar.addElement(this._undoButton);
        // this._redoButton = new ToolbarButton(
        //     CardDesigner.ToolbarCommands.Redo,
        //     "Redo",
        //     "acd-icon-redo",
        //     (sender: ToolbarButton) => { this.redo(); });
        // this._redoButton.toolTip = "Redo your last changes";
        // this._redoButton.isEnabled = false;
        // this._redoButton.displayCaption = false;
        // this.toolbar.addElement(this._redoButton);
        // this._copyJSONButton = new ToolbarButton(
        //     CardDesigner.ToolbarCommands.CopyJSON,
        //     "",
        // 	"acd-icon-copy");
        // 	console.log(this._copyJSONButton);
        // this.toolbar.addElement(this._copyJSONButton);
        this._togglePreviewButton = new toolbar_1.ToolbarButton(CardDesigner.ToolbarCommands.TogglePreview, "Preview mode", "acd-icon-preview", function (sender) { _this.togglePreview(); });
        this._togglePreviewButton.separator = true;
        this._togglePreviewButton.allowToggle = true;
        this._togglePreviewButton.isVisible = Shared.GlobalSettings.enableDataBindingSupport;
        this.toolbar.addElement(this._togglePreviewButton);
        this._fullScreenHandler = new fullscreen_handler_1.FullScreenHandler();
        this._fullScreenHandler.onFullScreenChanged = function (isFullScreen) {
            _this._fullScreenButton.toolTip = isFullScreen ? "Exit full screen" : "Enter full screen";
            _this.updateFullLayout();
        };
    };
    CardDesigner.prototype.onResize = function () {
        this._cardEditor.layout();
        if (this._sampleDataEditor) {
            this._sampleDataEditor.layout();
        }
    };
    CardDesigner.prototype.updateSampleData = function () {
        try {
            this._sampleData = JSON.parse(this.getCurrentSampleDataEditorPayload());
            this.scheduleUpdateCardFromJson();
        }
        catch (_a) {
            // Swallow expression, the payload isn't a valid JSON document
        }
    };
    CardDesigner.prototype.updateToolbar = function () {
        // this._undoButton.isEnabled = this.canUndo;
        // this._redoButton.isEnabled = this.canRedo;
    };
    CardDesigner.prototype.addToUndoStack = function (payload) {
        var doAdd = !this._designerSurface.draggedPeer;
        if (doAdd) {
            if (this._undoStack.length > 0) {
                doAdd = this._undoStack[this._undoStack.length - 1] != payload;
            }
            if (doAdd) {
                var undoPayloadsToDiscard = this._undoStack.length - (this._undoStackIndex + 1);
                if (undoPayloadsToDiscard > 0) {
                    this._undoStack.splice(this._undoStackIndex + 1, undoPayloadsToDiscard);
                }
                this._undoStack.push(payload);
                if (this._undoStack.length > CardDesigner.MAX_UNDO_STACK_SIZE) {
                    this._undoStack.splice(0, 1);
                }
                this._undoStackIndex = this._undoStack.length - 1;
                this.updateToolbar();
            }
        }
    };
    CardDesigner.prototype.handlePointerUp = function (e) {
        this.endDrag();
        if (this.designerSurface) {
            this.designerSurface.endDrag(false);
        }
    };
    CardDesigner.prototype.handlePointerMove = function (e) {
        this._currentMousePosition = { x: e.x, y: e.y };
        if (this.designerSurface) {
            var isPointerOverDesigner = this.designerSurface.isPointerOver(this._currentMousePosition.x, this._currentMousePosition.y);
            var peerDropped = false;
            if (this._draggedPaletteItem && isPointerOverDesigner) {
                var peer = this._draggedPaletteItem.createPeer(this, this.designerSurface);
                var clientCoordinates = this.designerSurface.pageToClientCoordinates(this._currentMousePosition.x, this._currentMousePosition.y);
                if (this.designerSurface.tryDrop(clientCoordinates, peer)) {
                    this.endDrag();
                    this.designerSurface.startDrag(peer);
                    peerDropped = true;
                }
            }
            if (!peerDropped && this._draggedElement) {
                this._draggedElement.style.left = this._currentMousePosition.x - 10 + "px";
                this._draggedElement.style.top = this._currentMousePosition.y - 10 + "px";
            }
        }
    };
    CardDesigner.prototype.monacoModuleLoaded = function (monaco) {
        var _this = this;
        if (monaco === void 0) { monaco = null; }
        if (!monaco) {
            monaco = window["monaco"];
        }
        var monacoConfiguration = {
            schemas: [
                {
                    uri: "http://adaptivecards.io/schemas/adaptive-card.json",
                    schema: adaptive_card_schema_1.adaptiveCardSchema,
                    fileMatch: ["*"],
                }
            ],
            validate: false,
            allowComments: true
        };
        // TODO: set this in our editor instead of defaults
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions(monacoConfiguration);
        // Setup card JSON editor
        this._cardEditorToolbox.content = document.createElement("div");
        this._cardEditorToolbox.content.style.overflow = "hidden";
        this._cardEditor = monaco.editor.create(this._cardEditorToolbox.content, {
            folding: true,
            fontSize: 13.5,
            language: 'json',
            minimap: {
                enabled: false
            }
        });
        this._cardEditor.onDidChangeModelContent(function () {
            if (_this._cardEditorUpdateCounter == 0) {
                _this.scheduleUpdateCardFromJson();
            }
        });
        if (this._sampleDataEditorToolbox) {
            // Setup sample data JSON editor
            this._sampleDataEditorToolbox.content = document.createElement("div");
            this._sampleDataEditorToolbox.content.style.overflow = "hidden";
            this._sampleDataEditor = monaco.editor.create(this._sampleDataEditorToolbox.content, {
                folding: true,
                fontSize: 13.5,
                language: 'json',
                minimap: {
                    enabled: false
                }
            });
            this._sampleDataEditor.onDidChangeModelContent(function () {
                _this.updateSampleData();
                if (!_this.lockDataStructure) {
                    try {
                        _this.dataStructure = data_1.FieldDefinition.deriveFrom(JSON.parse(_this.getCurrentSampleDataEditorPayload()));
                    }
                    catch (_a) {
                        // Swallow exception
                    }
                }
            });
        }
        window.addEventListener('resize', function () { _this.onResize(); });
        this._isMonacoEditorLoaded = true;
        this.updateJsonEditorsLayout();
        this.updateJsonFromCard(true);
    };
    CardDesigner.prototype.attachTo = function (root) {
        var _this = this;
        var styleSheetLinkElement = document.createElement("link");
        styleSheetLinkElement.id = "__ac-designer";
        styleSheetLinkElement.rel = "stylesheet";
        styleSheetLinkElement.type = "text/css";
        styleSheetLinkElement.href = miscellaneous_1.Utils.joinPaths(this._assetPath, "adaptivecards-designer.css");
        document.getElementsByTagName("head")[0].appendChild(styleSheetLinkElement);
        if (this._hostContainers && this._hostContainers.length > 0) {
            this._hostContainer = this._hostContainers[0];
        }
        else {
            this._hostContainer = new default_container_1.DefaultContainer("Default", "adaptivecards-defaulthost.css");
        }
        root.classList.add("acd-designer-root");
        root.style.flex = "1 1 auto";
        root.style.display = "flex";
        root.style.flexDirection = "column";
        root.style.overflow = "hidden";
        root.innerHTML =
            '<div id="toolbarHost" style="display:none"></div>' +
                '<div id="errorPane" style="flex: none;" class="acd-error-pane acd-hidden"></div>' +
                '<div class="content" style="display: flex; flex: 1 1 auto; overflow-y: hidden;">' +
                '<div id="leftCollapsedPaneTabHost" class="acd-verticalCollapsedTabContainer acd-dockedLeft" style="border-right: 1px solid #D2D2D2;display:none"></div>' +
                '<div id="toolPalettePanel" class="acd-toolPalette-pane"></div>' +
                '<div style="display: flex;overflow: hidden; width:100%;">' +
                '<div style="display: flex; overflow: hidden;">' +
                '<div id="cardArea" class="acd-designer-cardArea">' +
                '<div style="flex: 1 1 100%; overflow: auto;">' +
                '<div id="designerHost"></div>' +
                '</div>' +
                '</div>' +
                '<div id="treeViewPanel" class="acd-treeView-pane" style="display:none"></div>' +
                '<div id="propertySheetPanel" class="acd-propertySheet-pane" style="display:none"></div>' +
                '</div>' +
                '<div id="jsonEditorPanel" class="acd-json-editor-pane"></div>' +
                '<div id="bottomCollapsedPaneTabHost" class="acd-horizontalCollapsedTabContainer" style="border-top: 1px solid #D2D2D2;"></div>' +
                '</div>' +
                '<div id="rightCollapsedPaneTabHost" class="acd-verticalCollapsedTabContainer acd-dockedRight" style="border-left: 1px solid #D2D2D2;"></div>' +
                '</div>';
        this.toolbar.attachTo(document.getElementById("toolbarHost"));
        if (this._versionChoicePicker) {
            this._versionChoicePicker.selectedIndex = Shared.SupportedTargetVersions.indexOf(this.targetVersion);
            this._versionChoicePicker.onChanged = function (sender) {
                _this.targetVersion = Shared.SupportedTargetVersions[parseInt(_this._versionChoicePicker.value)];
            };
        }
        // if (this._copyJSONButton.isVisible) {
        //     new Clipboard(
        //         this._copyJSONButton.renderedElement,
        //         {
        //             text: (trigger) => {
        //                 return JSON.stringify(this.getCard(), null, 4);
        //             }
        //         });
        // }
        // Tool palette panel
        var toolPaletteHost = document.createElement("div");
        toolPaletteHost.className = "acd-dockedPane";
        this._toolPaletteToolbox = new tool_box_1.Toolbox("toolPalette", strings_1.Strings.toolboxes.toolPalette.title);
        this._toolPaletteToolbox.content = toolPaletteHost;
        // let toolPalettePanel = new SidePanel(
        //     "toolPalettePanel",
        //     SidePanelAlignment.Left,
        //     document.getElementById("leftCollapsedPaneTabHost"));
        // toolPalettePanel.addToolbox(this._toolPaletteToolbox);
        // toolPalettePanel.isResizable = false;
        // toolPalettePanel.attachTo(document.getElementById("toolPalettePanel"));
        // JSON editors panel
        this._cardEditorToolbox = new tool_box_1.Toolbox("cardEditor", strings_1.Strings.toolboxes.cardEditor.title);
        this._cardEditorToolbox.content = document.createElement("div");
        this._cardEditorToolbox.content.style.padding = "8px";
        this._cardEditorToolbox.content.innerText = strings_1.Strings.loadingEditor;
        this._jsonEditorsPanel = new side_panel_1.SidePanel("jsonEditorPanel", side_panel_1.SidePanelAlignment.Bottom, document.getElementById("bottomCollapsedPaneTabHost"));
        this._jsonEditorsPanel.onResized = function (sender) {
            _this.updateJsonEditorsLayout();
        };
        this._jsonEditorsPanel.onToolboxResized = function (sender) {
            _this.updateJsonEditorsLayout();
        };
        this._jsonEditorsPanel.onToolboxExpandedOrCollapsed = function (sender) {
            _this.updateJsonEditorsLayout();
        };
        this._jsonEditorsPanel.addToolbox(this._cardEditorToolbox);
        if (Shared.GlobalSettings.enableDataBindingSupport && Shared.GlobalSettings.showSampleDataEditorToolbox) {
            this._sampleDataEditorToolbox = new tool_box_1.Toolbox("sampleDataEditor", strings_1.Strings.toolboxes.sampleDataEditor.title);
            this._sampleDataEditorToolbox.content = document.createElement("div");
            this._sampleDataEditorToolbox.content.style.padding = "8px";
            this._sampleDataEditorToolbox.content.innerText = strings_1.Strings.loadingEditor;
            this._jsonEditorsPanel.addToolbox(this._sampleDataEditorToolbox);
        }
        this._jsonEditorsPanel.attachTo(document.getElementById("jsonEditorPanel"));
        // Property sheet panel
        // let propertySheetHost = document.createElement("div");
        // propertySheetHost.className = "acd-propertySheet-host";
        // this._propertySheetToolbox = new Toolbox("propertySheet", Strings.toolboxes.propertySheet.title);
        // this._propertySheetToolbox.content = propertySheetHost;
        // let propertySheetPanel = new SidePanel(
        //     "propertySheetPanel",
        //     SidePanelAlignment.Right,
        //     document.getElementById("rightCollapsedPaneTabHost"));
        // propertySheetPanel.addToolbox(this._propertySheetToolbox);
        // propertySheetPanel.onResized = (sender: SidePanel) => {
        //     this.scheduleLayoutUpdate();
        // }
        // propertySheetPanel.attachTo(document.getElementById("propertySheetPanel"));
        // Tree view panel
        var treeViewHost = document.createElement("div");
        treeViewHost.className = "acd-treeView-host";
        this._treeViewToolbox = new tool_box_1.Toolbox("treeView", strings_1.Strings.toolboxes.cardStructure.title);
        this._treeViewToolbox.content = treeViewHost;
        // let treeViewPanel = new SidePanel(
        //     "treeViewPanel",
        //     SidePanelAlignment.Right,
        //     document.getElementById("rightCollapsedPaneTabHost"));
        // treeViewPanel.addToolbox(this._treeViewToolbox);
        // treeViewPanel.onResized = (sender: SidePanel) => {
        //     this.scheduleLayoutUpdate();
        // }
        // if (Shared.GlobalSettings.enableDataBindingSupport && Shared.GlobalSettings.showDataStructureToolbox) {
        //     let dataExplorerHost = document.createElement("div");
        //     dataExplorerHost.className = "acd-treeView-host";
        //     this._dataToolbox = new Toolbox("data", Strings.toolboxes.dataStructure.title);
        //     this._dataToolbox.content = dataExplorerHost;
        //     treeViewPanel.addToolbox(this._dataToolbox);
        // }
        // treeViewPanel.attachTo(document.getElementById("treeViewPanel"));
        this._designerHostElement = document.getElementById("designerHost");
        window.addEventListener("pointermove", function (e) { _this.handlePointerMove(e); });
        window.addEventListener("resize", function () { _this.scheduleLayoutUpdate(); });
        window.addEventListener("pointerup", function (e) { _this.handlePointerUp(e); });
        this._isAttached = true;
        this.recreateDesignerSurface();
    };
    CardDesigner.prototype.clearUndoStack = function () {
        this._undoStack = [];
        this._undoStackIndex = -1;
        this.updateToolbar();
    };
    CardDesigner.prototype.setCard = function (payload) {
        this.clearUndoStack();
        this.setCardPayload(payload, true);
    };
    CardDesigner.prototype.getCard = function () {
        return this._designerSurface ? this._designerSurface.getCardPayloadAsObject() : undefined;
    };
    CardDesigner.prototype.undo = function () {
        if (this.canUndo) {
            this._undoStackIndex--;
            var card = this._undoStack[this._undoStackIndex];
            this.setCardPayload(card, false);
            this.updateToolbar();
        }
    };
    CardDesigner.prototype.redo = function () {
        if (this._undoStackIndex < this._undoStack.length - 1) {
            this._undoStackIndex++;
            var payload = this._undoStack[this._undoStackIndex];
            this.setCardPayload(payload, false);
            this.updateToolbar();
        }
    };
    CardDesigner.prototype.newCard = function () {
        var card = {
            type: "AdaptiveCard",
            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
            version: this.targetVersion.toString(),
            body: []
        };
        this.setCardPayload(card, true);
    };
    Object.defineProperty(CardDesigner.prototype, "targetVersion", {
        get: function () {
            return this._targetVersion;
        },
        set: function (value) {
            if (this._targetVersion.compareTo(value) !== 0 && !this._preventRecursiveSetTargetVersion) {
                this._preventRecursiveSetTargetVersion = true;
                try {
                    this._targetVersion = value;
                    this.targetVersionChanged();
                    if (this._versionChoicePicker) {
                        this._versionChoicePicker.selectedIndex = Shared.SupportedTargetVersions.indexOf(this._targetVersion);
                    }
                }
                finally {
                    this._preventRecursiveSetTargetVersion = false;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "dataStructure", {
        get: function () {
            return this._dataStructure;
        },
        set: function (value) {
            this._dataStructure = value;
            this.buildDataExplorer();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "sampleData", {
        get: function () {
            return this._sampleData;
        },
        set: function (value) {
            this._sampleData = value;
            this.setSampleDataPayload(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "bindingPreviewMode", {
        get: function () {
            return this._bindingPreviewMode;
        },
        set: function (value) {
            this._bindingPreviewMode = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "hostContainer", {
        get: function () {
            return this._hostContainer;
        },
        set: function (value) {
            if (this._hostContainer !== value) {
                this._hostContainer = value;
                this.activeHostContainerChanged();
                if (Shared.GlobalSettings.selectedHostContainerControlsTargetVersion) {
                    this.targetVersion = this._hostContainer.targetVersion;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "canUndo", {
        get: function () {
            return this._undoStackIndex >= 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "canRedo", {
        get: function () {
            return this._undoStackIndex < this._undoStack.length - 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "designerSurface", {
        get: function () {
            return this._designerSurface;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "treeViewToolbox", {
        get: function () {
            return this._treeViewToolbox;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "propertySheetToolbox", {
        get: function () {
            return this._propertySheetToolbox;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "jsonEditorToolbox", {
        get: function () {
            return this._cardEditorToolbox;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "toolPaletteToolbox", {
        get: function () {
            return this._toolPaletteToolbox;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "dataToolbox", {
        get: function () {
            return this._dataToolbox;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "assetPath", {
        get: function () {
            return this._assetPath;
        },
        set: function (value) {
            this._assetPath = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "customPaletteItems", {
        get: function () {
            return this._customPeletteItems;
        },
        set: function (value) {
            this._customPeletteItems = value;
            this.buildPalette();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardDesigner.prototype, "sampleCatalogueUrl", {
        get: function () {
            return this._sampleCatalogue.url;
        },
        set: function (value) {
            this._sampleCatalogue.url = value;
        },
        enumerable: false,
        configurable: true
    });
    CardDesigner.onProcessMarkdown = null;
    CardDesigner.MAX_UNDO_STACK_SIZE = 50;
    return CardDesigner;
}(Designer.DesignContext));
exports.CardDesigner = CardDesigner;
(function (CardDesigner) {
    var ToolbarCommands = /** @class */ (function () {
        function ToolbarCommands() {
        }
        ToolbarCommands.HostAppPicker = "__hostAppPicker";
        ToolbarCommands.VersionPicker = "__versionPicker";
        ToolbarCommands.Undo = "__undoButton";
        ToolbarCommands.Redo = "__redoButton";
        ToolbarCommands.NewCard = "__newCardButton";
        ToolbarCommands.CopyJSON = "__copyJsonButton";
        ToolbarCommands.TogglePreview = "__togglePreviewButton";
        return ToolbarCommands;
    }());
    CardDesigner.ToolbarCommands = ToolbarCommands;
})(CardDesigner = exports.CardDesigner || (exports.CardDesigner = {}));
exports.CardDesigner = CardDesigner;
//# sourceMappingURL=card-designer.js.map