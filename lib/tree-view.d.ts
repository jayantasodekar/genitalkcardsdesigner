import { BaseTreeItem } from "./base-tree-item";
export declare class TreeView {
    readonly rootItem: BaseTreeItem;
    private _selectedItem;
    private setupTreeItemEvents;
    protected selectedItemChanged(): void;
    render(): HTMLElement;
    onSelectedItemChanged: (sender: TreeView) => void;
    constructor(rootItem: BaseTreeItem);
    get selectedItem(): BaseTreeItem;
    set selectedItem(value: BaseTreeItem);
}
