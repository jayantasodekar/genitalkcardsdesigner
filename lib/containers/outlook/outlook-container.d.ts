import * as Adaptive from "adaptivecards";
import { HostContainer } from "../host-container";
export declare class OutlookContainer extends HostContainer {
    constructor(name: string, styleSheet: string);
    renderTo(hostElement: HTMLElement): void;
    initialize(): void;
    private parsePadding;
    parseElement(element: Adaptive.CardElement, source: any, context: Adaptive.SerializationContext): void;
    anchorClicked(element: Adaptive.CardElement, anchor: HTMLAnchorElement): boolean;
    getHostConfig(): Adaptive.HostConfig;
}
