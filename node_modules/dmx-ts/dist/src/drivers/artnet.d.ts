/// <reference types="node" />
import { EventEmitter } from 'events';
import { IUniverseDriver, UniverseData } from '../models/IUniverseDriver';
import dmxlib from 'dmxnet';
export interface ArtnetArgs {
    unchangedDataInterval?: number;
    universe?: number;
    port?: number;
    net?: number;
    subnet?: number;
    subuni?: number;
    dmxlibOptions?: dmxlib.DmxnetOptions;
}
export declare class ArtnetDriver extends EventEmitter implements IUniverseDriver {
    options: ArtnetArgs;
    host: string;
    dmxnet: dmxlib.dmxnet;
    universe?: dmxlib.sender;
    constructor(host?: string, options?: ArtnetArgs);
    init(): Promise<void>;
    sendUniverse(): void;
    close(): Promise<void>;
    update(u: UniverseData, extraData?: any): void;
    updateAll(v: number): void;
    get(c: number): number;
    private stop;
}
