import * as Adaptive from "adaptivecards";
export interface IPoint {
    x: number;
    y: number;
}
export declare class Rect {
    top: number;
    right: number;
    bottom: number;
    left: number;
    constructor(top?: number, right?: number, bottom?: number, left?: number);
    union(otherRect: Rect): void;
    isInside(point: IPoint): boolean;
    get width(): number;
    get height(): number;
}
export declare class Utils {
    static isAbsoluteUrl(urlString: string): boolean;
    static joinPaths(...args: string[]): string;
}
export declare var defaultHostConfig: Adaptive.HostConfig;
