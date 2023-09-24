"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SACNDriver = void 0;
const events_1 = require("events");
const sacn = __importStar(require("sacn"));
class SACNDriver extends events_1.EventEmitter {
    constructor(universe = 1) {
        super();
        this.universe = {};
        this.sACNServer = new sacn.Sender({
            universe: universe || 1,
            reuseAddr: true,
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    close() {
        this.sACNServer.close();
    }
    update(u, extraData) {
        for (const c in u) {
            this.universe[c] = SACNDriver.dmxToPercent(u[c]);
        }
        this.sendUniverse();
    }
    sendUniverse() {
        this.sACNServer.send({
            payload: this.universe,
        });
    }
    updateAll(v) {
        for (let i = 1; i <= 512; i++) {
            this.universe[i] = SACNDriver.dmxToPercent(v);
        }
        this.sendUniverse();
    }
    get(c) {
        return SACNDriver.percentToDmx(this.universe[c]);
    }
    static dmxToPercent(v) {
        return v / 255 * 100;
    }
    static percentToDmx(v) {
        return v / 100 * 255;
    }
}
exports.SACNDriver = SACNDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Fjbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kcml2ZXJzL3NhY24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBb0M7QUFFcEMsMkNBQTZCO0FBRTdCLE1BQWEsVUFBVyxTQUFRLHFCQUFZO0lBSTFDLFlBQVksUUFBUSxHQUFHLENBQUM7UUFDdEIsS0FBSyxFQUFFLENBQUM7UUFIVixhQUFRLEdBQVEsRUFBRSxDQUFDO1FBSWpCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxRQUFRLElBQUksQ0FBQztZQUN2QixTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUssSUFBSTs7UUFDVixDQUFDO0tBQUE7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLENBQWUsRUFBRSxTQUFjO1FBQ3BDLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRDtRQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN2QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLENBQVM7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0M7UUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELEdBQUcsQ0FBQyxDQUFTO1FBQ1gsT0FBTyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFTO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDdkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBUztRQUMzQixPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQWxERCxnQ0FrREMifQ==