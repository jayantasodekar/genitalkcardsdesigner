import { BaseTreeItem } from "./base-tree-item";
import { DesignerPeer } from "./designer-peers";
export declare class DesignerPeerTreeItem extends BaseTreeItem {
    private computeLevel;
    protected getIconClass(): string;
    protected getLabelText(): string;
    protected getAdditionalText(): string;
    protected selectedChanged(scrollIntoView: boolean): void;
    readonly owner: DesignerPeer;
    constructor(owner: DesignerPeer);
    getChildCount(): number;
    getChildAt(index: number): BaseTreeItem;
}
