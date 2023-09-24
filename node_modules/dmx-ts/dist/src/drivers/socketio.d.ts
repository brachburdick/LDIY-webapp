/// <reference types="node" />
/// <reference types="node" />
import { IUniverseDriver, UniverseData } from '../models/IUniverseDriver';
import { Server } from 'socket.io';
import { EventEmitter } from 'events';
export interface SocketIOArgs {
    port?: number;
    debug?: boolean;
}
export declare class SocketIODriver extends EventEmitter implements IUniverseDriver {
    universe: Buffer;
    server: Server;
    constructor(options: SocketIOArgs);
    init(): Promise<void>;
    close(): void;
    update(u: UniverseData, extraData: any): void;
    updateAll(v: number): void;
    get(c: number): number;
}
