import * as Adaptive from "genietalkcards";
import { HostContainer } from "../host-container";
export declare class TimelineContainer extends HostContainer {
    initialize(): void;
    renderTo(hostElement: HTMLElement): void;
    getHostConfig(): Adaptive.HostConfig;
    get isFixedHeight(): boolean;
}
