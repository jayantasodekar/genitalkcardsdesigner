import * as Adaptive from "adaptivecards";
import { HostContainer } from "../host-container";
declare abstract class BaseTeamsContainer extends HostContainer {
    renderTo(hostElement: HTMLElement): void;
    get targetVersion(): Adaptive.Version;
}
export declare class LightTeamsContainer extends BaseTeamsContainer {
    getHostConfig(): Adaptive.HostConfig;
}
export declare class DarkTeamsContainer extends BaseTeamsContainer {
    getBackgroundColor(): string;
    getHostConfig(): Adaptive.HostConfig;
}
export {};
