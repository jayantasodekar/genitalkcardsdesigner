import * as Adaptive from "adaptivecards";
import { HostContainer } from "../host-container";
export declare class WebChatContainer extends HostContainer {
    renderTo(hostElement: HTMLElement): void;
    getHostConfig(): Adaptive.HostConfig;
    get targetVersion(): Adaptive.Version;
}
