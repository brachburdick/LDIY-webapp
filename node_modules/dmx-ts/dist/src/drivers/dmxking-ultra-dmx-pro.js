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
exports.DMXKingUltraDMXProDriver = void 0;
const abstract_serial_driver_1 = require("./abstract-serial-driver");
const DMXKING_ULTRA_DMX_PRO_DMX_STARTCODE = 0x00;
const DMXKING_ULTRA_DMX_PRO_START_OF_MSG = 0x7e;
const DMXKING_ULTRA_DMX_PRO_END_OF_MSG = 0xe7;
const DMXKING_ULTRA_DMX_PRO_SEND_DMX_RQ = 0x06;
const DMXKING_ULTRA_DMX_PRO_SEND_DMX_A_RQ = 0x64;
const DMXKING_ULTRA_DMX_PRO_SEND_DMX_B_RQ = 0x65;
class DMXKingUltraDMXProDriver extends abstract_serial_driver_1.AbstractSerialDriver {
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
        this._options = options;
        this._readyToWrite = true;
        this._sendDMXReq = DMXKING_ULTRA_DMX_PRO_SEND_DMX_RQ;
        if (this._options.port === 'A') {
            this._sendDMXReq = DMXKING_ULTRA_DMX_PRO_SEND_DMX_A_RQ;
        }
        else if (this._options.port === 'B') {
            this._sendDMXReq = DMXKING_ULTRA_DMX_PRO_SEND_DMX_B_RQ;
        }
    }
    sendUniverse() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.serialPort.writable) {
                return;
            }
            if (this._readyToWrite) {
                this._readyToWrite = false;
                const hdr = Buffer.from([
                    DMXKING_ULTRA_DMX_PRO_START_OF_MSG,
                    this._sendDMXReq,
                    (this.universeBuffer.length) & 0xff,
                    ((this.universeBuffer.length) >> 8) & 0xff,
                    DMXKING_ULTRA_DMX_PRO_DMX_STARTCODE,
                ]);
                const msg = Buffer.concat([
                    hdr,
                    this.universeBuffer.slice(1),
                    Buffer.from([DMXKING_ULTRA_DMX_PRO_END_OF_MSG]),
                ]);
                this.serialPort.write(msg);
                this.serialPort.drain(() => {
                    this._readyToWrite = true;
                });
            }
        });
    }
}
exports.DMXKingUltraDMXProDriver = DMXKingUltraDMXProDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG14a2luZy11bHRyYS1kbXgtcHJvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RyaXZlcnMvZG14a2luZy11bHRyYS1kbXgtcHJvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFFQUE4RDtBQUU5RCxNQUFNLG1DQUFtQyxHQUFHLElBQUksQ0FBQztBQUNqRCxNQUFNLGtDQUFrQyxHQUFHLElBQUksQ0FBQztBQUNoRCxNQUFNLGdDQUFnQyxHQUFHLElBQUksQ0FBQztBQUM5QyxNQUFNLGlDQUFpQyxHQUFHLElBQUksQ0FBQztBQUMvQyxNQUFNLG1DQUFtQyxHQUFHLElBQUksQ0FBQztBQUNqRCxNQUFNLG1DQUFtQyxHQUFHLElBQUksQ0FBQztBQVNqRCxNQUFhLHdCQUF5QixTQUFRLDZDQUFvQjtJQUtoRSxZQUFZLFVBQWtCLEVBQUUsVUFBd0MsRUFBRTtRQUN4RSxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQ2hCLGlCQUFpQixFQUFFO2dCQUNqQixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsVUFBVSxFQUFFLENBQUM7Z0JBQ2IsVUFBVSxFQUFFLENBQUM7Z0JBQ2IsUUFBUSxFQUFFLE1BQU07YUFDakI7WUFDRCxZQUFZLEVBQUUsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7U0FDOUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFFMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQ0FBaUMsQ0FBQztRQUNyRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRTtZQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLG1DQUFtQyxDQUFDO1NBQ3hEO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUU7WUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxtQ0FBbUMsQ0FBQztTQUN4RDtJQUVILENBQUM7SUFFSyxZQUFZOztZQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdCLE9BQU87YUFDUjtZQUVELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBRTNCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ3RCLGtDQUFrQztvQkFDbEMsSUFBSSxDQUFDLFdBQVc7b0JBQ2hCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJO29CQUNuQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJO29CQUMxQyxtQ0FBbUM7aUJBQ3BDLENBQUMsQ0FBQztnQkFFSCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUN4QixHQUFHO29CQUNILElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7aUJBQ2hELENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO29CQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FBQTtDQUNGO0FBdkRELDREQXVEQyJ9