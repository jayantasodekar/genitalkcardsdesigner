import * as GenietalkCards from "genietalkcards";
import { HostContainer } from "../host-container";
export declare class TimelineContainer extends HostContainer {
    initialize(): void;
    renderTo(hostElement: HTMLElement): void;
    getHostConfig(): GenietalkCards.HostConfig;
    get isFixedHeight(): boolean;
}
