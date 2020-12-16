import * as Adaptive from "genietalkcards";
import { HostContainer } from "../host-container";
export declare class SkypeContainer extends HostContainer {
    renderTo(hostElement: HTMLElement): void;
    getHostConfig(): Adaptive.HostConfig;
}
