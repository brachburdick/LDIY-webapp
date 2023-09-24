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
exports.EnttecUSBDMXProDriver = void 0;
const abstract_serial_driver_1 = require("./abstract-serial-driver");
const ENTTEC_PRO_DMX_STARTCODE = 0x00;
const ENTTEC_PRO_START_OF_MSG = 0x7e;
const ENTTEC_PRO_END_OF_MSG = 0xe7;
const ENTTEC_PRO_SEND_DMX_RQ = 0x06;
class EnttecUSBDMXProDriver extends abstract_serial_driver_1.AbstractSerialDriver {
    constructor(serialPort, options = {}) {
        super(serialPort, {
            serialPortOptions: {
                'baudRate': 250000,
                'dataBits': 8,
                'stopBits': 2,
                'parity': 'none',
            },
            sendInterval: 1000 / (options.dmxSpeed || 40),
        });
        this._readyToWrite = true;
    }
    sendUniverse() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.serialPort.writable) {
                return;
            }
            if (this._readyToWrite) {
                const hdr = Buffer.from([
                    ENTTEC_PRO_START_OF_MSG,
                    ENTTEC_PRO_SEND_DMX_RQ,
                    (this.universeBuffer.length) & 0xff,
                    ((this.universeBuffer.length) >> 8) & 0xff,
                    ENTTEC_PRO_DMX_STARTCODE,
                ]);
                const msg = Buffer.concat([
                    hdr,
                    this.universeBuffer.slice(1),
                    Buffer.from([ENTTEC_PRO_END_OF_MSG]),
                ]);
                this._readyToWrite = false;
                this.serialPort.write(msg);
                this.serialPort.drain(() => {
                    this._readyToWrite = true;
                });
            }
        });
    }
}
exports.EnttecUSBDMXProDriver = EnttecUSBDMXProDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50dGVjLXVzYi1kbXgtcHJvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RyaXZlcnMvZW50dGVjLXVzYi1kbXgtcHJvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFFQUE4RDtBQUU5RCxNQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQztBQUN0QyxNQUFNLHVCQUF1QixHQUFHLElBQUksQ0FBQztBQUNyQyxNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQztBQUNuQyxNQUFNLHNCQUFzQixHQUFHLElBQUksQ0FBQztBQVFwQyxNQUFhLHFCQUFzQixTQUFRLDZDQUFvQjtJQUc3RCxZQUFZLFVBQWtCLEVBQUUsVUFBK0IsRUFBRTtRQUMvRCxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQ2hCLGlCQUFpQixFQUFFO2dCQUNqQixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsVUFBVSxFQUFFLENBQUM7Z0JBQ2IsVUFBVSxFQUFFLENBQUM7Z0JBQ2IsUUFBUSxFQUFFLE1BQU07YUFDakI7WUFDRCxZQUFZLEVBQUUsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7U0FDOUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVLLFlBQVk7O1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQkFDN0IsT0FBTzthQUNSO1lBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN0QixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUN0Qix1QkFBdUI7b0JBQ3ZCLHNCQUFzQjtvQkFDdEIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUk7b0JBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUk7b0JBQzFDLHdCQUF3QjtpQkFDekIsQ0FBQyxDQUFDO2dCQUVILE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQ3hCLEdBQUc7b0JBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQztpQkFDckMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO29CQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FBQTtDQUNGO0FBNUNELHNEQTRDQyJ9