/// <reference types="node" />
import { EventEmitter } from 'events';
import { IUniverseDriver } from '../models/IUniverseDriver';
export interface NullDriverArgs {
    dmxSpeed?: number;
}
export declare class NullDriver extends EventEmitter implements IUniverseDriver {
    constructor(options?: NullDriverArgs);
    init(): Promise<void>;
    close(): void;
    update(u: {
        [key: number]: number;
    }, extraData: any): void;
    updateAll(v: number): void;
    get(c: number): number;
    logUniverse(): void;
    private start;
    private stop;
    private readonly _universe;
    private readonly _interval;
    private _timeout;
}
