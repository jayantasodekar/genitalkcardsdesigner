export interface ILoadSettingResult<T> {
    succeeded: boolean;
    value?: T;
}
export declare class SettingsManager {
    private static _isLocalStorageAvailable;
    private static determineIfStorageIsAvailable;
    static trySaveSetting(name: string, value: string): void;
    static tryLoadStringSetting(name: string): ILoadSettingResult<string>;
    static tryLoadNumberSetting(name: string): ILoadSettingResult<number>;
    static tryLoadBooleanSetting(name: string, defaultValue: boolean): ILoadSettingResult<boolean>;
    static get isLocalStorageAvailable(): boolean;
}
