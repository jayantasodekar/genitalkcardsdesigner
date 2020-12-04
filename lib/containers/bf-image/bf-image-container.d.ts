import * as Adaptive from "adaptivecards";
import { HostContainer } from "../host-container";
export declare class BotFrameworkContainer extends HostContainer {
    renderTo(hostElement: HTMLElement): void;
    getHostConfig(): Adaptive.HostConfig;
}
