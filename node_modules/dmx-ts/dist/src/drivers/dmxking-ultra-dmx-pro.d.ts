import { AbstractSerialDriver } from './abstract-serial-driver';
export interface DMXKingUltraDMXProDriverArgs {
    dmxSpeed?: number;
    port?: 'A' | 'B';
}
export declare class DMXKingUltraDMXProDriver extends AbstractSerialDriver {
    private readonly _options;
    private readonly _sendDMXReq;
    private _readyToWrite;
    constructor(serialPort: string, options?: DMXKingUltraDMXProDriverArgs);
    sendUniverse(): Promise<void>;
}
