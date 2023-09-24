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
exports.EnttecOpenUSBDMXDriver = void 0;
const time_1 = require("../util/time");
const abstract_serial_driver_1 = require("./abstract-serial-driver");
/**
 * Controls the Enttec Open DMX device:
 * https://www.enttec.com.au/product/lighting-communication-protocols/usb-lighting-interface/open-dmx-usb/
 *
 * The controller uses a FTDI FT232RL chip for serial communication. See
 * [here](http://www.ftdichip.com/Support/Documents/ProgramGuides/D2XX_Programmer's_Guide(FT_000071).pdf)
 * for an API reference and to translate the Enttec code examples to Node.js/Serialport.
 */
class EnttecOpenUSBDMXDriver extends abstract_serial_driver_1.AbstractSerialDriver {
    constructor(serialPort, args) {
        super(serialPort, {
            serialPortOptions: {
                'baudRate': 250000,
                'dataBits': 8,
                'stopBits': 2,
                'parity': 'none',
            },
            sendInterval: (args === null || args === void 0 ? void 0 : args.dmxSpeed) ? (1000 / args.dmxSpeed) : 46,
        });
        this._readyToWrite = true;
    }
    sendUniverse() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.serialPort.writable) {
                return;
            }
            // toggle break
            yield this.serialPort.set({ brk: true, rts: false });
            yield (0, time_1.wait)(1);
            yield this.serialPort.set({ brk: false, rts: false });
            yield (0, time_1.wait)(1);
            if (this._readyToWrite) {
                const dataToWrite = Buffer.concat([Buffer.from([0]), this.universeBuffer.slice(1)]);
                this._readyToWrite = false;
                this.serialPort.write(dataToWrite);
                this.serialPort.drain(() => {
                    this._readyToWrite = true;
                });
            }
        });
    }
}
exports.EnttecOpenUSBDMXDriver = EnttecOpenUSBDMXDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50dGVjLW9wZW4tdXNiLWRteC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kcml2ZXJzL2VudHRlYy1vcGVuLXVzYi1kbXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQWtDO0FBQ2xDLHFFQUE4RDtBQU05RDs7Ozs7OztHQU9HO0FBQ0gsTUFBYSxzQkFBdUIsU0FBUSw2Q0FBb0I7SUFHOUQsWUFBWSxVQUFrQixFQUFFLElBQTJCO1FBQ3pELEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDaEIsaUJBQWlCLEVBQUU7Z0JBQ2pCLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixVQUFVLEVBQUUsQ0FBQztnQkFDYixVQUFVLEVBQUUsQ0FBQztnQkFDYixRQUFRLEVBQUUsTUFBTTthQUNqQjtZQUNELFlBQVksRUFBRSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtTQUMzRCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUssWUFBWTs7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO2dCQUM3QixPQUFPO2FBQ1I7WUFFRCxlQUFlO1lBQ2YsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDbkQsTUFBTSxJQUFBLFdBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sSUFBQSxXQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RCLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXBGLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO29CQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FBQTtDQUNGO0FBckNELHdEQXFDQyJ9