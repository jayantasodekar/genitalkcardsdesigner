import * as GenietalkCards from "genietalkcards";
import { HostContainer } from "../host-container";
declare abstract class BaseCortanaContainer extends HostContainer {
    renderTo(hostElement: HTMLElement): void;
    get targetVersion(): GenietalkCards.Version;
}
export declare class LightCortanaContainer extends BaseCortanaContainer {
    getHostConfig(): GenietalkCards.HostConfig;
}
export declare class DarkCortanaContainer extends BaseCortanaContainer {
    getBackgroundColor(): string;
    getHostConfig(): GenietalkCards.HostConfig;
}
export {};
