import { SampleCatalogue, CatalogueEntry } from "./catalogue";
import { Dialog } from "./dialog";
export declare class OpenSampleDialog extends Dialog {
    readonly catalogue: SampleCatalogue;
    private _renderedElement;
    private _selectedSample;
    private setContent;
    private renderMessage;
    private renderCatalogue;
    protected renderContent(): HTMLElement;
    constructor(catalogue: SampleCatalogue);
    get selectedSample(): CatalogueEntry;
}
