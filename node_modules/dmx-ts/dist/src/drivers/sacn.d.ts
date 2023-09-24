/// <reference types="node" />
import { EventEmitter } from 'events';
import { IUniverseDriver, UniverseData } from '../models/IUniverseDriver';
export declare class SACNDriver extends EventEmitter implements IUniverseDriver {
    sACNServer: any;
    universe: any;
    constructor(universe?: number);
    init(): Promise<void>;
    close(): void;
    update(u: UniverseData, extraData: any): void;
    sendUniverse(): void;
    updateAll(v: number): void;
    get(c: number): number;
    static dmxToPercent(v: number): number;
    static percentToDmx(v: number): number;
}
