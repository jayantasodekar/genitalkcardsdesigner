export declare class Downloader {
    readonly url: string;
    private _data;
    private error;
    private success;
    onError: (sender: Downloader) => void;
    onSuccess: (sender: Downloader) => void;
    constructor(url: string);
    download(): void;
    get data(): string;
}
