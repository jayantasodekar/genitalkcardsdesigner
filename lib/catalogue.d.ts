export declare class CatalogueEntry {
    readonly displayName: string;
    readonly cardPayloadUrl: string;
    static createEmptyCardEntry(): CatalogueEntry;
    private _cardPayload;
    private _cardPayloadDownloaded;
    private _sampleData;
    private _sampleDataDownloaded;
    private downloadCompleted;
    sampleDataUrl?: string;
    onDownloaded: (sender: CatalogueEntry) => void;
    constructor(displayName: string, cardPayloadUrl: string, sampleDataUrl?: string);
    download(): void;
    get cardPayloadDownloaded(): boolean;
    get cardPayload(): string;
    get sampleDataDownloaded(): boolean;
    get sampleData(): string;
}
export declare class SampleCatalogue {
    private _entries;
    private _isDownloaded;
    private _url;
    private downloaded;
    private parse;
    onDownloaded: (sender: SampleCatalogue) => void;
    constructor(url?: string);
    download(): void;
    get isDownloaded(): boolean;
    get entries(): CatalogueEntry[];
    get url(): string;
    set url(value: string);
}
