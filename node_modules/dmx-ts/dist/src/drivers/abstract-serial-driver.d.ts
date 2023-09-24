/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from 'events';
import { SerialPort, SerialPortOpenOptions } from 'serialport';
import { AutoDetectTypes } from '@serialport/bindings-cpp';
import { IUniverseDriver, UniverseData } from '../models/IUniverseDriver';
declare type OpenOptions = Omit<SerialPortOpenOptions<AutoDetectTypes>, 'path'>;
export interface AbstractSerialDriverArgs {
    serialPortOptions: OpenOptions;
    sendInterval: number;
}
export declare abstract class AbstractSerialDriver extends EventEmitter implements IUniverseDriver {
    private _serialPort;
    private readonly _universe;
    private readonly _sendInterval;
    private readonly _serialPortName;
    private readonly _serialPortOptions;
    private _intervalHandle;
    protected constructor(serialPort: string, args: AbstractSerialDriverArgs);
    init(): Promise<void>;
    close(): Promise<void>;
    protected get serialPort(): SerialPort;
    protected get universeBuffer(): Buffer;
    protected start(): void;
    protected stop(): void;
    protected abstract sendUniverse(): Promise<void>;
    get(channel: number): number;
    update(channels: UniverseData, extraData?: any): void;
    updateAll(value: number): void;
}
export {};
