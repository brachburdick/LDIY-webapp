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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullDriver = void 0;
const events_1 = require("events");
class NullDriver extends events_1.EventEmitter {
    constructor(options = {}) {
        var _a;
        super();
        this._universe = Buffer.alloc(513, 0);
        this._interval = 1000 / ((_a = options === null || options === void 0 ? void 0 : options.dmxSpeed) !== null && _a !== void 0 ? _a : 1);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.start();
        });
    }
    close() {
        this.stop();
    }
    update(u, extraData) {
        for (const c in u) {
            this._universe[c] = u[c];
        }
        this.logUniverse();
        this.emit('update', u, extraData);
    }
    updateAll(v) {
        for (let i = 1; i <= 512; i++) {
            this._universe[i] = v;
        }
    }
    get(c) {
        return this._universe[c];
    }
    logUniverse() {
        console.log(this._universe.slice(1));
    }
    start() {
        this._timeout = setInterval(() => {
            this.logUniverse();
        }, this._interval);
    }
    stop() {
        clearInterval(this._timeout);
    }
}
exports.NullDriver = NullDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kcml2ZXJzL251bGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW9DO0FBT3BDLE1BQWEsVUFBVyxTQUFRLHFCQUFZO0lBQzFDLFlBQVksVUFBMEIsRUFBRTs7UUFDdEMsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSxtQ0FBSSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUssSUFBSTs7WUFDUixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDO0tBQUE7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU0sQ0FBQyxDQUEwQixFQUFFLFNBQWM7UUFDL0MsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxTQUFTLENBQUMsQ0FBUztRQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVELEdBQUcsQ0FBQyxDQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxLQUFLO1FBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQy9CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFTyxJQUFJO1FBQ1YsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBS0Y7QUFwREQsZ0NBb0RDIn0=