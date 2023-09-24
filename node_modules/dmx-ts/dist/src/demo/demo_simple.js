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
const null_1 = require("../drivers/null");
const index_1 = require("../index");
const dmx = new index_1.DMX();
// var universe = dmx.addUniverse('demo', 'enttec-open-usb-dmx', '/dev/cu.usbserial-6AVNHXS8')
// const universe = dmx.addUniverse('demo', 'socketio', null, {port: 17809, debug: true});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const universe = yield dmx.addUniverse('demo', new null_1.NullDriver());
    let on = false;
    setInterval(() => {
        if (on) {
            on = false;
            universe.updateAll(0);
            console.log('off');
        }
        else {
            on = true;
            universe.updateAll(250);
            console.log('on');
        }
    }, 1000);
});
run()
    .catch((err) => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtb19zaW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGVtby9kZW1vX3NpbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDBDQUEyQztBQUMzQyxvQ0FBNkI7QUFFN0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxXQUFHLEVBQUUsQ0FBQztBQUV0Qiw4RkFBOEY7QUFDOUYsMEZBQTBGO0FBQzFGLE1BQU0sR0FBRyxHQUFHLEdBQVMsRUFBRTtJQUNyQixNQUFNLFFBQVEsR0FBRyxNQUFNLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksaUJBQVUsRUFBRSxDQUFDLENBQUM7SUFFakUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBRWYsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNmLElBQUksRUFBRSxFQUFFO1lBQ04sRUFBRSxHQUFHLEtBQUssQ0FBQztZQUNYLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjthQUFNO1lBQ0wsRUFBRSxHQUFHLElBQUksQ0FBQztZQUNWLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQjtJQUNILENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNYLENBQUMsQ0FBQSxDQUFDO0FBRUYsR0FBRyxFQUFFO0tBQ0YsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMifQ==