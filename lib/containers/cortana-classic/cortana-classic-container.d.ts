import * as Adaptive from "adaptivecards";
import { HostContainer } from "../host-container";
export declare class CortanaClassicContainer extends HostContainer {
    renderTo(hostElement: HTMLElement): void;
    getHostConfig(): Adaptive.HostConfig;
}
