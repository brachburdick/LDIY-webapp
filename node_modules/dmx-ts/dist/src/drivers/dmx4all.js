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
exports.DMX4AllDriver = void 0;
const abstract_serial_driver_1 = require("./abstract-serial-driver");
const UNIVERSE_LEN = 512;
class DMX4AllDriver extends abstract_serial_driver_1.AbstractSerialDriver {
    constructor(serialPort, options = {}) {
        super(serialPort, {
            serialPortOptions: {
                'baudRate': 38400,
                'dataBits': 8,
                'stopBits': 1,
                'parity': 'none',
            },
            sendInterval: 1000 / (options.dmxSpeed || 33),
        });
        this.readyToWrite = true;
    }
    sendUniverse() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.serialPort.writable) {
                return;
            }
            if (this.readyToWrite) {
                this.readyToWrite = false;
                const msg = Buffer.alloc(UNIVERSE_LEN * 3);
                for (let i = 0; i < UNIVERSE_LEN; i++) {
                    msg[i * 3 + 0] = (i < 256) ? 0xE2 : 0xE3;
                    msg[i * 3 + 1] = i;
                    msg[i * 3 + 2] = this.universeBuffer[i + 1];
                }
                this.serialPort.write(msg);
                this.serialPort.drain(() => {
                    this.readyToWrite = true;
                });
            }
        });
    }
}
exports.DMX4AllDriver = DMX4AllDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG14NGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kcml2ZXJzL2RteDRhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUVBQThEO0FBRTlELE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztBQU16QixNQUFhLGFBQWMsU0FBUSw2Q0FBb0I7SUFHckQsWUFBWSxVQUFrQixFQUFFLFVBQXVCLEVBQUU7UUFDdkQsS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUNoQixpQkFBaUIsRUFBRTtnQkFDakIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFVBQVUsRUFBRSxDQUFDO2dCQUNiLFVBQVUsRUFBRSxDQUFDO2dCQUNiLFFBQVEsRUFBRSxNQUFNO2FBQ2pCO1lBQ0QsWUFBWSxFQUFFLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1NBQzlDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFSyxZQUFZOztZQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdCLE9BQU87YUFDUjtZQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBRTFCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUUzQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNyQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ3pDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQzdDO2dCQUVELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUF0Q0Qsc0NBc0NDIn0=