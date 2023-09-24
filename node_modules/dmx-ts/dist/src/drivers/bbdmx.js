"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BBDMXDriver = void 0;
const events_1 = require("events");
const dgram_1 = __importDefault(require("dgram"));
const UNIVERSE_LEN = 512;
class BBDMXDriver extends events_1.EventEmitter {
    constructor(deviceId = '127.0.0.1', options = {}) {
        super();
        this.readyToWrite = true;
        this.interval = options.dmxSpeed ? (1000 / options.dmxSpeed) : 24;
        this.options = options;
        this.universe = Buffer.alloc(UNIVERSE_LEN + 1);
        this.host = deviceId;
        this.port = options.port || 9930;
        this.dev = dgram_1.default.createSocket('udp4');
        this.start();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.start();
        });
    }
    sendUniverse() {
        if (this.readyToWrite) {
            this.readyToWrite = false;
            let channel;
            let messageBuffer = Buffer.from(UNIVERSE_LEN.toString());
            for (let i = 1; i <= UNIVERSE_LEN; i++) {
                channel = Buffer.from(' ' + this.universe[i]);
                messageBuffer = Buffer.concat([messageBuffer, channel]);
            }
            this.dev.send(messageBuffer, 0, messageBuffer.length, this.port, this.host, () => {
                this.readyToWrite = true;
            });
        }
    }
    close() {
        this.stop();
        this.dev.close();
    }
    update(u, extraData) {
        for (const c in u) {
            this.universe[c] = u[c];
        }
        this.emit('update', u, extraData);
    }
    updateAll(v) {
        for (let i = 1; i <= UNIVERSE_LEN; i++) {
            this.universe[i] = v;
        }
    }
    get(c) {
        return this.universe[c];
    }
    start() {
        this.timeout = setInterval(this.sendUniverse.bind(this), this.interval);
    }
    stop() {
        if (this.timeout)
            clearInterval(this.timeout);
    }
}
exports.BBDMXDriver = BBDMXDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJkbXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZHJpdmVycy9iYmRteC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBb0M7QUFFcEMsa0RBQTBCO0FBRTFCLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztBQU96QixNQUFhLFdBQVksU0FBUSxxQkFBWTtJQVUzQyxZQUFZLFFBQVEsR0FBRyxXQUFXLEVBQUUsVUFBcUIsRUFBRTtRQUN6RCxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDbEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsZUFBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUssSUFBSTs7WUFDUixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDO0tBQUE7SUFFRCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBRTFCLElBQUksT0FBTyxDQUFDO1lBQ1osSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUV6RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ3pEO1lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQy9FLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxDQUFlLEVBQUUsU0FBZTtRQUNyQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6QjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsU0FBUyxDQUFDLENBQVM7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFFRCxHQUFHLENBQUMsQ0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU8sS0FBSztRQUNYLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRU8sSUFBSTtRQUNWLElBQUksSUFBSSxDQUFDLE9BQU87WUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDRjtBQTFFRCxrQ0EwRUMifQ==