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
exports.ArtnetDriver = void 0;
const events_1 = require("events");
const dmxnet_1 = __importDefault(require("dmxnet"));
class ArtnetDriver extends events_1.EventEmitter {
    constructor(host = '127.0.0.1', options = {}) {
        super();
        this.options = options;
        this.host = host;
        // eslint-disable-next-line new-cap
        this.dmxnet = new dmxnet_1.default.dmxnet(options.dmxlibOptions);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.universe = this.dmxnet.newSender({
                ip: this.host,
                // eslint-disable-next-line camelcase
                base_refresh_interval: this.options.unchangedDataInterval,
                net: this.options.net,
                port: this.options.port,
                subnet: this.options.subnet,
                subuni: this.options.subuni,
                universe: this.options.universe,
            });
        });
    }
    sendUniverse() {
        var _a;
        (_a = this.universe) === null || _a === void 0 ? void 0 : _a.transmit();
    }
    close() {
        return new Promise((resolve) => {
            this.stop();
            resolve();
        });
    }
    update(u, extraData) {
        var _a;
        for (const c in u) {
            (_a = this.universe) === null || _a === void 0 ? void 0 : _a.prepChannel(Number(c), u[c]);
        }
        this.sendUniverse();
        this.emit('update', u, extraData);
    }
    updateAll(v) {
        var _a;
        (_a = this.universe) === null || _a === void 0 ? void 0 : _a.fillChannels(0, 511, v);
        this.sendUniverse();
    }
    get(c) {
        var _a, _b;
        return (_b = (_a = this.universe) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b[c];
    }
    stop() {
        var _a;
        (_a = this.universe) === null || _a === void 0 ? void 0 : _a.stop();
    }
}
exports.ArtnetDriver = ArtnetDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0bmV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RyaXZlcnMvYXJ0bmV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFvQztBQUVwQyxvREFBNEI7QUFZNUIsTUFBYSxZQUFhLFNBQVEscUJBQVk7SUFNNUMsWUFBWSxJQUFJLEdBQUcsV0FBVyxFQUFFLFVBQXNCLEVBQUU7UUFDdEQsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUssSUFBSTs7WUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUNwQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2IscUNBQXFDO2dCQUNyQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQjtnQkFDekQsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztnQkFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtnQkFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtnQkFDM0IsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtnQkFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTthQUNoQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRCxZQUFZOztRQUNWLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsUUFBUSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELEtBQUs7UUFDSCxPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsQ0FBZSxFQUFFLFNBQWU7O1FBQ3JDLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pCLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELFNBQVMsQ0FBQyxDQUFTOztRQUNqQixNQUFBLElBQUksQ0FBQyxRQUFRLDBDQUFFLFlBQVksQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsR0FBRyxDQUFDLENBQVM7O1FBQ1gsT0FBTyxNQUFBLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsTUFBTSwwQ0FBRyxDQUFDLENBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU8sSUFBSTs7UUFDVixNQUFBLElBQUksQ0FBQyxRQUFRLDBDQUFFLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRjtBQTVERCxvQ0E0REMifQ==