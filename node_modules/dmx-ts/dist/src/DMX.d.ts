/// <reference types="node" />
import { EventEmitter } from 'events';
import { IUniverseDriver } from './models/IUniverseDriver';
export interface DmxArgs {
    devices?: any;
}
export declare class DMX extends EventEmitter {
    private readonly _devices;
    private readonly _universesByName;
    constructor(options?: DmxArgs);
    addUniverse(name: string, universe: IUniverseDriver): Promise<IUniverseDriver>;
    update(universeName: string, channels: {
        [key: number]: number;
    }, extraData?: any): void;
    updateAll(universe: string, value: number): void;
    universeToObject(universeKey: string): {
        [key: number]: number;
    };
    close(): Promise<void>;
}
