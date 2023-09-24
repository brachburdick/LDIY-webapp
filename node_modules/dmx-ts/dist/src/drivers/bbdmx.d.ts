/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from 'events';
import { IUniverseDriver, UniverseData } from '../models/IUniverseDriver';
import dgram from 'dgram';
export interface BBDMXArgs {
    dmxSpeed?: number;
    port?: number;
}
export declare class BBDMXDriver extends EventEmitter implements IUniverseDriver {
    readyToWrite: boolean;
    interval: number;
    timeout?: any;
    options: {};
    universe: Buffer;
    host: string;
    port: any;
    dev: dgram.Socket;
    constructor(deviceId?: string, options?: BBDMXArgs);
    init(): Promise<void>;
    sendUniverse(): void;
    close(): void;
    update(u: UniverseData, extraData?: any): void;
    updateAll(v: number): void;
    get(c: number): number;
    private start;
    private stop;
}
