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
const Animation_1 = require("../Animation");
const null_1 = require("../drivers/null");
const __1 = require("../");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const dmx = new __1.DMX();
    // var universe = dmx.addUniverse('demo', 'enttec-usb-dmx-pro', '/dev/cu.usbserial-6AVNHXS8')
    // var universe = dmx.addUniverse('demo', 'enttec-open-usb-dmx', '/dev/cu.usbserial-6AVNHXS8')
    // const universe = dmx.addUniverse('demo', 'socketio', null, {port: 17809, debug: true});
    const universe = yield dmx.addUniverse('demo', new null_1.NullDriver());
    universe.update({ 1: 1, 2: 0 });
    universe.update({ 16: 1, 17: 255 });
    universe.update({ 1: 255, 3: 120, 4: 230, 5: 30, 6: 110, 7: 255, 8: 10, 9: 255, 10: 255, 11: 0 });
    function greenWater(universe, channels, duration) {
        const colors = [
            [160, 230, 20],
            [255, 255, 0],
            [110, 255, 10],
        ];
        for (const c in channels) {
            const r = Math.floor((Math.random() * colors.length));
            const u = {};
            for (let i = 0; i < 3; i++) {
                u[channels[c] + i] = colors[r][i];
            }
            new Animation_1.Animation().add(u, duration).run(universe);
        }
        setTimeout(() => greenWater(universe, channels, duration), duration * 2);
    }
    function warp(universe, channel, min, max, duration) {
        const a = {};
        const b = {};
        a[channel] = min;
        b[channel] = max;
        new Animation_1.Animation().add(a, duration).add(b, duration).run(universe, function () {
            warp(universe, channel, min, max, duration);
        });
    }
    warp(universe, 1, 200, 220, 360);
    warp(universe, 1 + 15, 200, 255, 240);
    greenWater(universe, [3, 6, 9], 4000);
    greenWater(universe, [3 + 15, 6 + 15, 9 + 15], 4000);
});
run()
    .catch((err) => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZW1vL2RlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBdUM7QUFDdkMsMENBQTJDO0FBQzNDLDJCQUF3QjtBQUd4QixNQUFNLEdBQUcsR0FBRyxHQUFTLEVBQUU7SUFFckIsTUFBTSxHQUFHLEdBQUcsSUFBSSxPQUFHLEVBQUUsQ0FBQztJQUV0Qiw2RkFBNkY7SUFDN0YsOEZBQThGO0lBQzlGLDBGQUEwRjtJQUMxRixNQUFNLFFBQVEsR0FBRyxNQUFNLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksaUJBQVUsRUFBRSxDQUFDLENBQUM7SUFFakUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDOUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7SUFDbEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBRWhHLFNBQVMsVUFBVSxDQUFDLFFBQXlCLEVBQUUsUUFBc0IsRUFBRSxRQUFnQjtRQUNyRixNQUFNLE1BQU0sR0FBRztZQUNiLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFDZCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztTQUNmLENBQUM7UUFFRixLQUFLLE1BQU0sQ0FBQyxJQUFJLFFBQVEsRUFBRTtZQUN4QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxHQUFpQixFQUFFLENBQUM7WUFFM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkM7WUFDRCxJQUFJLHFCQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNoRDtRQUNELFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELFNBQVMsSUFBSSxDQUFDLFFBQXlCLEVBQUUsT0FBZSxFQUFFLEdBQVcsRUFBRSxHQUFXLEVBQUUsUUFBZ0I7UUFDbEcsTUFBTSxDQUFDLEdBQWlCLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsR0FBaUIsRUFBRSxDQUFDO1FBRTNCLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDakIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLHFCQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUM5RCxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFdkQsQ0FBQyxDQUFBLENBQUM7QUFFRixHQUFHLEVBQUU7S0FDRixLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyJ9