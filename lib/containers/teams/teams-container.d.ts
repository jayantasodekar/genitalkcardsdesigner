import * as GenietalkCards from "genietalkcards";
import { HostContainer } from "../host-container";
declare abstract class BaseTeamsContainer extends HostContainer {
    renderTo(hostElement: HTMLElement): void;
    get targetVersion(): GenietalkCards.Version;
}
export declare class LightTeamsContainer extends BaseTeamsContainer {
    getHostConfig(): GenietalkCards.HostConfig;
}
export declare class DarkTeamsContainer extends BaseTeamsContainer {
    getBackgroundColor(): string;
    getHostConfig(): GenietalkCards.HostConfig;
}
export {};
