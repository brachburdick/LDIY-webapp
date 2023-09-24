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
exports.DMX = void 0;
const events_1 = require("events");
const devices_1 = require("./devices");
const Events_1 = require("./models/Events");
class DMX extends events_1.EventEmitter {
    constructor(options) {
        var _a;
        super();
        this._universesByName = new Map();
        const devices = (_a = options === null || options === void 0 ? void 0 : options.devices) !== null && _a !== void 0 ? _a : {};
        this._devices = Object.assign({}, devices_1.PredefinedDevices, devices);
    }
    addUniverse(name, universe) {
        return __awaiter(this, void 0, void 0, function* () {
            yield universe.init();
            universe.on(Events_1.Events.update, (channels, extraData) => {
                this.emit(Events_1.Events.update, name, channels, extraData);
            });
            this._universesByName.set(name, universe);
            return universe;
        });
    }
    update(universeName, channels, extraData) {
        const universe = this._universesByName.get(universeName);
        if (universe === undefined) {
            throw new Error(`Universe ${universe} does not exist`);
        }
        universe.update(channels, extraData || {});
    }
    updateAll(universe, value) {
        var _a;
        (_a = this._universesByName.get(universe)) === null || _a === void 0 ? void 0 : _a.updateAll(value);
        this.emit(Events_1.Events.updateAll, universe, value);
    }
    universeToObject(universeKey) {
        const universe = this._universesByName.get(universeKey);
        const u = {};
        for (let i = 0; i < 512; i++) {
            u[i] = (universe === null || universe === void 0 ? void 0 : universe.get(i)) || 0;
        }
        return u;
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const uni of this._universesByName.values()) {
                yield uni.close();
            }
            this.removeAllListeners();
        });
    }
}
exports.DMX = DMX;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRE1YLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RNWC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBc0M7QUFDdEMsdUNBQXVEO0FBQ3ZELDRDQUF5QztBQU96QyxNQUFhLEdBQUksU0FBUSxxQkFBWTtJQUduQyxZQUFZLE9BQWlCOztRQUMzQixLQUFLLEVBQUUsQ0FBQztRQUZPLHFCQUFnQixHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRzFFLE1BQU0sT0FBTyxHQUFHLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE9BQU8sbUNBQUksRUFBRSxDQUFDO1FBRXZDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsMkJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVLLFdBQVcsQ0FBQyxJQUFZLEVBQUUsUUFBeUI7O1lBQ3ZELE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXRCLFFBQVEsQ0FBQyxFQUFFLENBQUMsZUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsRUFBRTtnQkFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUUxQyxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFFRCxNQUFNLENBQUMsWUFBb0IsRUFBRSxRQUFpQyxFQUFFLFNBQWU7UUFDN0UsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV6RCxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLFFBQVEsaUJBQWlCLENBQUMsQ0FBQztTQUN4RDtRQUNELFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsU0FBUyxDQUFDLFFBQWdCLEVBQUUsS0FBYTs7UUFDdkMsTUFBQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQywwQ0FBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFNLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsV0FBbUI7UUFDbEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsR0FBNEIsRUFBRSxDQUFDO1FBRXRDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7U0FDOUI7UUFFRCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFSyxLQUFLOztZQUNULEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNoRCxNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNuQjtZQUNELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzVCLENBQUM7S0FBQTtDQUNGO0FBckRELGtCQXFEQyJ9