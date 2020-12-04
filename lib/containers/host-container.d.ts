import { CardObjectRegistry, CardElement, Action, HostConfig, SerializationContext, Version } from "adaptivecards";
export declare abstract class HostContainer {
    private _cardHost;
    private _elementsRegistry;
    private _actionsRegistry;
    readonly name: string;
    readonly styleSheet: string;
    constructor(name: string, styleSheet: string);
    abstract renderTo(hostElement: HTMLElement): any;
    initialize(): void;
    createSerializationContext(targetVersion: Version): SerializationContext;
    getBackgroundColor(): string;
    parseElement(element: CardElement, source: any, context: SerializationContext): void;
    anchorClicked(element: CardElement, anchor: HTMLAnchorElement): boolean;
    getHostConfig(): HostConfig;
    supportsActionBar: boolean;
    get cardHost(): HTMLElement;
    get isFixedHeight(): boolean;
    get elementsRegistry(): CardObjectRegistry<CardElement>;
    get actionsRegistry(): CardObjectRegistry<Action>;
    get targetVersion(): Version;
}
