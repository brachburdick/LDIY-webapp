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
const src_1 = require("../src");
const null_1 = require("../src/drivers/null");
describe('Animations', () => {
    let dmx;
    let universeDriver;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        dmx = new src_1.DMX();
        universeDriver = new null_1.NullDriver();
        yield dmx.addUniverse('test', universeDriver);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield universeDriver.close();
    }));
    const ANIM_PRECISION = 50;
    test('fake timers', () => {
        const updateMock = jest.fn();
        universeDriver.update = updateMock;
        universeDriver.update({ 1: 255 });
        jest.useFakeTimers();
        new src_1.Animation().add({
            1: 255,
        }, 100).add({
            1: 0,
        }, 100).run(universeDriver);
        jest.runAllTimers();
        expect(updateMock).toHaveBeenCalledWith({ 1: 255 }, { origin: 'animation' });
        expect(updateMock).toHaveBeenCalledWith({ 1: 0 }, { origin: 'animation' });
    });
    test('real timers', done => {
        universeDriver.update = jest.fn();
        universeDriver.update({ 1: 255 });
        jest.useRealTimers();
        const startAt = Date.now();
        new src_1.Animation().add({
            1: 255,
        }, 250).add({
            1: 0,
        }, 250).run(universeDriver, () => __awaiter(void 0, void 0, void 0, function* () {
            yield universeDriver.close();
            const timeTook = Date.now() - startAt;
            expect(timeTook).toBeGreaterThanOrEqual(500 - ANIM_PRECISION);
            expect(timeTook).toBeLessThanOrEqual(500 + ANIM_PRECISION);
            done();
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3BlYy9hbmltLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxnQ0FBc0M7QUFDdEMsOENBQStDO0FBRy9DLFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBRTFCLElBQUksR0FBUSxDQUFDO0lBQ2IsSUFBSSxjQUErQixDQUFDO0lBRXBDLFNBQVMsQ0FBQyxHQUFTLEVBQUU7UUFDbkIsR0FBRyxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7UUFDaEIsY0FBYyxHQUFHLElBQUksaUJBQVUsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxHQUFTLEVBQUU7UUFDbEIsTUFBTSxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDL0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7UUFFN0IsY0FBYyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDbkMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO1FBRWhDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixJQUFJLGVBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNsQixDQUFDLEVBQUUsR0FBRztTQUNQLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ1YsQ0FBQyxFQUFFLENBQUM7U0FDTCxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU1QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7UUFDekUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7SUFDekUsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ3pCLGNBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2xDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTNCLElBQUksZUFBUyxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2xCLENBQUMsRUFBRSxHQUFHO1NBQ1AsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDVixDQUFDLEVBQUUsQ0FBQztTQUNMLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxHQUFTLEVBQUU7WUFDckMsTUFBTSxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDN0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQztZQUV0QyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsc0JBQXNCLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxDQUFDO1lBQzlELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLENBQUM7WUFDM0QsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9