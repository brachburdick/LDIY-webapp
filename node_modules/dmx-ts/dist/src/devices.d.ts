export interface Device {
    channels: string[] | number[];
    ranges?: any;
    channelgroups?: string[];
}
export declare type Devices = {
    [key: string]: Device;
};
export declare const PredefinedDevices: Devices;
