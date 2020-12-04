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
exports.RichTextBlockPeer = exports.TextBlockPeer = exports.ChoiceSetInputPeer = exports.ToggleInputPeer = exports.TimeInputPeer = exports.DateInputPeer = exports.NumberInputPeer = exports.TextInputPeer = exports.InputPeer = exports.FactSetPeer = exports.MediaPeer = exports.ImagePeer = exports.ImageSetPeer = exports.ActionSetPeer = exports.ContainerPeer = exports.ColumnSetPeer = exports.ColumnPeer = exports.AdaptiveCardPeer = exports.TypedCardElementPeer = exports.CardElementPeer = exports.ToggleVisibilityActionPeer = exports.ShowCardActionPeer = exports.OpenUrlActionPeer = exports.SubmitActionPeer = exports.HttpActionPeer = exports.TypedActionPeer = exports.ActionPeer = exports.DesignerPeer = exports.EnumPropertyEditor = exports.CompoundPropertyEditor = exports.ActionPropertyEditor = exports.SizeAndUnitPropertyEditor = exports.HeightPropertyEditor = exports.ColumnWidthPropertyEditor = exports.ContainerStylePropertyEditor = exports.ChoicePropertyEditor = exports.BooleanPropertyEditor = exports.CustomCardObjectPropertyEditor = exports.ObjectPropertyEditor = exports.NumberPropertyEditor = exports.StringPropertyEditor = exports.SingleInputPropertyEditor = exports.CustomPropertySheetEntry = exports.SubPropertySheetEntry = exports.PropertySheetEntry = exports.PropertySheetContext = exports.PropertySheet = exports.PropertySheetCategory = exports.DesignerPeerRegistration = exports.DesignerPeerRegistrationBase = exports.CardElementPeerInplaceEditor = exports.DesignerPeerInplaceEditor = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var Adaptive = require("adaptivecards");
var Controls = require("adaptivecards-controls");
var draggable_element_1 = require("./draggable-element");
var peer_command_1 = require("./peer-command");
var card_designer_surface_1 = require("./card-designer-surface");
var designer_peer_treeitem_1 = require("./designer-peer-treeitem");
var miscellaneous_1 = require("./miscellaneous");
var shared_1 = require("./shared");
var field_picker_1 = require("./field-picker");
var DesignerPeerInplaceEditor = /** @class */ (function () {
    function DesignerPeerInplaceEditor() {
    }
    return DesignerPeerInplaceEditor;
}());
exports.DesignerPeerInplaceEditor = DesignerPeerInplaceEditor;
var CardElementPeerInplaceEditor = /** @class */ (function (_super) {
    __extends(CardElementPeerInplaceEditor, _super);
    function CardElementPeerInplaceEditor(cardElement) {
        var _this = _super.call(this) || this;
        _this.cardElement = cardElement;
        return _this;
    }
    return CardElementPeerInplaceEditor;
}(DesignerPeerInplaceEditor));
exports.CardElementPeerInplaceEditor = CardElementPeerInplaceEditor;
var DesignerPeerRegistrationBase = /** @class */ (function () {
    function DesignerPeerRegistrationBase(category, iconClass) {
        if (iconClass === void 0) { iconClass = null; }
        this.category = category;
        this.iconClass = iconClass;
    }
    return DesignerPeerRegistrationBase;
}());
exports.DesignerPeerRegistrationBase = DesignerPeerRegistrationBase;
var DesignerPeerRegistration = /** @class */ (function (_super) {
    __extends(DesignerPeerRegistration, _super);
    function DesignerPeerRegistration(sourceType, peerType, category, iconClass) {
        if (iconClass === void 0) { iconClass = null; }
        var _this = _super.call(this, category, iconClass) || this;
        _this.sourceType = sourceType;
        _this.peerType = peerType;
        return _this;
    }
    return DesignerPeerRegistration;
}(DesignerPeerRegistrationBase));
exports.DesignerPeerRegistration = DesignerPeerRegistration;
var PropertySheetCategory = /** @class */ (function () {
    function PropertySheetCategory(name) {
        this.name = name;
        this._entries = [];
    }
    PropertySheetCategory.prototype.render = function (container, context, displayCategoryName) {
        var entriesToRender = [];
        for (var _i = 0, _a = this._entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (Adaptive.isVersionLessOrEqual(entry.targetVersion, context.designContext.targetVersion)) {
                entriesToRender.push(entry);
            }
        }
        if (entriesToRender.length > 0) {
            if (displayCategoryName) {
                var header = new Adaptive.TextBlock();
                header.separator = true;
                header.text = "**" + (this.name === PropertySheetCategory.DefaultCategory ? context.peer.getCardObject().getJsonTypeName() : this.name) + "**";
                container.addItem(header);
            }
            for (var _b = 0, entriesToRender_1 = entriesToRender; _b < entriesToRender_1.length; _b++) {
                var entry = entriesToRender_1[_b];
                if (Adaptive.isVersionLessOrEqual(entry.targetVersion, context.designContext.targetVersion)) {
                    container.addItem(entry.render(context));
                }
            }
        }
    };
    PropertySheetCategory.prototype.add = function () {
        var entries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entries[_i] = arguments[_i];
        }
        this._entries = this._entries.concat(entries);
    };
    PropertySheetCategory.prototype.remove = function () {
        var entries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entries[_i] = arguments[_i];
        }
        for (var _a = 0, entries_1 = entries; _a < entries_1.length; _a++) {
            var entry = entries_1[_a];
            var index = void 0;
            do {
                var index_1 = this._entries.indexOf(entry);
                if (index_1 >= 0) {
                    this._entries.splice(index_1, 1);
                }
            } while (index >= 0);
        }
    };
    PropertySheetCategory.prototype.getEntryAt = function (index) {
        return this._entries[index];
    };
    Object.defineProperty(PropertySheetCategory.prototype, "length", {
        get: function () {
            return this._entries.length;
        },
        enumerable: false,
        configurable: true
    });
    PropertySheetCategory.DefaultCategory = "__defaultCategory";
    PropertySheetCategory.LayoutCategory = "Layout";
    PropertySheetCategory.StyleCategory = "Style";
    PropertySheetCategory.SelectionAction = "Selection action";
    PropertySheetCategory.InlineAction = "Inline action";
    return PropertySheetCategory;
}());
exports.PropertySheetCategory = PropertySheetCategory;
var PropertySheet = /** @class */ (function () {
    function PropertySheet(displayCategoryNames) {
        if (displayCategoryNames === void 0) { displayCategoryNames = true; }
        this.displayCategoryNames = displayCategoryNames;
        this._categories = {};
        this._categories[PropertySheetCategory.DefaultCategory] = new PropertySheetCategory(PropertySheetCategory.DefaultCategory);
        this._categories[PropertySheetCategory.LayoutCategory] = new PropertySheetCategory(PropertySheetCategory.LayoutCategory);
        this._categories[PropertySheetCategory.StyleCategory] = new PropertySheetCategory(PropertySheetCategory.StyleCategory);
    }
    PropertySheet.prototype.add = function (categoryName) {
        var entries = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            entries[_i - 1] = arguments[_i];
        }
        var category = this._categories[categoryName];
        if (!category) {
            category = new PropertySheetCategory(categoryName);
            this._categories[categoryName] = category;
        }
        category.add.apply(category, entries);
    };
    PropertySheet.prototype.remove = function () {
        var _a;
        var entries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entries[_i] = arguments[_i];
        }
        for (var _b = 0, _c = Object.keys(this._categories); _b < _c.length; _b++) {
            var categoryName = _c[_b];
            (_a = this._categories[categoryName]).remove.apply(_a, entries);
        }
    };
    PropertySheet.prototype.render = function (container, context) {
        for (var _i = 0, _a = Object.keys(this._categories); _i < _a.length; _i++) {
            var categoryName = _a[_i];
            this._categories[categoryName].render(container, context, this.displayCategoryNames);
        }
    };
    return PropertySheet;
}());
exports.PropertySheet = PropertySheet;
var PropertySheetContext = /** @class */ (function () {
    function PropertySheetContext(designContext, peer, target) {
        if (target === void 0) { target = undefined; }
        this.designContext = designContext;
        this.peer = peer;
        this._target = undefined;
        this._target = target;
    }
    Object.defineProperty(PropertySheetContext.prototype, "target", {
        get: function () {
            return this._target != undefined ? this._target : this.peer.getCardObject();
        },
        enumerable: false,
        configurable: true
    });
    return PropertySheetContext;
}());
exports.PropertySheetContext = PropertySheetContext;
var PropertySheetEntry = /** @class */ (function () {
    function PropertySheetEntry(targetVersion) {
        this.targetVersion = targetVersion;
    }
    return PropertySheetEntry;
}());
exports.PropertySheetEntry = PropertySheetEntry;
var SubPropertySheetEntry = /** @class */ (function () {
    function SubPropertySheetEntry(targetVersion, target, propertySheet) {
        this.targetVersion = targetVersion;
        this.target = target;
        this.propertySheet = propertySheet;
    }
    SubPropertySheetEntry.prototype.render = function (context) {
        var container = new Adaptive.Container();
        container.spacing = Adaptive.Spacing.Small;
        this.propertySheet.render(container, new PropertySheetContext(context.designContext, context.peer, this.target));
        return container;
    };
    return SubPropertySheetEntry;
}());
exports.SubPropertySheetEntry = SubPropertySheetEntry;
var CustomPropertySheetEntry = /** @class */ (function (_super) {
    __extends(CustomPropertySheetEntry, _super);
    function CustomPropertySheetEntry(targetVersion, onRender) {
        var _this = _super.call(this, targetVersion) || this;
        _this.targetVersion = targetVersion;
        _this.onRender = onRender;
        return _this;
    }
    CustomPropertySheetEntry.prototype.render = function (context) {
        if (this.onRender) {
            return this.onRender(context);
        }
    };
    return CustomPropertySheetEntry;
}(PropertySheetEntry));
exports.CustomPropertySheetEntry = CustomPropertySheetEntry;
var SingleInputPropertyEditor = /** @class */ (function (_super) {
    __extends(SingleInputPropertyEditor, _super);
    function SingleInputPropertyEditor(targetVersion, propertyName, label, causesPropertySheetRefresh) {
        if (causesPropertySheetRefresh === void 0) { causesPropertySheetRefresh = false; }
        var _this = _super.call(this, targetVersion) || this;
        _this.targetVersion = targetVersion;
        _this.propertyName = propertyName;
        _this.label = label;
        _this.causesPropertySheetRefresh = causesPropertySheetRefresh;
        return _this;
    }
    SingleInputPropertyEditor.prototype.getPropertyValue = function (context) {
        return context.target[this.propertyName];
    };
    SingleInputPropertyEditor.prototype.setPropertyValue = function (context, value) {
        context.target[this.propertyName] = value;
    };
    SingleInputPropertyEditor.prototype.getAdditionalCommands = function (context) {
        return [];
    };
    SingleInputPropertyEditor.prototype.render = function (context) {
        var _this = this;
        var leftColumn = new Adaptive.Column();
        leftColumn.width = new Adaptive.SizeAndUnit(100, Adaptive.SizeUnit.Pixel);
        leftColumn.verticalContentAlignment = Adaptive.VerticalAlignment.Center;
        var rightColumn = new Adaptive.Column();
        rightColumn.width = "stretch";
        rightColumn.verticalContentAlignment = Adaptive.VerticalAlignment.Center;
        var columnSet = new Adaptive.ColumnSet();
        columnSet.spacing = Adaptive.Spacing.Small;
        columnSet.addColumn(leftColumn);
        columnSet.addColumn(rightColumn);
        var label = new Adaptive.TextBlock();
        label.horizontalAlignment = Adaptive.HorizontalAlignment.Right;
        label.wrap = true;
        label.text = this.label;
        var input = this.createInput(context);
        input.onValueChanged = function () {
            _this.setPropertyValue(context, input.value);
            context.peer.changed(_this.causesPropertySheetRefresh);
        };
        leftColumn.addItem(label);
        rightColumn.addItem(input);
        var additionalCommands = this.getAdditionalCommands(context);
        if (additionalCommands && additionalCommands.length > 0) {
            var commandColumn = new Adaptive.Column();
            commandColumn.width = "auto";
            commandColumn.spacing = Adaptive.Spacing.Small;
            commandColumn.verticalContentAlignment = Adaptive.VerticalAlignment.Center;
            var actionSet = new Adaptive.ActionSet();
            var _loop_1 = function (command) {
                var action = new Adaptive.SubmitAction();
                action.title = command.caption;
                action.onExecute = function (sender) { command.onExecute(_this, sender.renderedElement); };
                actionSet.addAction(action);
            };
            for (var _i = 0, additionalCommands_1 = additionalCommands; _i < additionalCommands_1.length; _i++) {
                var command = additionalCommands_1[_i];
                _loop_1(command);
            }
            commandColumn.addItem(actionSet);
            columnSet.addColumn(commandColumn);
        }
        return columnSet;
    };
    return SingleInputPropertyEditor;
}(PropertySheetEntry));
exports.SingleInputPropertyEditor = SingleInputPropertyEditor;
var StringPropertyEditor = /** @class */ (function (_super) {
    __extends(StringPropertyEditor, _super);
    function StringPropertyEditor(targetVersion, propertyName, label, allowBinding, isMultiline, causesPropertySheetRefresh) {
        if (allowBinding === void 0) { allowBinding = false; }
        if (isMultiline === void 0) { isMultiline = false; }
        if (causesPropertySheetRefresh === void 0) { causesPropertySheetRefresh = false; }
        var _this = _super.call(this, targetVersion, propertyName, label, causesPropertySheetRefresh) || this;
        _this.targetVersion = targetVersion;
        _this.propertyName = propertyName;
        _this.label = label;
        _this.allowBinding = allowBinding;
        _this.isMultiline = isMultiline;
        _this.causesPropertySheetRefresh = causesPropertySheetRefresh;
        return _this;
    }
    StringPropertyEditor.prototype.createInput = function (context) {
        var input = new Adaptive.TextInput();
        input.defaultValue = this.getPropertyValue(context);
        input.placeholder = "(not set)";
        input.isMultiline = this.isMultiline;
        return input;
    };
    StringPropertyEditor.prototype.getAdditionalCommands = function (context) {
        var _this = this;
        if (shared_1.GlobalSettings.enableDataBindingSupport && this.allowBinding) {
            return [
                {
                    caption: "...",
                    onExecute: function (sender, clickedElement) {
                        var fieldPicker = new field_picker_1.FieldPicker(context.designContext.dataStructure);
                        fieldPicker.onClose = function (sender, wasCancelled) {
                            if (!wasCancelled) {
                                _this.setPropertyValue(context, fieldPicker.selectedField.asExpression());
                                context.peer.changed(true);
                            }
                        };
                        fieldPicker.popup(clickedElement);
                    }
                }
            ];
        }
        else {
            return _super.prototype.getAdditionalCommands.call(this, context);
        }
    };
    return StringPropertyEditor;
}(SingleInputPropertyEditor));
exports.StringPropertyEditor = StringPropertyEditor;
var NumberPropertyEditor = /** @class */ (function (_super) {
    __extends(NumberPropertyEditor, _super);
    function NumberPropertyEditor(targetVersion, propertyName, label, defaultValue, causesPropertySheetRefresh) {
        if (defaultValue === void 0) { defaultValue = undefined; }
        if (causesPropertySheetRefresh === void 0) { causesPropertySheetRefresh = false; }
        var _this = _super.call(this, targetVersion, propertyName, label, causesPropertySheetRefresh) || this;
        _this.targetVersion = targetVersion;
        _this.propertyName = propertyName;
        _this.label = label;
        _this.defaultValue = defaultValue;
        _this.causesPropertySheetRefresh = causesPropertySheetRefresh;
        return _this;
    }
    NumberPropertyEditor.prototype.setPropertyValue = function (context, value) {
        try {
            context.target[this.propertyName] = parseFloat(value);
        }
        catch (_a) {
            context.target[this.propertyName] = this.defaultValue;
        }
    };
    NumberPropertyEditor.prototype.createInput = function (context) {
        var input = new Adaptive.NumberInput();
        input.defaultValue = this.getPropertyValue(context);
        input.placeholder = "(not set)";
        return input;
    };
    return NumberPropertyEditor;
}(SingleInputPropertyEditor));
exports.NumberPropertyEditor = NumberPropertyEditor;
var ObjectPropertyEditor = /** @class */ (function (_super) {
    __extends(ObjectPropertyEditor, _super);
    function ObjectPropertyEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectPropertyEditor.prototype.getPropertyValue = function (context) {
        return JSON.stringify(context.target[this.propertyName]);
    };
    ObjectPropertyEditor.prototype.setPropertyValue = function (context, value) {
        context.target[this.propertyName] = JSON.parse(value);
    };
    return ObjectPropertyEditor;
}(StringPropertyEditor));
exports.ObjectPropertyEditor = ObjectPropertyEditor;
var CustomCardObjectPropertyEditor = /** @class */ (function (_super) {
    __extends(CustomCardObjectPropertyEditor, _super);
    function CustomCardObjectPropertyEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomCardObjectPropertyEditor.prototype.getPropertyValue = function (context) {
        return context.peer.getCardObject().getCustomProperty(this.propertyName);
    };
    CustomCardObjectPropertyEditor.prototype.setPropertyValue = function (context, value) {
        context.peer.getCardObject().setCustomProperty(this.propertyName, value);
    };
    return CustomCardObjectPropertyEditor;
}(StringPropertyEditor));
exports.CustomCardObjectPropertyEditor = CustomCardObjectPropertyEditor;
var BooleanPropertyEditor = /** @class */ (function (_super) {
    __extends(BooleanPropertyEditor, _super);
    function BooleanPropertyEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BooleanPropertyEditor.prototype.getPropertyValue = function (context) {
        var v = context.target[this.propertyName];
        return typeof v === "boolean" ? v.toString() : "false";
    };
    BooleanPropertyEditor.prototype.setPropertyValue = function (context, value) {
        context.target[this.propertyName] = value == "true";
    };
    BooleanPropertyEditor.prototype.createInput = function (context) {
        var input = new Adaptive.ToggleInput();
        input.defaultValue = this.getPropertyValue(context);
        return input;
    };
    return BooleanPropertyEditor;
}(SingleInputPropertyEditor));
exports.BooleanPropertyEditor = BooleanPropertyEditor;
var ChoicePropertyEditor = /** @class */ (function (_super) {
    __extends(ChoicePropertyEditor, _super);
    function ChoicePropertyEditor(targetVersion, propertyName, label, choices, causesPropertySheetRefresh) {
        if (causesPropertySheetRefresh === void 0) { causesPropertySheetRefresh = false; }
        var _this = _super.call(this, targetVersion, propertyName, label, causesPropertySheetRefresh) || this;
        _this.targetVersion = targetVersion;
        _this.propertyName = propertyName;
        _this.label = label;
        _this.choices = choices;
        _this.causesPropertySheetRefresh = causesPropertySheetRefresh;
        return _this;
    }
    ChoicePropertyEditor.prototype.createInput = function (context) {
        var input = new Adaptive.ChoiceSetInput();
        input.defaultValue = this.getPropertyValue(context);
        input.isCompact = true;
        input.placeholder = "(not set)";
        for (var _i = 0, _a = this.choices; _i < _a.length; _i++) {
            var choice = _a[_i];
            if (Adaptive.isVersionLessOrEqual(choice.targetVersion, context.designContext.targetVersion)) {
                input.choices.push(new Adaptive.Choice(choice.name, choice.value));
            }
        }
        return input;
    };
    return ChoicePropertyEditor;
}(SingleInputPropertyEditor));
exports.ChoicePropertyEditor = ChoicePropertyEditor;
var ContainerStylePropertyEditor = /** @class */ (function (_super) {
    __extends(ContainerStylePropertyEditor, _super);
    function ContainerStylePropertyEditor(targetVersion, propertyName, label) {
        var _this = _super.call(this, targetVersion, propertyName, label, [
            { targetVersion: Adaptive.Versions.v1_0, name: "(not set)", value: "not_set" },
            { targetVersion: Adaptive.Versions.v1_0, name: "Default", value: "default" },
            { targetVersion: Adaptive.Versions.v1_0, name: "Emphasis", value: "emphasis" },
            { targetVersion: Adaptive.Versions.v1_2, name: "Accent", value: "accent" },
            { targetVersion: Adaptive.Versions.v1_2, name: "Good", value: "good" },
            { targetVersion: Adaptive.Versions.v1_2, name: "Attention", value: "attention" },
            { targetVersion: Adaptive.Versions.v1_2, name: "Warning", value: "warning" }
        ]) || this;
        _this.targetVersion = targetVersion;
        _this.propertyName = propertyName;
        _this.label = label;
        return _this;
    }
    ContainerStylePropertyEditor.prototype.getPropertyValue = function (context) {
        var currentStyle = context.target[this.propertyName];
        return currentStyle ? currentStyle.toString() : "not_set";
    };
    ContainerStylePropertyEditor.prototype.setPropertyValue = function (context, value) {
        if (value == "not_set") {
            context.target[this.propertyName] = null;
        }
        else {
            context.target[this.propertyName] = value;
        }
    };
    return ContainerStylePropertyEditor;
}(ChoicePropertyEditor));
exports.ContainerStylePropertyEditor = ContainerStylePropertyEditor;
var ColumnWidthPropertyEditor = /** @class */ (function (_super) {
    __extends(ColumnWidthPropertyEditor, _super);
    function ColumnWidthPropertyEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnWidthPropertyEditor.prototype.getPropertyValue = function (context) {
        if (context.target[this.propertyName] instanceof Adaptive.SizeAndUnit) {
            if (context.target[this.propertyName].unit == Adaptive.SizeUnit.Pixel) {
                return "pixels";
            }
            else {
                return "weighted";
            }
        }
        else {
            return context.target[this.propertyName].toString();
        }
    };
    ColumnWidthPropertyEditor.prototype.setPropertyValue = function (context, value) {
        switch (value) {
            case "auto":
                context.target[this.propertyName] = "auto";
                break;
            case "pixels":
                context.target[this.propertyName] = new Adaptive.SizeAndUnit(50, Adaptive.SizeUnit.Pixel);
                break;
            case "weighted":
                context.target[this.propertyName] = new Adaptive.SizeAndUnit(50, Adaptive.SizeUnit.Weight);
                break;
            case "stretch":
            default:
                context.target[this.propertyName] = "stretch";
                break;
        }
    };
    return ColumnWidthPropertyEditor;
}(ChoicePropertyEditor));
exports.ColumnWidthPropertyEditor = ColumnWidthPropertyEditor;
var HeightPropertyEditor = /** @class */ (function (_super) {
    __extends(HeightPropertyEditor, _super);
    function HeightPropertyEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeightPropertyEditor.prototype.setPropertyValue = function (context, value) {
        var processedValue;
        switch (value) {
            case "auto":
            case "stretch":
                processedValue = value;
                break;
            default:
                processedValue = "auto";
                break;
        }
        context.target[this.propertyName] = processedValue;
    };
    return HeightPropertyEditor;
}(ChoicePropertyEditor));
exports.HeightPropertyEditor = HeightPropertyEditor;
var SizeAndUnitPropertyEditor = /** @class */ (function (_super) {
    __extends(SizeAndUnitPropertyEditor, _super);
    function SizeAndUnitPropertyEditor(targetVersion, propertyName, label, sizeUnit, defaultValue, causesPropertySheetRefresh) {
        if (defaultValue === void 0) { defaultValue = undefined; }
        if (causesPropertySheetRefresh === void 0) { causesPropertySheetRefresh = false; }
        var _this = _super.call(this, targetVersion, propertyName, label, defaultValue, causesPropertySheetRefresh) || this;
        _this.targetVersion = targetVersion;
        _this.propertyName = propertyName;
        _this.label = label;
        _this.sizeUnit = sizeUnit;
        _this.defaultValue = defaultValue;
        _this.causesPropertySheetRefresh = causesPropertySheetRefresh;
        return _this;
    }
    SizeAndUnitPropertyEditor.prototype.getPropertyValue = function (context) {
        return context.target[this.propertyName].physicalSize.toString();
    };
    SizeAndUnitPropertyEditor.prototype.setPropertyValue = function (context, value) {
        context.target[this.propertyName] = new Adaptive.SizeAndUnit(parseInt(value), this.sizeUnit);
    };
    return SizeAndUnitPropertyEditor;
}(NumberPropertyEditor));
exports.SizeAndUnitPropertyEditor = SizeAndUnitPropertyEditor;
var ActionPropertyEditor = /** @class */ (function (_super) {
    __extends(ActionPropertyEditor, _super);
    function ActionPropertyEditor(targetVersion, propertyName, label, forbiddenActionTypes, causesPropertySheetRefresh) {
        if (forbiddenActionTypes === void 0) { forbiddenActionTypes = []; }
        if (causesPropertySheetRefresh === void 0) { causesPropertySheetRefresh = false; }
        var _this = _super.call(this, targetVersion, propertyName, label, causesPropertySheetRefresh) || this;
        _this.targetVersion = targetVersion;
        _this.propertyName = propertyName;
        _this.label = label;
        _this.forbiddenActionTypes = forbiddenActionTypes;
        _this.causesPropertySheetRefresh = causesPropertySheetRefresh;
        return _this;
    }
    ActionPropertyEditor.prototype.getPropertyValue = function (context) {
        var action = context.target[this.propertyName];
        return action ? action.getJsonTypeName() : "none";
    };
    ActionPropertyEditor.prototype.setPropertyValue = function (context, value) {
        context.target[this.propertyName] = parseInt(value, 10);
        if (value == "none") {
            context.target[this.propertyName] = null;
        }
        else {
            context.target[this.propertyName] = context.designContext.hostContainer.actionsRegistry.createInstance(value, context.designContext.targetVersion);
        }
    };
    ActionPropertyEditor.prototype.createInput = function (context) {
        var input = new Adaptive.ChoiceSetInput();
        input.defaultValue = this.getPropertyValue(context);
        input.isCompact = true;
        input.placeholder = "(not set)";
        input.choices.push(new Adaptive.Choice("(not set)", "none"));
        for (var i = 0; i < context.designContext.hostContainer.actionsRegistry.getItemCount(); i++) {
            var actionType = context.designContext.hostContainer.actionsRegistry.getItemAt(i).typeName;
            var doAddActionType = this.forbiddenActionTypes ? this.forbiddenActionTypes.indexOf(actionType) < 0 : true;
            if (doAddActionType) {
                var choice = new Adaptive.Choice(actionType, actionType);
                input.choices.push(choice);
            }
        }
        return input;
    };
    return ActionPropertyEditor;
}(SingleInputPropertyEditor));
exports.ActionPropertyEditor = ActionPropertyEditor;
var CompoundPropertyEditor = /** @class */ (function (_super) {
    __extends(CompoundPropertyEditor, _super);
    function CompoundPropertyEditor(targetVersion, propertyName, entries) {
        if (entries === void 0) { entries = []; }
        var _this = _super.call(this, targetVersion) || this;
        _this.targetVersion = targetVersion;
        _this.propertyName = propertyName;
        _this.entries = entries;
        return _this;
    }
    CompoundPropertyEditor.prototype.render = function (context) {
        var container = new Adaptive.Container();
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (Adaptive.isVersionLessOrEqual(entry.targetVersion, context.designContext.targetVersion)) {
                container.addItem(entry.render(new PropertySheetContext(context.designContext, context.peer, context.target[this.propertyName])));
            }
        }
        return container;
    };
    return CompoundPropertyEditor;
}(PropertySheetEntry));
exports.CompoundPropertyEditor = CompoundPropertyEditor;
var EnumPropertyEditor = /** @class */ (function (_super) {
    __extends(EnumPropertyEditor, _super);
    function EnumPropertyEditor(targetVersion, propertyName, label, enumType, causesPropertySheetRefresh) {
        if (causesPropertySheetRefresh === void 0) { causesPropertySheetRefresh = false; }
        var _this = _super.call(this, targetVersion, propertyName, label, causesPropertySheetRefresh) || this;
        _this.targetVersion = targetVersion;
        _this.propertyName = propertyName;
        _this.label = label;
        _this.enumType = enumType;
        _this.causesPropertySheetRefresh = causesPropertySheetRefresh;
        return _this;
    }
    EnumPropertyEditor.prototype.setPropertyValue = function (context, value) {
        context.target[this.propertyName] = parseInt(value, 10);
    };
    EnumPropertyEditor.prototype.createInput = function (context) {
        var input = new Adaptive.ChoiceSetInput();
        input.defaultValue = this.getPropertyValue(context);
        input.isCompact = true;
        input.placeholder = "(not set)";
        for (var key in this.enumType) {
            var v = parseInt(key, 10);
            if (!isNaN(v)) {
                input.choices.push(new Adaptive.Choice(this.enumType[key], key));
            }
        }
        return input;
    };
    return EnumPropertyEditor;
}(SingleInputPropertyEditor));
exports.EnumPropertyEditor = EnumPropertyEditor;
var NameValuePairPropertyEditor = /** @class */ (function (_super) {
    __extends(NameValuePairPropertyEditor, _super);
    function NameValuePairPropertyEditor(targetVersion, collectionPropertyName, namePropertyName, valuePropertyName, createCollectionItem, namePropertyLabel, valuePropertyLabel, addButtonTitle, messageIfEmpty) {
        if (namePropertyLabel === void 0) { namePropertyLabel = "Name"; }
        if (valuePropertyLabel === void 0) { valuePropertyLabel = "Value"; }
        if (addButtonTitle === void 0) { addButtonTitle = "Add"; }
        if (messageIfEmpty === void 0) { messageIfEmpty = "This collection is empty"; }
        var _this = _super.call(this, targetVersion) || this;
        _this.targetVersion = targetVersion;
        _this.collectionPropertyName = collectionPropertyName;
        _this.namePropertyName = namePropertyName;
        _this.valuePropertyName = valuePropertyName;
        _this.createCollectionItem = createCollectionItem;
        _this.namePropertyLabel = namePropertyLabel;
        _this.valuePropertyLabel = valuePropertyLabel;
        _this.addButtonTitle = addButtonTitle;
        _this.messageIfEmpty = messageIfEmpty;
        return _this;
    }
    NameValuePairPropertyEditor.prototype.collectionChanged = function (context, nameValuePairs, refreshPropertySheet) {
        context.target[this.collectionPropertyName] = [];
        for (var _i = 0, nameValuePairs_1 = nameValuePairs; _i < nameValuePairs_1.length; _i++) {
            var nameValuePair = nameValuePairs_1[_i];
            var item = this.createCollectionItem(nameValuePair.name, nameValuePair.value);
            context.target[this.collectionPropertyName].push(item);
        }
        context.peer.changed(refreshPropertySheet);
    };
    NameValuePairPropertyEditor.prototype.render = function (context) {
        var _this = this;
        var result = new Adaptive.Container();
        var collection = context.target[this.collectionPropertyName];
        if (!Array.isArray(collection)) {
            throw new Error("The " + this.collectionPropertyName + " property on " + context.peer.getCardObject().getJsonTypeName() + " either doesn't exist or isn't an array.");
        }
        var nameValuePairs = [];
        for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
            var pair = collection_1[_i];
            nameValuePairs.push({
                name: pair[this.namePropertyName],
                value: pair[this.valuePropertyName]
            });
        }
        if (nameValuePairs.length == 0) {
            var messageTextBlock = new Adaptive.TextBlock();
            messageTextBlock.spacing = Adaptive.Spacing.Small;
            messageTextBlock.text = this.messageIfEmpty;
            result.addItem(messageTextBlock);
        }
        else {
            var _loop_2 = function (i) {
                var textInput = new Adaptive.TextInput();
                textInput.placeholder = this_1.namePropertyLabel;
                textInput.defaultValue = nameValuePairs[i].name;
                textInput.onValueChanged = function (sender) {
                    nameValuePairs[i].name = sender.value;
                    _this.collectionChanged(context, nameValuePairs, false);
                };
                var nameColumn = new Adaptive.Column("stretch");
                nameColumn.addItem(textInput);
                textInput = new Adaptive.TextInput();
                textInput.placeholder = this_1.valuePropertyLabel;
                textInput.defaultValue = nameValuePairs[i].value;
                textInput.onValueChanged = function (sender) {
                    nameValuePairs[i].value = sender.value;
                    _this.collectionChanged(context, nameValuePairs, false);
                };
                var valueColumn = new Adaptive.Column("stretch");
                valueColumn.spacing = Adaptive.Spacing.Small;
                valueColumn.addItem(textInput);
                var removeAction = new Adaptive.SubmitAction();
                removeAction.title = "X";
                removeAction.onExecute = function (sender) {
                    nameValuePairs.splice(i, 1);
                    _this.collectionChanged(context, nameValuePairs, true);
                };
                var actionSet_1 = new Adaptive.ActionSet();
                actionSet_1.addAction(removeAction);
                var removeColumn = new Adaptive.Column("auto");
                removeColumn.spacing = Adaptive.Spacing.Small;
                removeColumn.addItem(actionSet_1);
                var columnSet = new Adaptive.ColumnSet();
                columnSet.spacing = Adaptive.Spacing.Small;
                columnSet.addColumn(nameColumn);
                columnSet.addColumn(valueColumn);
                columnSet.addColumn(removeColumn);
                result.addItem(columnSet);
            };
            var this_1 = this;
            for (var i = 0; i < nameValuePairs.length; i++) {
                _loop_2(i);
            }
        }
        var addAction = new Adaptive.SubmitAction();
        addAction.title = this.addButtonTitle;
        addAction.onExecute = function (sender) {
            nameValuePairs.push({ name: "", value: "" });
            _this.collectionChanged(context, nameValuePairs, true);
        };
        var actionSet = new Adaptive.ActionSet();
        actionSet.spacing = Adaptive.Spacing.Small;
        actionSet.addAction(addAction);
        result.addItem(actionSet);
        return result;
    };
    return NameValuePairPropertyEditor;
}(PropertySheetEntry));
var DesignerPeer = /** @class */ (function (_super) {
    __extends(DesignerPeer, _super);
    function DesignerPeer(parent, designerSurface, registration, cardObject) {
        var _this = _super.call(this) || this;
        _this._children = [];
        _this._isSelected = false;
        _this._inplaceEditor = null;
        _this._parent = parent;
        _this.registration = registration;
        _this.designerSurface = designerSurface;
        _this._cardObject = cardObject;
        _this.treeItem = new designer_peer_treeitem_1.DesignerPeerTreeItem(_this);
        return _this;
    }
    DesignerPeer.prototype.closeInplaceEditor = function (applyChanges) {
        if (this._inplaceEditor) {
            if (applyChanges) {
                this._inplaceEditor.applyChanges();
                this.changed(true);
            }
            this._inplaceEditor = null;
            this._inplaceEditorOverlay.remove();
        }
    };
    DesignerPeer.prototype.tryOpenInplaceEditor = function () {
        var _this = this;
        this._inplaceEditor = this.createInplaceEditor();
        if (this._inplaceEditor) {
            this._inplaceEditor.onClose = function (applyChanges) {
                _this.closeInplaceEditor(applyChanges);
            };
            this._inplaceEditorOverlay = document.createElement("div");
            this._inplaceEditorOverlay.tabIndex = 0;
            this._inplaceEditorOverlay.style.zIndex = "600";
            this._inplaceEditorOverlay.style.backgroundColor = "transparent";
            this._inplaceEditorOverlay.style.position = "absolute";
            this._inplaceEditorOverlay.style.left = "0";
            this._inplaceEditorOverlay.style.top = "0";
            this._inplaceEditorOverlay.style.width = document.documentElement.scrollWidth + "px";
            this._inplaceEditorOverlay.style.height = document.documentElement.scrollHeight + "px";
            this._inplaceEditorOverlay.onfocus = function (e) { _this.closeInplaceEditor(true); };
            var cardObjectBoundingRect = this.getCardObjectBoundingRect();
            var peerBoundingRect = this.getBoundingRect();
            var topPadding = peerBoundingRect.height - cardObjectBoundingRect.height;
            var inplaceEditorHost = document.createElement("div");
            inplaceEditorHost.className = "acd-inplace-editor-host";
            inplaceEditorHost.style.left = Math.floor(cardObjectBoundingRect.left + pageXOffset) + "px";
            inplaceEditorHost.style.top = Math.floor(cardObjectBoundingRect.top + pageYOffset - topPadding) + "px";
            inplaceEditorHost.style.width = Math.ceil(peerBoundingRect.width) + "px";
            inplaceEditorHost.style.height = Math.ceil(peerBoundingRect.height) + "px";
            inplaceEditorHost.style.paddingTop = topPadding + "px";
            var renderedInplaceEditor = this._inplaceEditor.render();
            renderedInplaceEditor.classList.add("acd-inplace-editor");
            renderedInplaceEditor.tabIndex = 0;
            renderedInplaceEditor.onblur = function (e) { _this.closeInplaceEditor(true); };
            inplaceEditorHost.appendChild(renderedInplaceEditor);
            this._inplaceEditorOverlay.appendChild(inplaceEditorHost);
            document.body.appendChild(this._inplaceEditorOverlay);
            this._inplaceEditor.initialize();
            return true;
        }
        return false;
    };
    DesignerPeer.prototype.click = function (e) {
        _super.prototype.click.call(this, e);
        this.isSelected = true;
    };
    DesignerPeer.prototype.doubleClick = function (e) {
        _super.prototype.doubleClick.call(this, e);
        this.tryOpenInplaceEditor();
    };
    DesignerPeer.prototype.isContainer = function () {
        return false;
    };
    DesignerPeer.prototype.getToolTip = function () {
        return null;
    };
    DesignerPeer.prototype.internalAddCommands = function (context, commands) {
        // Do nothing in base implementation
    };
    DesignerPeer.prototype.internalRender = function () {
        var element = document.createElement("div");
        element.classList.add("acd-peer");
        var toolTip = this.getToolTip();
        if (toolTip) {
            element.title = toolTip;
        }
        if (this.isContainer()) {
            element.classList.add("container");
        }
        element.style.position = "absolute";
        return element;
    };
    DesignerPeer.prototype.internalUpdateCssStyles = function () {
        if (this.isSelected) {
            this.renderedElement.classList.add("selected");
        }
        else {
            this.renderedElement.classList.remove("selected");
        }
        if (this.dragging) {
            this.renderedElement.classList.add("dragging");
        }
        else {
            this.renderedElement.classList.remove("dragging");
        }
    };
    DesignerPeer.prototype.peerAdded = function (newPeer) {
        this.changed(false);
        if (this.onPeerAdded) {
            this.onPeerAdded(this, newPeer);
        }
    };
    DesignerPeer.prototype.peerRemoved = function (peer) {
        if (this.onPeerRemoved) {
            this.onPeerRemoved(peer);
        }
    };
    DesignerPeer.prototype.internalUpdateLayout = function () {
        if (this.renderedElement) {
            var clientRect = this.getBoundingRect();
            this.renderedElement.style.width = clientRect.width + "px";
            this.renderedElement.style.height = clientRect.height + "px";
            this.renderedElement.style.left = clientRect.left + "px";
            this.renderedElement.style.top = clientRect.top + "px";
        }
    };
    DesignerPeer.prototype.createInplaceEditor = function () {
        return null;
    };
    DesignerPeer.prototype.internalGetTreeItemText = function () {
        return null;
    };
    DesignerPeer.prototype.getCardObject = function () {
        return this._cardObject;
    };
    DesignerPeer.prototype.changed = function (updatePropertySheet) {
        if (this.onChanged) {
            this.onChanged(this, updatePropertySheet);
        }
    };
    DesignerPeer.prototype.getTreeItemText = function () {
        return this.internalGetTreeItemText();
    };
    DesignerPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        // Do nothing in base implementation
    };
    DesignerPeer.prototype.canDrop = function (peer) {
        return false;
    };
    DesignerPeer.prototype.canBeRemoved = function () {
        return true;
    };
    DesignerPeer.prototype.tryDrop = function (peer, insertionPoint) {
        return false;
    };
    DesignerPeer.prototype.insertChild = function (peer, index) {
        if (index === void 0) { index = -1; }
        if (index == -1) {
            this._children.push(peer);
        }
        else {
            this._children.splice(index, 0, peer);
        }
        peer.parent = this;
        this.peerAdded(peer);
    };
    DesignerPeer.prototype.removeChild = function (peer) {
        var index = this._children.indexOf(peer);
        if (index >= 0) {
            peer.parent = null;
            this._children.splice(index, 1);
        }
    };
    DesignerPeer.prototype.getChildCount = function () {
        return this._children.length;
    };
    DesignerPeer.prototype.getChildAt = function (index) {
        return this._children[index];
    };
    DesignerPeer.prototype.getCommands = function (context, promoteParentCommands) {
        if (promoteParentCommands === void 0) { promoteParentCommands = false; }
        var result = [];
        this.internalAddCommands(context, result);
        if (promoteParentCommands && this.parent) {
            var parentCommands = this.parent.getCommands(context);
            for (var _i = 0, parentCommands_1 = parentCommands; _i < parentCommands_1.length; _i++) {
                var command = parentCommands_1[_i];
                if (command.isPromotable) {
                    result.push(command);
                }
            }
        }
        return result;
    };
    DesignerPeer.prototype.remove = function (onlyFromCard, removeChildren) {
        if (removeChildren) {
            while (this._children.length > 0) {
                this._children[0].remove(onlyFromCard, removeChildren);
            }
        }
        var result = this.internalRemove();
        if (result && !onlyFromCard) {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.removeElementsFromDesignerSurface();
            this.peerRemoved(this);
        }
        return result;
    };
    DesignerPeer.prototype.addElementsToDesignerSurface = function (designerSurface, processChildren) {
        if (processChildren === void 0) { processChildren = false; }
        designerSurface.appendChild(this.renderedElement);
        if (processChildren) {
            for (var i = 0; i < this.getChildCount(); i++) {
                this.getChildAt(i).addElementsToDesignerSurface(designerSurface, processChildren);
            }
        }
    };
    DesignerPeer.prototype.removeElementsFromDesignerSurface = function (processChildren) {
        if (processChildren === void 0) { processChildren = false; }
        this.renderedElement.remove();
        if (processChildren) {
            for (var i = 0; i < this.getChildCount(); i++) {
                this.getChildAt(i).removeElementsFromDesignerSurface(processChildren);
            }
        }
    };
    DesignerPeer.prototype.buildPropertySheetCard = function (context) {
        var card = new Adaptive.AdaptiveCard();
        card.padding = new Adaptive.PaddingDefinition(Adaptive.Spacing.Small, Adaptive.Spacing.Small, Adaptive.Spacing.Small, Adaptive.Spacing.Small);
        var propertySheet = new PropertySheet();
        this.populatePropertySheet(propertySheet);
        propertySheet.render(card, new PropertySheetContext(context, this));
        var actionSet = new Adaptive.ActionSet();
        var commands = this.getCommands(context, true);
        var _loop_3 = function (command) {
            if (command.showInPropertySheet) {
                var action_1 = new Adaptive.SubmitAction();
                action_1.title = command.name;
                action_1.onExecute = function (sender) {
                    command.execute(command, action_1.renderedElement);
                };
                actionSet.addAction(action_1);
            }
        };
        for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
            var command = commands_1[_i];
            _loop_3(command);
        }
        actionSet.separator = true;
        card.addItem(actionSet);
        return card;
    };
    DesignerPeer.prototype.scrollIntoView = function () {
        if (this.renderedElement) {
            this.renderedElement.scrollIntoView();
        }
        if (this.treeItem && this.treeItem.renderedElement) {
            this.treeItem.renderedElement.scrollIntoView();
        }
    };
    Object.defineProperty(DesignerPeer.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (value) {
            this._parent = value;
            if (this.onParentChanged) {
                this.onParentChanged(this);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DesignerPeer.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (value) {
            if (value != this._isSelected) {
                this._isSelected = value;
                this.updateLayout();
                this.treeItem.isSelected = this._isSelected;
                if (this.onSelectedChanged) {
                    this.onSelectedChanged(this);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    DesignerPeer.idProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "id", "Id");
    return DesignerPeer;
}(draggable_element_1.DraggableElement));
exports.DesignerPeer = DesignerPeer;
var ActionPeer = /** @class */ (function (_super) {
    __extends(ActionPeer, _super);
    function ActionPeer(parent, designerSurface, registration, action) {
        return _super.call(this, parent, designerSurface, registration, action) || this;
    }
    ActionPeer.prototype.doubleClick = function (e) {
        _super.prototype.doubleClick.call(this, e);
        this.action.renderedElement.click();
    };
    ActionPeer.prototype.internalRemove = function () {
        return this.action.remove();
    };
    ActionPeer.prototype.internalGetTreeItemText = function () {
        if (this.action.title && this.action.title != "") {
            return this.action.title;
        }
        else {
            return _super.prototype.internalGetTreeItemText.call(this);
        }
    };
    ActionPeer.prototype.isDraggable = function () {
        return false;
    };
    ActionPeer.prototype.getBoundingRect = function () {
        var designSurfaceOffset = this.designerSurface.getDesignerSurfaceOffset();
        var actionBoundingRect = this.action.renderedElement.getBoundingClientRect();
        return new miscellaneous_1.Rect(actionBoundingRect.top - designSurfaceOffset.y, actionBoundingRect.right - designSurfaceOffset.x, actionBoundingRect.bottom - designSurfaceOffset.y, actionBoundingRect.left - designSurfaceOffset.x);
    };
    ActionPeer.prototype.getCardObjectBoundingRect = function () {
        var actionBoundingRect = this.action.renderedElement.getBoundingClientRect();
        return new miscellaneous_1.Rect(actionBoundingRect.top, actionBoundingRect.right, actionBoundingRect.bottom, actionBoundingRect.left);
    };
    ActionPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, ActionPeer.idProperty, ActionPeer.titleProperty, ActionPeer.styleProperty, ActionPeer.iconUrlProperty);
    };
    Object.defineProperty(ActionPeer.prototype, "action", {
        get: function () {
            return this.getCardObject();
        },
        enumerable: false,
        configurable: true
    });
    ActionPeer.titleProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "title", "Title");
    ActionPeer.styleProperty = new ChoicePropertyEditor(Adaptive.Versions.v1_2, "style", "Style", [
        { targetVersion: Adaptive.Versions.v1_2, name: "Default", value: Adaptive.ActionStyle.Default },
        { targetVersion: Adaptive.Versions.v1_2, name: "Positive", value: Adaptive.ActionStyle.Positive },
        { targetVersion: Adaptive.Versions.v1_2, name: "Destructive", value: Adaptive.ActionStyle.Destructive }
    ]);
    ActionPeer.iconUrlProperty = new StringPropertyEditor(Adaptive.Versions.v1_1, "iconUrl", "Icon URL");
    return ActionPeer;
}(DesignerPeer));
exports.ActionPeer = ActionPeer;
var TypedActionPeer = /** @class */ (function (_super) {
    __extends(TypedActionPeer, _super);
    function TypedActionPeer(parent, designerSurface, registration, action) {
        return _super.call(this, parent, designerSurface, registration, action) || this;
    }
    Object.defineProperty(TypedActionPeer.prototype, "action", {
        get: function () {
            return this.getCardObject();
        },
        enumerable: false,
        configurable: true
    });
    return TypedActionPeer;
}(ActionPeer));
exports.TypedActionPeer = TypedActionPeer;
var HttpActionPeer = /** @class */ (function (_super) {
    __extends(HttpActionPeer, _super);
    function HttpActionPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HttpActionPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        // if (Adaptive.GlobalSettings.useBuiltInInputValidation) {
        //     propertySheet.add(
        //         PropertySheetCategory.DefaultCategory,
        //         HttpActionPeer.ignoreInputValidationProperty);
        // }
        propertySheet.add(defaultCategory, HttpActionPeer.methodProperty, HttpActionPeer.urlProperty);
        if (this.action.method == "POST") {
            propertySheet.add(defaultCategory, HttpActionPeer.bodyProperty);
        }
        propertySheet.add("HTTP headers", HttpActionPeer.headersProperty);
    };
    HttpActionPeer.ignoreInputValidationProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_3, "ignoreInputValidation", "Ignore input validation");
    HttpActionPeer.methodProperty = new ChoicePropertyEditor(Adaptive.Versions.v1_0, "method", "Method", [
        { targetVersion: Adaptive.Versions.v1_0, name: "GET", value: "GET" },
        { targetVersion: Adaptive.Versions.v1_0, name: "POST", value: "POST" }
    ], true);
    HttpActionPeer.urlProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "url", "Url");
    HttpActionPeer.bodyProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "body", "Body", false, true);
    HttpActionPeer.headersProperty = new NameValuePairPropertyEditor(Adaptive.Versions.v1_0, "headers", "name", "value", function (name, value) { return new Adaptive.HttpHeader(name, value); }, "Name", "Value", "Add a new header", "This action has no header.");
    return HttpActionPeer;
}(TypedActionPeer));
exports.HttpActionPeer = HttpActionPeer;
var SubmitActionPeer = /** @class */ (function (_super) {
    __extends(SubmitActionPeer, _super);
    function SubmitActionPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubmitActionPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, SubmitActionPeer.ignoreInputValidationProperty, SubmitActionPeer.dataProperty);
    };
    SubmitActionPeer.ignoreInputValidationProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_3, "ignoreInputValidation", "Ignore input validation");
    SubmitActionPeer.dataProperty = new ObjectPropertyEditor(Adaptive.Versions.v1_0, "data", "Data");
    return SubmitActionPeer;
}(TypedActionPeer));
exports.SubmitActionPeer = SubmitActionPeer;
var OpenUrlActionPeer = /** @class */ (function (_super) {
    __extends(OpenUrlActionPeer, _super);
    function OpenUrlActionPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OpenUrlActionPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, OpenUrlActionPeer.urlProperty);
    };
    OpenUrlActionPeer.urlProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "url", "Url");
    return OpenUrlActionPeer;
}(TypedActionPeer));
exports.OpenUrlActionPeer = OpenUrlActionPeer;
var ShowCardActionPeer = /** @class */ (function (_super) {
    __extends(ShowCardActionPeer, _super);
    function ShowCardActionPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShowCardActionPeer.prototype.getToolTip = function () {
        return "Double click to open/close";
    };
    return ShowCardActionPeer;
}(TypedActionPeer));
exports.ShowCardActionPeer = ShowCardActionPeer;
var ToggleVisibilityActionPeer = /** @class */ (function (_super) {
    __extends(ToggleVisibilityActionPeer, _super);
    function ToggleVisibilityActionPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ToggleVisibilityActionPeer;
}(TypedActionPeer));
exports.ToggleVisibilityActionPeer = ToggleVisibilityActionPeer;
var CardElementPeer = /** @class */ (function (_super) {
    __extends(CardElementPeer, _super);
    function CardElementPeer(parent, designerSurface, registration, cardElement) {
        var _this = _super.call(this, parent, designerSurface, registration, cardElement) || this;
        if (cardElement instanceof Adaptive.CardElementContainer) {
            for (var i = 0; i < cardElement.getItemCount(); i++) {
                _this.insertChild(card_designer_surface_1.CardDesignerSurface.cardElementPeerRegistry.createPeerInstance(_this.designerSurface, _this, cardElement.getItemAt(i)));
            }
        }
        for (var i = 0; i < _this.cardElement.getActionCount(); i++) {
            _this.insertChild(card_designer_surface_1.CardDesignerSurface.actionPeerRegistry.createPeerInstance(_this.designerSurface, _this, cardElement.getActionAt(i)));
        }
        return _this;
    }
    CardElementPeer.prototype.insertElementAfter = function (newElement) {
        if (this.cardElement.parent instanceof Adaptive.Container) {
            this.cardElement.parent.insertItemAfter(newElement, this.cardElement);
            var newPeer = card_designer_surface_1.CardDesignerSurface.cardElementPeerRegistry.createPeerInstance(this.designerSurface, this, newElement);
            this.peerAdded(newPeer);
        }
    };
    CardElementPeer.prototype.internalRemove = function () {
        return this.cardElement.remove();
    };
    CardElementPeer.prototype.internalUpdateCssStyles = function () {
        _super.prototype.internalUpdateCssStyles.call(this);
        if (this.cardElement.isVisible) {
            this.renderedElement.classList.remove("invisible");
        }
        else {
            this.renderedElement.classList.add("invisible");
        }
    };
    CardElementPeer.prototype.getTreeItemText = function () {
        var text = _super.prototype.getTreeItemText.call(this);
        if (this.cardElement.isVisible) {
            return text;
        }
        else {
            var result = "Hidden";
            if (text) {
                result += " - " + text;
            }
            return result;
        }
    };
    CardElementPeer.prototype.initializeCardElement = function () {
        // Do nothing in base implementation
    };
    CardElementPeer.prototype.canDrop = function (peer) {
        return this.cardElement instanceof Adaptive.Container && peer instanceof CardElementPeer;
    };
    CardElementPeer.prototype.tryDrop = function (peer, insertionPoint) {
        if (this.cardElement instanceof Adaptive.Container && peer instanceof CardElementPeer) {
            var targetChild = null;
            var insertAfter = void 0;
            for (var i = 0; i < this.getChildCount(); i++) {
                var rect = this.getChildAt(i).getBoundingRect();
                if (rect.isInside(insertionPoint)) {
                    targetChild = this.getChildAt(i);
                    insertAfter = (insertionPoint.y - rect.top) >= (rect.height / 2);
                    break;
                }
            }
            if (targetChild != peer) {
                if (peer.cardElement.parent) {
                    if (!peer.remove(true, false)) {
                        return false;
                    }
                    peer.parent.removeChild(peer);
                }
                if (!targetChild) {
                    var rect = this.getBoundingRect();
                    insertAfter = (insertionPoint.y - rect.top) >= (rect.height / 2);
                    if (this.cardElement.getItemCount() > 0 && insertAfter) {
                        this.cardElement.insertItemAfter(peer.cardElement, this.cardElement.getItemAt(this.cardElement.getItemCount() - 1));
                    }
                    else {
                        this.cardElement.insertItemAfter(peer.cardElement, null);
                    }
                }
                else {
                    if (insertAfter) {
                        this.cardElement.insertItemAfter(peer.cardElement, targetChild.cardElement);
                    }
                    else {
                        this.cardElement.insertItemBefore(peer.cardElement, targetChild.cardElement);
                    }
                }
                this.insertChild(peer, peer.cardElement.index);
                this.changed(false);
                return true;
            }
        }
        return false;
    };
    CardElementPeer.prototype.getBoundingRect = function () {
        var designSurfaceOffset = this.designerSurface.getDesignerSurfaceOffset();
        var cardElementBoundingRect = this.cardElement.renderedElement.getBoundingClientRect();
        if (this.cardElement.hasVisibleSeparator) {
            var separatorBoundingRect = this.cardElement.separatorElement.getBoundingClientRect();
            return new miscellaneous_1.Rect(Math.min(separatorBoundingRect.top, cardElementBoundingRect.top) - designSurfaceOffset.y, Math.max(separatorBoundingRect.right, cardElementBoundingRect.right) - designSurfaceOffset.x, Math.max(separatorBoundingRect.bottom, cardElementBoundingRect.bottom) - designSurfaceOffset.y, Math.min(separatorBoundingRect.left, cardElementBoundingRect.left) - designSurfaceOffset.x);
        }
        else {
            return new miscellaneous_1.Rect(cardElementBoundingRect.top - designSurfaceOffset.y, cardElementBoundingRect.right - designSurfaceOffset.x, cardElementBoundingRect.bottom - designSurfaceOffset.y, cardElementBoundingRect.left - designSurfaceOffset.x);
        }
    };
    CardElementPeer.prototype.getCardObjectBoundingRect = function () {
        var cardElementBoundingRect = this.cardElement.renderedElement.getBoundingClientRect();
        return new miscellaneous_1.Rect(cardElementBoundingRect.top, cardElementBoundingRect.right, cardElementBoundingRect.bottom, cardElementBoundingRect.left);
    };
    CardElementPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        if (shared_1.GlobalSettings.enableDataBindingSupport) {
            propertySheet.add(defaultCategory, CardElementPeer.dataContextProperty, CardElementPeer.whenProperty);
        }
        propertySheet.add(defaultCategory, CardElementPeer.idProperty, CardElementPeer.isVisibleProperty);
        propertySheet.add(PropertySheetCategory.LayoutCategory, CardElementPeer.spacingProperty, CardElementPeer.separatorProperty, CardElementPeer.horizontalAlignmentProperty, CardElementPeer.heightProperty);
    };
    Object.defineProperty(CardElementPeer.prototype, "cardElement", {
        get: function () {
            return this.getCardObject();
        },
        enumerable: false,
        configurable: true
    });
    CardElementPeer.dataContextProperty = new CustomCardObjectPropertyEditor("*", "$data", "Data context", true);
    CardElementPeer.whenProperty = new CustomCardObjectPropertyEditor("*", "$when", "Only show when", true);
    CardElementPeer.idProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "id", "Id");
    CardElementPeer.isVisibleProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_2, "isVisible", "Initially visible");
    CardElementPeer.spacingProperty = new EnumPropertyEditor(Adaptive.Versions.v1_0, "spacing", "Spacing", Adaptive.Spacing);
    CardElementPeer.separatorProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_0, "separator", "Separator");
    CardElementPeer.horizontalAlignmentProperty = new EnumPropertyEditor(Adaptive.Versions.v1_0, "horizontalAlignment", "Horizontal alignment", Adaptive.HorizontalAlignment);
    CardElementPeer.heightProperty = new HeightPropertyEditor(Adaptive.Versions.v1_1, "height", "Height", [
        { targetVersion: Adaptive.Versions.v1_1, name: "Automatic", value: "auto" },
        { targetVersion: Adaptive.Versions.v1_1, name: "Stretch", value: "stretch" }
    ]);
    return CardElementPeer;
}(DesignerPeer));
exports.CardElementPeer = CardElementPeer;
var TypedCardElementPeer = /** @class */ (function (_super) {
    __extends(TypedCardElementPeer, _super);
    function TypedCardElementPeer(parent, designerSurface, registration, cardElement) {
        return _super.call(this, parent, designerSurface, registration, cardElement) || this;
    }
    Object.defineProperty(TypedCardElementPeer.prototype, "cardElement", {
        get: function () {
            return this.getCardObject();
        },
        enumerable: false,
        configurable: true
    });
    return TypedCardElementPeer;
}(CardElementPeer));
exports.TypedCardElementPeer = TypedCardElementPeer;
var AdaptiveCardPeer = /** @class */ (function (_super) {
    __extends(AdaptiveCardPeer, _super);
    function AdaptiveCardPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptiveCardPeer.prototype.addAction = function (action) {
        this.cardElement.addAction(action);
        this.insertChild(card_designer_surface_1.CardDesignerSurface.actionPeerRegistry.createPeerInstance(this.designerSurface, this, action));
    };
    AdaptiveCardPeer.prototype.internalRemove = function () {
        return true;
    };
    AdaptiveCardPeer.prototype.internalAddCommands = function (context, commands) {
        var _this = this;
        _super.prototype.internalAddCommands.call(this, context, commands);
        var availableActions = [];
        for (var i = 0; i < context.hostContainer.actionsRegistry.getItemCount(); i++) {
            var typeRegistration = context.hostContainer.actionsRegistry.getItemAt(i);
            if (typeRegistration.schemaVersion.compareTo(context.targetVersion) <= 0) {
                availableActions.push(typeRegistration);
            }
        }
        if (availableActions.length > 0) {
            commands.push(new peer_command_1.PeerCommand({
                name: "Add an action",
                alwaysShowName: true,
                iconClass: "acd-icon-bolt",
                showInPropertySheet: true,
                execute: function (command, clickedElement) {
                    var popupMenu = new Controls.PopupMenu();
                    var _loop_4 = function (i_1) {
                        var menuItem = new Controls.DropDownItem(i_1.toString(), availableActions[i_1].typeName);
                        menuItem.onClick = function (clickedItem) {
                            var registration = availableActions[i_1];
                            var action = new registration.objectType();
                            action.title = registration.typeName;
                            _this.addAction(action);
                            popupMenu.closePopup(false);
                        };
                        popupMenu.items.add(menuItem);
                    };
                    for (var i_1 = 0; i_1 < availableActions.length; i_1++) {
                        _loop_4(i_1);
                    }
                    popupMenu.popup(clickedElement);
                }
            }));
        }
    };
    AdaptiveCardPeer.prototype.isDraggable = function () {
        return false;
    };
    AdaptiveCardPeer.prototype.canBeRemoved = function () {
        return false;
    };
    AdaptiveCardPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        var _this = this;
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.remove(DesignerPeer.idProperty, CardElementPeer.isVisibleProperty, CardElementPeer.horizontalAlignmentProperty, CardElementPeer.separatorProperty, CardElementPeer.heightProperty, CardElementPeer.spacingProperty);
        propertySheet.add(defaultCategory, AdaptiveCardPeer.langProperty, AdaptiveCardPeer.fallbackTextProperty, AdaptiveCardPeer.speakProperty);
        propertySheet.add(PropertySheetCategory.LayoutCategory, ContainerPeer.minHeightProperty, ContainerPeer.verticalContentAlignmentProperty);
        propertySheet.add("Background image", ContainerPeer.backgroundImageProperty);
        propertySheet.add(PropertySheetCategory.SelectionAction, ContainerPeer.selectActionProperty);
        if (this.cardElement.selectAction) {
            var selectActionPeer = card_designer_surface_1.CardDesignerSurface.actionPeerRegistry.createPeerInstance(this.designerSurface, null, this.cardElement.selectAction);
            selectActionPeer.onChanged = function (sender, updatePropertySheet) { _this.changed(updatePropertySheet); };
            var subPropertySheet = new PropertySheet(false);
            selectActionPeer.populatePropertySheet(subPropertySheet, PropertySheetCategory.SelectionAction);
            subPropertySheet.remove(ActionPeer.iconUrlProperty, ActionPeer.styleProperty);
            propertySheet.add(PropertySheetCategory.SelectionAction, new SubPropertySheetEntry(Adaptive.Versions.v1_2, this.cardElement.selectAction, subPropertySheet));
        }
    };
    AdaptiveCardPeer.langProperty = new StringPropertyEditor(Adaptive.Versions.v1_1, "lang", "Language");
    AdaptiveCardPeer.fallbackTextProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "fallbackText", "Fallback text", false, true);
    AdaptiveCardPeer.speakProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "speak", "Speak");
    return AdaptiveCardPeer;
}(TypedCardElementPeer));
exports.AdaptiveCardPeer = AdaptiveCardPeer;
var ColumnPeer = /** @class */ (function (_super) {
    __extends(ColumnPeer, _super);
    function ColumnPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnPeer.prototype.isContainer = function () {
        return true;
    };
    ColumnPeer.prototype.internalGetTreeItemText = function () {
        if (this.cardElement.width instanceof Adaptive.SizeAndUnit) {
            switch (this.cardElement.width.unit) {
                case Adaptive.SizeUnit.Weight:
                    return "Weight: " + this.cardElement.width.physicalSize;
                default:
                    return this.cardElement.width.physicalSize + " pixels";
            }
        }
        else {
            switch (this.cardElement.width) {
                case "stretch":
                    return "Stretch";
                case "auto":
                    return "Automatic";
                default:
                    return "";
            }
        }
    };
    ColumnPeer.prototype.isDraggable = function () {
        return false;
    };
    ColumnPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        var _this = this;
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(PropertySheetCategory.LayoutCategory, ColumnPeer.widthProperty);
        if (this.cardElement.width instanceof Adaptive.SizeAndUnit) {
            if (this.cardElement.width.unit == Adaptive.SizeUnit.Pixel) {
                propertySheet.add(PropertySheetCategory.LayoutCategory, ColumnPeer.pixelWidthProperty);
            }
            else {
                propertySheet.add(PropertySheetCategory.LayoutCategory, ColumnPeer.weightProperty);
            }
        }
        propertySheet.add(PropertySheetCategory.LayoutCategory, ContainerPeer.minHeightProperty, ContainerPeer.verticalContentAlignmentProperty);
        propertySheet.add(PropertySheetCategory.StyleCategory, ContainerPeer.styleProperty, ContainerPeer.bleedProperty);
        propertySheet.add("Background image", ContainerPeer.backgroundImageProperty);
        propertySheet.add(PropertySheetCategory.SelectionAction, ContainerPeer.selectActionProperty);
        if (this.cardElement.selectAction) {
            var selectActionPeer = card_designer_surface_1.CardDesignerSurface.actionPeerRegistry.createPeerInstance(this.designerSurface, null, this.cardElement.selectAction);
            selectActionPeer.onChanged = function (sender, updatePropertySheet) { _this.changed(updatePropertySheet); };
            var subPropertySheet = new PropertySheet(false);
            selectActionPeer.populatePropertySheet(subPropertySheet, PropertySheetCategory.SelectionAction);
            subPropertySheet.remove(ActionPeer.iconUrlProperty, ActionPeer.styleProperty);
            propertySheet.add(PropertySheetCategory.SelectionAction, new SubPropertySheetEntry(Adaptive.Versions.v1_2, this.cardElement.selectAction, subPropertySheet));
        }
    };
    ColumnPeer.pixelWidthProperty = new SizeAndUnitPropertyEditor(Adaptive.Versions.v1_1, "width", "Width in pixels", Adaptive.SizeUnit.Pixel);
    ColumnPeer.weightProperty = new SizeAndUnitPropertyEditor(Adaptive.Versions.v1_0, "width", "Weight", Adaptive.SizeUnit.Weight);
    ColumnPeer.widthProperty = new ColumnWidthPropertyEditor(Adaptive.Versions.v1_0, "width", "Width", [
        { targetVersion: Adaptive.Versions.v1_0, name: "Automatic", value: "auto" },
        { targetVersion: Adaptive.Versions.v1_0, name: "Stretch", value: "stretch" },
        { targetVersion: Adaptive.Versions.v1_0, name: "Weighted", value: "weighted" },
        { targetVersion: Adaptive.Versions.v1_1, name: "Pixels", value: "pixels" }
    ], true);
    return ColumnPeer;
}(TypedCardElementPeer));
exports.ColumnPeer = ColumnPeer;
var ColumnSetPeer = /** @class */ (function (_super) {
    __extends(ColumnSetPeer, _super);
    function ColumnSetPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnSetPeer.prototype.isContainer = function () {
        return true;
    };
    ColumnSetPeer.prototype.internalAddCommands = function (context, commands) {
        var _this = this;
        _super.prototype.internalAddCommands.call(this, context, commands);
        commands.push(new peer_command_1.PeerCommand({
            name: "Add a column",
            iconClass: "acd-icon-addColumn",
            isPromotable: true,
            execute: function (command, clickedElement) {
                var column = new Adaptive.Column();
                column.width = "stretch";
                _this.cardElement.addColumn(column);
                _this.insertChild(card_designer_surface_1.CardDesignerSurface.cardElementPeerRegistry.createPeerInstance(_this.designerSurface, _this, column));
            }
        }));
    };
    ColumnSetPeer.prototype.internalGetTreeItemText = function () {
        var columnCount = this.cardElement.getItemCount();
        switch (columnCount) {
            case 0:
                return "No column";
            case 1:
                return "1 column";
            default:
                return columnCount + " columns";
        }
    };
    ColumnSetPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        var _this = this;
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, ContainerPeer.minHeightProperty, ContainerPeer.styleProperty, ContainerPeer.bleedProperty);
        propertySheet.add(PropertySheetCategory.SelectionAction, ContainerPeer.selectActionProperty);
        if (this.cardElement.selectAction) {
            var selectActionPeer = card_designer_surface_1.CardDesignerSurface.actionPeerRegistry.createPeerInstance(this.designerSurface, null, this.cardElement.selectAction);
            selectActionPeer.onChanged = function (sender, updatePropertySheet) { _this.changed(updatePropertySheet); };
            var subPropertySheet = new PropertySheet(false);
            selectActionPeer.populatePropertySheet(subPropertySheet, PropertySheetCategory.SelectionAction);
            subPropertySheet.remove(ActionPeer.iconUrlProperty, ActionPeer.styleProperty);
            propertySheet.add(PropertySheetCategory.SelectionAction, new SubPropertySheetEntry(Adaptive.Versions.v1_2, this.cardElement.selectAction, subPropertySheet));
        }
    };
    ColumnSetPeer.prototype.canDrop = function (peer) {
        return true;
    };
    return ColumnSetPeer;
}(TypedCardElementPeer));
exports.ColumnSetPeer = ColumnSetPeer;
var ContainerPeer = /** @class */ (function (_super) {
    __extends(ContainerPeer, _super);
    function ContainerPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContainerPeer.prototype.isContainer = function () {
        return true;
    };
    ContainerPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        var _this = this;
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(PropertySheetCategory.LayoutCategory, ContainerPeer.minHeightProperty, ContainerPeer.verticalContentAlignmentProperty);
        propertySheet.add(PropertySheetCategory.StyleCategory, ContainerPeer.styleProperty, ContainerPeer.bleedProperty);
        propertySheet.add("Background image", ContainerPeer.backgroundImageProperty);
        propertySheet.add(PropertySheetCategory.SelectionAction, ContainerPeer.selectActionProperty);
        if (this.cardElement.selectAction) {
            var selectActionPeer = card_designer_surface_1.CardDesignerSurface.actionPeerRegistry.createPeerInstance(this.designerSurface, null, this.cardElement.selectAction);
            selectActionPeer.onChanged = function (sender, updatePropertySheet) { _this.changed(updatePropertySheet); };
            var subPropertySheet = new PropertySheet(false);
            selectActionPeer.populatePropertySheet(subPropertySheet, PropertySheetCategory.SelectionAction);
            subPropertySheet.remove(ActionPeer.iconUrlProperty, ActionPeer.styleProperty);
            propertySheet.add(PropertySheetCategory.SelectionAction, new SubPropertySheetEntry(Adaptive.Versions.v1_2, this.cardElement.selectAction, subPropertySheet));
        }
    };
    ContainerPeer.selectActionProperty = new ActionPropertyEditor(Adaptive.Versions.v1_0, "selectAction", "Action type", [Adaptive.ShowCardAction.JsonTypeName], true);
    ContainerPeer.minHeightProperty = new NumberPropertyEditor(Adaptive.Versions.v1_2, "minPixelHeight", "Minimum height in pixels");
    ContainerPeer.verticalContentAlignmentProperty = new EnumPropertyEditor(Adaptive.Versions.v1_1, "verticalContentAlignment", "Vertical content alignment", Adaptive.VerticalAlignment);
    ContainerPeer.styleProperty = new ContainerStylePropertyEditor(Adaptive.Versions.v1_0, "style", "Style");
    ContainerPeer.bleedProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_2, "bleed", "Bleed");
    ContainerPeer.backgroundImageProperty = new CompoundPropertyEditor(Adaptive.Versions.v1_0, "backgroundImage", [
        new StringPropertyEditor(Adaptive.Versions.v1_0, "url", "URL", true),
        new EnumPropertyEditor(Adaptive.Versions.v1_2, "fillMode", "Fill mode", Adaptive.FillMode),
        new EnumPropertyEditor(Adaptive.Versions.v1_2, "horizontalAlignment", "Horizontal alignment", Adaptive.HorizontalAlignment),
        new EnumPropertyEditor(Adaptive.Versions.v1_2, "verticalAlignment", "Vertical alignment", Adaptive.VerticalAlignment)
    ]);
    return ContainerPeer;
}(TypedCardElementPeer));
exports.ContainerPeer = ContainerPeer;
var ActionSetPeer = /** @class */ (function (_super) {
    __extends(ActionSetPeer, _super);
    function ActionSetPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionSetPeer.prototype.addAction = function (action) {
        this.cardElement.addAction(action);
        this.insertChild(card_designer_surface_1.CardDesignerSurface.actionPeerRegistry.createPeerInstance(this.designerSurface, this, action));
    };
    ActionSetPeer.prototype.internalAddCommands = function (context, commands) {
        var _this = this;
        _super.prototype.internalAddCommands.call(this, context, commands);
        var availableActions = [];
        for (var i = 0; i < context.hostContainer.actionsRegistry.getItemCount(); i++) {
            var typeRegistration = context.hostContainer.actionsRegistry.getItemAt(i);
            if (typeRegistration.schemaVersion.compareTo(context.targetVersion) <= 0) {
                availableActions.push(typeRegistration);
            }
        }
        if (availableActions.length > 0) {
            commands.push(new peer_command_1.PeerCommand({
                name: "Add an action",
                alwaysShowName: true,
                iconClass: "acd-icon-bolt",
                showInPropertySheet: true,
                execute: function (command, clickedElement) {
                    var popupMenu = new Controls.PopupMenu();
                    var _loop_5 = function (i_2) {
                        var menuItem = new Controls.DropDownItem(i_2.toString(), availableActions[i_2].typeName);
                        menuItem.onClick = function (clickedItem) {
                            var registration = availableActions[i_2];
                            var action = new registration.objectType();
                            action.title = registration.typeName;
                            _this.addAction(action);
                            popupMenu.closePopup(false);
                        };
                        popupMenu.items.add(menuItem);
                    };
                    for (var i_2 = 0; i_2 < availableActions.length; i_2++) {
                        _loop_5(i_2);
                    }
                    popupMenu.popup(clickedElement);
                }
            }));
        }
    };
    return ActionSetPeer;
}(TypedCardElementPeer));
exports.ActionSetPeer = ActionSetPeer;
var ImageSetPeer = /** @class */ (function (_super) {
    __extends(ImageSetPeer, _super);
    function ImageSetPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageSetPeer.prototype.internalAddCommands = function (context, commands) {
        var _this = this;
        _super.prototype.internalAddCommands.call(this, context, commands);
        commands.push(new peer_command_1.PeerCommand({
            name: "Add an image",
            iconClass: "acd-icon-image",
            isPromotable: true,
            execute: function (command, clickedElement) {
                var newImage = new Adaptive.Image();
                _this.cardElement.addImage(newImage);
                _this.insertChild(card_designer_surface_1.CardDesignerSurface.cardElementPeerRegistry.createPeerInstance(_this.designerSurface, _this, newImage));
            }
        }));
    };
    ImageSetPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, ImageSetPeer.ImageSizeProperty);
    };
    ImageSetPeer.ImageSizeProperty = new EnumPropertyEditor(Adaptive.Versions.v1_0, "imageSize", "Image size", Adaptive.Size);
    return ImageSetPeer;
}(TypedCardElementPeer));
exports.ImageSetPeer = ImageSetPeer;
var ImagePeer = /** @class */ (function (_super) {
    __extends(ImagePeer, _super);
    function ImagePeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ImagePeer.prototype, "isParentImageSet", {
        get: function () {
            return this.parent && this.parent instanceof ImageSetPeer;
        },
        enumerable: false,
        configurable: true
    });
    ImagePeer.prototype.internalAddCommands = function (context, commands) {
        var _this = this;
        _super.prototype.internalAddCommands.call(this, context, commands);
        if (shared_1.GlobalSettings.enableDataBindingSupport && context.dataStructure) {
            commands.push(new peer_command_1.PeerCommand({
                name: "Bind...",
                alwaysShowName: true,
                toolTip: "Select a data field to bind this Image to.",
                execute: function (command, clickedElement) {
                    var fieldPicker = new field_picker_1.FieldPicker(context.dataStructure);
                    fieldPicker.onClose = function (sender, wasCancelled) {
                        if (!wasCancelled) {
                            _this.cardElement.url = fieldPicker.selectedField.asExpression();
                            _this.changed(true);
                        }
                    };
                    fieldPicker.popup(clickedElement);
                }
            }));
        }
    };
    ImagePeer.prototype.isDraggable = function () {
        return !this.isParentImageSet;
    };
    ImagePeer.prototype.getBoundingRect = function () {
        if (this.isParentImageSet) {
            var designSurfaceOffset = this.designerSurface.getDesignerSurfaceOffset();
            var actionBoundingRect = this.cardElement.renderedElement.getBoundingClientRect();
            return new miscellaneous_1.Rect(actionBoundingRect.top - designSurfaceOffset.y, actionBoundingRect.right - designSurfaceOffset.x, actionBoundingRect.bottom - designSurfaceOffset.y, actionBoundingRect.left - designSurfaceOffset.x);
        }
        else {
            return _super.prototype.getBoundingRect.call(this);
        }
    };
    ImagePeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        var _this = this;
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, ImagePeer.urlProperty, ImagePeer.altTextProperty);
        if (!this.isParentImageSet) {
            propertySheet.add(PropertySheetCategory.LayoutCategory, ImagePeer.sizeProperty, ImagePeer.pixelWidthProperty, ImagePeer.pixelHeightProperty);
            propertySheet.add(PropertySheetCategory.StyleCategory, ImagePeer.styleProperty, ImagePeer.backgroundColorProperty);
            propertySheet.add(PropertySheetCategory.SelectionAction, ContainerPeer.selectActionProperty);
            if (this.cardElement.selectAction) {
                var selectActionPeer = card_designer_surface_1.CardDesignerSurface.actionPeerRegistry.createPeerInstance(this.designerSurface, null, this.cardElement.selectAction);
                selectActionPeer.onChanged = function (sender, updatePropertySheet) { _this.changed(updatePropertySheet); };
                var subPropertySheet = new PropertySheet(false);
                selectActionPeer.populatePropertySheet(subPropertySheet, PropertySheetCategory.SelectionAction);
                subPropertySheet.remove(ActionPeer.iconUrlProperty, ActionPeer.styleProperty);
                propertySheet.add(PropertySheetCategory.SelectionAction, new SubPropertySheetEntry(Adaptive.Versions.v1_2, this.cardElement.selectAction, subPropertySheet));
            }
        }
    };
    ImagePeer.urlProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "url", "Url", true);
    ImagePeer.altTextProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "altText", "Alternate text", true);
    ImagePeer.sizeProperty = new EnumPropertyEditor(Adaptive.Versions.v1_0, "size", "Size", Adaptive.Size);
    ImagePeer.pixelWidthProperty = new NumberPropertyEditor(Adaptive.Versions.v1_1, "pixelWidth", "Width in pixels");
    ImagePeer.pixelHeightProperty = new NumberPropertyEditor(Adaptive.Versions.v1_1, "pixelHeight", "Height in pixels");
    ImagePeer.styleProperty = new EnumPropertyEditor(Adaptive.Versions.v1_0, "style", "Style", Adaptive.ImageStyle);
    ImagePeer.backgroundColorProperty = new StringPropertyEditor(Adaptive.Versions.v1_1, "backgroundColor", "Background color");
    return ImagePeer;
}(TypedCardElementPeer));
exports.ImagePeer = ImagePeer;
var MediaPeer = /** @class */ (function (_super) {
    __extends(MediaPeer, _super);
    function MediaPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MediaPeer.prototype.internalGetTreeItemText = function () {
        if (this.cardElement.selectedMediaType == "audio") {
            return "audio";
        }
        else if (this.cardElement.selectedMediaType == "video") {
            return "video";
        }
        else {
            return _super.prototype.internalGetTreeItemText.call(this);
        }
    };
    MediaPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, MediaPeer.altTextProperty, MediaPeer.posterUrlProperty);
        propertySheet.add("Sources", MediaPeer.sourcesProperty);
    };
    MediaPeer.altTextProperty = new StringPropertyEditor(Adaptive.Versions.v1_1, "altText", "Alternate text", true);
    MediaPeer.posterUrlProperty = new StringPropertyEditor(Adaptive.Versions.v1_1, "posterUrl", "Poster URL", true);
    MediaPeer.sourcesProperty = new NameValuePairPropertyEditor(Adaptive.Versions.v1_1, "sources", "url", "mimeType", function (name, value) { return new Adaptive.MediaSource(name, value); }, "URL", "MIME type", "Add a new source", "No source has been defined.");
    return MediaPeer;
}(TypedCardElementPeer));
exports.MediaPeer = MediaPeer;
var FactSetPeer = /** @class */ (function (_super) {
    __extends(FactSetPeer, _super);
    function FactSetPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FactSetPeer.prototype.internalGetTreeItemText = function () {
        if (this.cardElement.facts.length == 0) {
            return "No fact";
        }
        var allNames = this.cardElement.facts.map(function (value, index, array) {
            return value.name;
        });
        return allNames.join(", ");
    };
    FactSetPeer.prototype.initializeCardElement = function () {
        _super.prototype.initializeCardElement.call(this);
        this.cardElement.facts.push(new Adaptive.Fact("Fact 1", "Value 1"), new Adaptive.Fact("Fact 2", "Value 2"));
    };
    FactSetPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add("Facts", FactSetPeer.factsProperty);
        propertySheet.remove(CardElementPeer.horizontalAlignmentProperty);
    };
    FactSetPeer.factsProperty = new NameValuePairPropertyEditor(Adaptive.Versions.v1_0, "facts", "name", "value", function (name, value) { return new Adaptive.Fact(name, value); }, "Name", "Value", "Add a new fact", "This FactSet is empty.");
    return FactSetPeer;
}(TypedCardElementPeer));
exports.FactSetPeer = FactSetPeer;
var InputPeer = /** @class */ (function (_super) {
    __extends(InputPeer, _super);
    function InputPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add("Validation", InputPeer.validationProperty);
        propertySheet.remove(CardElementPeer.horizontalAlignmentProperty, CardElementPeer.heightProperty);
    };
    InputPeer.validationProperty = new CompoundPropertyEditor(Adaptive.Versions.v1_3, "validation", [
        //new EnumPropertyEditor(Adaptive.Versions.v1_3, "necessity", "Necessity", Adaptive.InputValidationNecessity),
        new StringPropertyEditor(Adaptive.Versions.v1_3, "errorMessage", "Error message")
    ]);
    return InputPeer;
}(TypedCardElementPeer));
exports.InputPeer = InputPeer;
var TextInputPeer = /** @class */ (function (_super) {
    __extends(TextInputPeer, _super);
    function TextInputPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextInputPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        var _this = this;
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, TextInputPeer.placeholderProperty, TextInputPeer.isMultilineProperty);
        if (!this.cardElement.isMultiline) {
            propertySheet.add(PropertySheetCategory.DefaultCategory, TextInputPeer.styleProperty);
        }
        propertySheet.add(PropertySheetCategory.InlineAction, TextInputPeer.inlineActionProperty);
        if (this.cardElement.inlineAction) {
            var inlineActionPeer = card_designer_surface_1.CardDesignerSurface.actionPeerRegistry.createPeerInstance(this.designerSurface, null, this.cardElement.inlineAction);
            inlineActionPeer.onChanged = function (sender, updatePropertySheet) { _this.changed(updatePropertySheet); };
            var subPropertySheet = new PropertySheet(false);
            inlineActionPeer.populatePropertySheet(subPropertySheet, PropertySheetCategory.InlineAction);
            subPropertySheet.remove(ActionPeer.styleProperty);
            propertySheet.add(PropertySheetCategory.InlineAction, new SubPropertySheetEntry(Adaptive.Versions.v1_2, this.cardElement.inlineAction, subPropertySheet));
        }
        propertySheet.add(defaultCategory, TextInputPeer.maxLengthProperty, TextInputPeer.defaultValueProperty);
    };
    TextInputPeer.prototype.initializeCardElement = function () {
        _super.prototype.initializeCardElement.call(this);
        this.cardElement.placeholder = "Placeholder text";
    };
    TextInputPeer.defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    TextInputPeer.placeholderProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "placeholder", "Placeholder");
    TextInputPeer.isMultilineProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_0, "isMultiline", "Multi-line", true);
    TextInputPeer.styleProperty = new EnumPropertyEditor(Adaptive.Versions.v1_0, "style", "Style", Adaptive.InputTextStyle);
    TextInputPeer.maxLengthProperty = new NumberPropertyEditor(Adaptive.Versions.v1_0, "maxLength", "Maximum length");
    TextInputPeer.inlineActionProperty = new ActionPropertyEditor(Adaptive.Versions.v1_2, "inlineAction", "Action type", [Adaptive.ShowCardAction.JsonTypeName], true);
    return TextInputPeer;
}(InputPeer));
exports.TextInputPeer = TextInputPeer;
var NumberInputPeer = /** @class */ (function (_super) {
    __extends(NumberInputPeer, _super);
    function NumberInputPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberInputPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, NumberInputPeer.placeholderProperty, NumberInputPeer.defaultValueProperty, NumberInputPeer.minProperty, NumberInputPeer.maxProperty);
    };
    NumberInputPeer.prototype.initializeCardElement = function () {
        _super.prototype.initializeCardElement.call(this);
        this.cardElement.placeholder = "Placeholder text";
    };
    NumberInputPeer.defaultValueProperty = new NumberPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    NumberInputPeer.placeholderProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "placeholder", "Placeholder");
    NumberInputPeer.minProperty = new NumberPropertyEditor(Adaptive.Versions.v1_0, "min", "Minimum value");
    NumberInputPeer.maxProperty = new NumberPropertyEditor(Adaptive.Versions.v1_0, "max", "Maximum value");
    return NumberInputPeer;
}(InputPeer));
exports.NumberInputPeer = NumberInputPeer;
var DateInputPeer = /** @class */ (function (_super) {
    __extends(DateInputPeer, _super);
    function DateInputPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateInputPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, DateInputPeer.defaultValueProperty, DateInputPeer.minProperty, DateInputPeer.maxProperty);
    };
    DateInputPeer.defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    DateInputPeer.minProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "min", "Minimum value");
    DateInputPeer.maxProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "max", "Maximum value");
    return DateInputPeer;
}(InputPeer));
exports.DateInputPeer = DateInputPeer;
var TimeInputPeer = /** @class */ (function (_super) {
    __extends(TimeInputPeer, _super);
    function TimeInputPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeInputPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, TimeInputPeer.defaultValueProperty, TimeInputPeer.minProperty, TimeInputPeer.maxProperty);
    };
    TimeInputPeer.defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    TimeInputPeer.minProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "min", "Minimum value");
    TimeInputPeer.maxProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "max", "Maximum value");
    return TimeInputPeer;
}(InputPeer));
exports.TimeInputPeer = TimeInputPeer;
var ToggleInputPeer = /** @class */ (function (_super) {
    __extends(ToggleInputPeer, _super);
    function ToggleInputPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleInputPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, ToggleInputPeer.titleProperty, ToggleInputPeer.valueOnProperty, ToggleInputPeer.valueOffProperty, ToggleInputPeer.defaultValueProperty);
        propertySheet.add(PropertySheetCategory.LayoutCategory, ToggleInputPeer.wrapProperty);
    };
    ToggleInputPeer.prototype.initializeCardElement = function () {
        this.cardElement.title = "New Input.Toggle";
    };
    ToggleInputPeer.defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    ToggleInputPeer.titleProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "title", "Title", true);
    ToggleInputPeer.valueOnProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "valueOn", "Value when on");
    ToggleInputPeer.valueOffProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "valueOff", "Value when off");
    ToggleInputPeer.wrapProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_2, "wrap", "Wrap");
    return ToggleInputPeer;
}(InputPeer));
exports.ToggleInputPeer = ToggleInputPeer;
var ChoiceSetInputPeer = /** @class */ (function (_super) {
    __extends(ChoiceSetInputPeer, _super);
    function ChoiceSetInputPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChoiceSetInputPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, ChoiceSetInputPeer.placeholderProperty, ChoiceSetInputPeer.isMultiselectProperty, ChoiceSetInputPeer.isCompactProperty, ChoiceSetInputPeer.defaultValueProperty);
        propertySheet.add(PropertySheetCategory.LayoutCategory, ToggleInputPeer.wrapProperty);
        propertySheet.add("Choices", ChoiceSetInputPeer.choicesProperty);
    };
    ChoiceSetInputPeer.prototype.initializeCardElement = function () {
        this.cardElement.placeholder = "Placeholder text";
        this.cardElement.choices.push(new Adaptive.Choice("Choice 1", "Choice 1"), new Adaptive.Choice("Choice 2", "Choice 2"));
    };
    ChoiceSetInputPeer.defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    ChoiceSetInputPeer.placeholderProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "placeholder", "Placeholder");
    ChoiceSetInputPeer.isMultiselectProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_0, "isMultiSelect", "Allow multi selection");
    ChoiceSetInputPeer.isCompactProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_0, "isCompact", "Compact style");
    ChoiceSetInputPeer.wrapProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_2, "wrap", "Wrap");
    ChoiceSetInputPeer.choicesProperty = new NameValuePairPropertyEditor(Adaptive.Versions.v1_0, "choices", "title", "value", function (name, value) { return new Adaptive.Choice(name, value); }, "Title", "Value", "Add a new choice", "This ChoiceSet is empty");
    return ChoiceSetInputPeer;
}(InputPeer));
exports.ChoiceSetInputPeer = ChoiceSetInputPeer;
var TextBlockPeerInplaceEditor = /** @class */ (function (_super) {
    __extends(TextBlockPeerInplaceEditor, _super);
    function TextBlockPeerInplaceEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBlockPeerInplaceEditor.prototype.close = function (applyChanges) {
        if (this.onClose) {
            this.onClose(applyChanges);
        }
    };
    TextBlockPeerInplaceEditor.prototype.initialize = function () {
        this._renderedElement.select();
    };
    TextBlockPeerInplaceEditor.prototype.applyChanges = function () {
        this.cardElement.text = this._renderedElement.value;
    };
    TextBlockPeerInplaceEditor.prototype.render = function () {
        var _this = this;
        this._renderedElement = document.createElement("textarea");
        this._renderedElement.className = "acd-textBlock-inplace-editor";
        this._renderedElement.value = this.cardElement.text;
        this._renderedElement.onkeydown = function (e) {
            switch (e.keyCode) {
                case Controls.KEY_ESCAPE:
                    _this.close(false);
                    e.preventDefault();
                    e.cancelBubble = true;
                    break;
                case Controls.KEY_ENTER:
                    _this.close(true);
                    e.preventDefault();
                    e.cancelBubble = true;
                    break;
            }
            return !e.cancelBubble;
        };
        this.cardElement.applyStylesTo(this._renderedElement);
        return this._renderedElement;
    };
    return TextBlockPeerInplaceEditor;
}(CardElementPeerInplaceEditor));
var TextBlockPeer = /** @class */ (function (_super) {
    __extends(TextBlockPeer, _super);
    function TextBlockPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBlockPeer.prototype.createInplaceEditor = function () {
        return new TextBlockPeerInplaceEditor(this.cardElement);
    };
    TextBlockPeer.prototype.internalGetTreeItemText = function () {
        return this.cardElement.text;
    };
    TextBlockPeer.prototype.internalAddCommands = function (context, commands) {
        var _this = this;
        _super.prototype.internalAddCommands.call(this, context, commands);
        if (context.dataStructure) {
            commands.push(new peer_command_1.PeerCommand({
                name: "Bind...",
                alwaysShowName: true,
                toolTip: "Select a data field to bind this TextBlock to.",
                execute: function (command, clickedElement) {
                    var fieldPicker = new field_picker_1.FieldPicker(context.dataStructure);
                    fieldPicker.onClose = function (sender, wasCancelled) {
                        if (!wasCancelled) {
                            _this.cardElement.text = fieldPicker.selectedField.asExpression();
                            _this.changed(true);
                        }
                    };
                    fieldPicker.popup(clickedElement);
                }
            }));
        }
    };
    TextBlockPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, TextBlockPeer.textProperty);
        propertySheet.add(PropertySheetCategory.LayoutCategory, TextBlockPeer.wrapProperty, TextBlockPeer.maxLinesProperty);
        propertySheet.add(PropertySheetCategory.StyleCategory, TextBlockPeer.fontTypeProperty, TextBlockPeer.sizeProperty, TextBlockPeer.weightProperty, TextBlockPeer.colorProperty, TextBlockPeer.subtleProperty);
    };
    TextBlockPeer.prototype.getToolTip = function () {
        return "Double click to edit";
    };
    TextBlockPeer.prototype.initializeCardElement = function () {
        if (!this.cardElement.text || this.cardElement.text == "") {
            this.cardElement.text = "New TextBlock";
        }
    };
    TextBlockPeer.textProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "text", "Text", true, true);
    TextBlockPeer.wrapProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_0, "wrap", "Wrap");
    TextBlockPeer.maxLinesProperty = new NumberPropertyEditor(Adaptive.Versions.v1_0, "maxLines", "Maximum lines", 0);
    TextBlockPeer.fontTypeProperty = new EnumPropertyEditor(Adaptive.Versions.v1_2, "fontType", "Font type", Adaptive.FontType);
    TextBlockPeer.sizeProperty = new EnumPropertyEditor(Adaptive.Versions.v1_0, "size", "Size", Adaptive.TextSize);
    TextBlockPeer.weightProperty = new EnumPropertyEditor(Adaptive.Versions.v1_0, "weight", "Weight", Adaptive.TextWeight);
    TextBlockPeer.colorProperty = new EnumPropertyEditor(Adaptive.Versions.v1_0, "color", "Color", Adaptive.TextColor);
    TextBlockPeer.subtleProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_0, "subtle", "Subtle");
    return TextBlockPeer;
}(TypedCardElementPeer));
exports.TextBlockPeer = TextBlockPeer;
var RichTextBlockPeer = /** @class */ (function (_super) {
    __extends(RichTextBlockPeer, _super);
    function RichTextBlockPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RichTextBlockPeer.prototype.internalGetTreeItemText = function () {
        return this.cardElement.asString();
    };
    RichTextBlockPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, new CustomPropertySheetEntry("*", function (context) {
            var infoTextBlock = new Adaptive.TextBlock();
            infoTextBlock.text = "Use the **Card Payload Editor** to edit the text of this RichTextBlock element.";
            infoTextBlock.wrap = true;
            infoTextBlock.spacing = Adaptive.Spacing.Large;
            infoTextBlock.separator = true;
            infoTextBlock.horizontalAlignment = Adaptive.HorizontalAlignment.Center;
            return infoTextBlock;
        }));
    };
    RichTextBlockPeer.prototype.initializeCardElement = function () {
        var textRun = new Adaptive.TextRun();
        textRun.text = "New RichTextBlock";
        this.cardElement.addInline(textRun);
    };
    return RichTextBlockPeer;
}(TypedCardElementPeer));
exports.RichTextBlockPeer = RichTextBlockPeer;
//# sourceMappingURL=designer-peers.js.map