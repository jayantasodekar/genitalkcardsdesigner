import * as Adaptive from "adaptivecards";
import { HostContainer } from "../host-container";
export declare class ToastContainer extends HostContainer {
    renderTo(hostElement: HTMLElement): void;
    getHostConfig(): Adaptive.HostConfig;
}
