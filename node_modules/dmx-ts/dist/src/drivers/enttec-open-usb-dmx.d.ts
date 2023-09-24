import { AbstractSerialDriver } from './abstract-serial-driver';
export interface EnttecOpenUsbDmxArgs {
    dmxSpeed?: number;
}
/**
 * Controls the Enttec Open DMX device:
 * https://www.enttec.com.au/product/lighting-communication-protocols/usb-lighting-interface/open-dmx-usb/
 *
 * The controller uses a FTDI FT232RL chip for serial communication. See
 * [here](http://www.ftdichip.com/Support/Documents/ProgramGuides/D2XX_Programmer's_Guide(FT_000071).pdf)
 * for an API reference and to translate the Enttec code examples to Node.js/Serialport.
 */
export declare class EnttecOpenUSBDMXDriver extends AbstractSerialDriver {
    private _readyToWrite;
    constructor(serialPort: string, args?: EnttecOpenUsbDmxArgs);
    sendUniverse(): Promise<void>;
}
