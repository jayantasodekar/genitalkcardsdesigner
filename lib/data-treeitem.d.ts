import { BaseTreeItem } from "./base-tree-item";
import * as Data from "./data";
export declare class DataTreeItem extends BaseTreeItem {
    private _children;
    private buildChildList;
    protected getLabelText(): string;
    protected getAdditionalText(): string;
    protected getAdditionalTextClass(): string;
    readonly field: Data.FieldDefinition;
    constructor(field: Data.FieldDefinition);
    isDraggable(): boolean;
    getChildCount(): number;
    getChildAt(index: number): DataTreeItem;
}
