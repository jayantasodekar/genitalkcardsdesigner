import * as Adaptive from "adaptivecards";
import { HostContainer } from "../host-container";
declare abstract class BaseCortanaContainer extends HostContainer {
    renderTo(hostElement: HTMLElement): void;
    get targetVersion(): Adaptive.Version;
}
export declare class LightCortanaContainer extends BaseCortanaContainer {
    getHostConfig(): Adaptive.HostConfig;
}
export declare class DarkCortanaContainer extends BaseCortanaContainer {
    getBackgroundColor(): string;
    getHostConfig(): Adaptive.HostConfig;
}
export {};
