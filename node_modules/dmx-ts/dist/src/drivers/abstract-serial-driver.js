"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSerialDriver = void 0;
const events_1 = require("events");
const serialport_1 = require("serialport");
class AbstractSerialDriver extends events_1.EventEmitter {
    constructor(serialPort, args) {
        super();
        this._intervalHandle = undefined;
        this._sendInterval = args.sendInterval;
        this._serialPortName = serialPort;
        this._serialPortOptions = args.serialPortOptions;
        this._universe = Buffer.alloc(513);
    }
    init() {
        return new Promise((resolve, reject) => {
            this._serialPort = new serialport_1.SerialPort(Object.assign(Object.assign({}, this._serialPortOptions), { path: this._serialPortName }), (err) => {
                if (!err) {
                    this.start();
                    resolve();
                }
                else {
                    reject(err);
                }
            });
        });
    }
    close() {
        this.stop();
        return new Promise((resolve, reject) => this._serialPort.close((err) => err ? reject(err) : resolve()));
    }
    get serialPort() {
        return this._serialPort;
    }
    get universeBuffer() {
        return this._universe;
    }
    start() {
        if (this._intervalHandle !== undefined) {
            throw new Error('Driver is already running.');
        }
        this._intervalHandle = setInterval(this.sendUniverse.bind(this), this._sendInterval);
    }
    stop() {
        if (this._intervalHandle !== undefined) {
            clearInterval(this._intervalHandle);
            this._intervalHandle = undefined;
        }
    }
    get(channel) {
        return this._universe[channel];
    }
    update(channels, extraData) {
        for (const c in channels) {
            this._universe[c] = channels[c];
        }
        this.emit('update', channels, extraData);
    }
    updateAll(value) {
        for (let i = 1; i <= 512; i++) {
            this._universe[i] = value;
        }
    }
}
exports.AbstractSerialDriver = AbstractSerialDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3Qtc2VyaWFsLWRyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kcml2ZXJzL2Fic3RyYWN0LXNlcmlhbC1kcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW9DO0FBQ3BDLDJDQUE2RDtBQVc3RCxNQUFzQixvQkFBcUIsU0FBUSxxQkFBWTtJQVM3RCxZQUFzQixVQUFrQixFQUFFLElBQThCO1FBQ3RFLEtBQUssRUFBRSxDQUFDO1FBSEYsb0JBQWUsR0FBb0IsU0FBUyxDQUFDO1FBSW5ELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN2QyxJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQztRQUNsQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBRWpELElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSTtRQUNGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHVCQUFVLGlDQUM1QixJQUFJLENBQUMsa0JBQWtCLEtBQzFCLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxLQUN6QixDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNULElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNiLE9BQU8sRUFBRSxDQUFDO2lCQUNYO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDYjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRyxDQUFDO0lBRUQsSUFBYyxVQUFVO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBYyxjQUFjO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRVMsS0FBSztRQUNiLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUU7WUFDdEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFUyxJQUFJO1FBQ1osSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBRTtZQUN0QyxhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUlELEdBQUcsQ0FBQyxPQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQXNCLEVBQUUsU0FBZTtRQUU1QyxLQUFLLE1BQU0sQ0FBQyxJQUFJLFFBQVEsRUFBRTtZQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQWE7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMzQjtJQUNILENBQUM7Q0FFRjtBQWxGRCxvREFrRkMifQ==