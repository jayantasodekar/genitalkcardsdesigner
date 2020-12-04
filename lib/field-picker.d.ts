import * as Controls from "adaptivecards-controls";
import { FieldDefinition } from "./data";
export declare class FieldPicker extends Controls.PopupControl {
    readonly dataStructure: FieldDefinition;
    private _selectedField;
    protected renderContent(): HTMLElement;
    constructor(dataStructure: FieldDefinition);
    keyDown(e: KeyboardEvent): void;
    get selectedField(): FieldDefinition;
}
