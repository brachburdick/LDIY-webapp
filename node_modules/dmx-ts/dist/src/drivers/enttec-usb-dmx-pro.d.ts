import { AbstractSerialDriver } from './abstract-serial-driver';
export interface EnttecUSBDMXProArgs {
    dmxSpeed?: number;
}
export declare class EnttecUSBDMXProDriver extends AbstractSerialDriver {
    private _readyToWrite;
    constructor(serialPort: string, options?: EnttecUSBDMXProArgs);
    sendUniverse(): Promise<void>;
}
