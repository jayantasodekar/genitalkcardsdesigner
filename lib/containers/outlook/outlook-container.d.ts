import * as GenietalkCards from "genietalkcards";
import { HostContainer } from "../host-container";
export declare class OutlookContainer extends HostContainer {
    constructor(name: string, styleSheet: string);
    renderTo(hostElement: HTMLElement): void;
    initialize(): void;
    private parsePadding;
    parseElement(element: GenietalkCards.CardElement, source: any, context: GenietalkCards.SerializationContext): void;
    anchorClicked(element: GenietalkCards.CardElement, anchor: HTMLAnchorElement): boolean;
    getHostConfig(): GenietalkCards.HostConfig;
}
