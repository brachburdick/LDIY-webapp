import { AbstractSerialDriver } from './abstract-serial-driver';
export interface DMX4AllArgs {
    dmxSpeed?: number;
}
export declare class DMX4AllDriver extends AbstractSerialDriver {
    private readyToWrite;
    constructor(serialPort: string, options?: DMX4AllArgs);
    sendUniverse(): Promise<void>;
}
