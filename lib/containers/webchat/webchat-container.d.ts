import * as GenietalkCards from "genietalkcards";
import { HostContainer } from "../host-container";
export declare class WebChatContainer extends HostContainer {
    renderTo(hostElement: HTMLElement): void;
    getHostConfig(): GenietalkCards.HostConfig;
    get targetVersion(): GenietalkCards.Version;
}
