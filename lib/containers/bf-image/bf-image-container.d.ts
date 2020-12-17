import * as GenietalkCards from "genietalkcards";
import { HostContainer } from "../host-container";
export declare class BotFrameworkContainer extends HostContainer {
    renderTo(hostElement: HTMLElement): void;
    getHostConfig(): GenietalkCards.HostConfig;
}
