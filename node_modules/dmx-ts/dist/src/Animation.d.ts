import { IUniverseDriver } from './models/IUniverseDriver';
export interface AnimationArgs {
    loop?: number;
    filter?: any;
}
export declare class Animation {
    loops: number;
    frameDelay: number;
    animations: any[];
    lastAnimation: number;
    timeout: any;
    duration: number;
    startTime: any;
    currentLoop: number;
    filter: any;
    constructor(args?: AnimationArgs);
    add(to: any, duration?: number, options?: any): this;
    delay(duration: number): this;
    stop(): void;
    reset(startTime?: number): void;
    runNextLoop(universe: IUniverseDriver, onFinish?: () => void): this;
    run(universe: IUniverseDriver, onFinish?: () => void): void;
    runLoop(universe: IUniverseDriver, onFinish?: () => void, loops?: number): this;
}
