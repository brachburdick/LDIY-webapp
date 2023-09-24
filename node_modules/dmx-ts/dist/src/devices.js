"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredefinedDevices = void 0;
exports.PredefinedDevices = {
    'generic': {
        channels: ['dimmer'],
    },
    'generic-rgb': {
        channels: ['red', 'green', 'blue'],
    },
    'showtec-multidim2': {
        channels: ['1', '2', '3', '4'],
    },
    'eurolite-led-bar': {
        channels: [
            'ctrl',
            'dimmer',
            'strobe',
            'red0',
            'green0',
            'blue0',
            'red1',
            'green1',
            'blue1',
            'red2',
            'green2',
            'blue2',
        ],
        ranges: {
            'ctrl': {
                'type': 'option',
                'options': [
                    { 'value': 0, 'label': 'Black Out' },
                    { 'value': 1, 'label': 'Dimmer 1' },
                    { 'value': 16, 'label': 'Dimmer 2' },
                    { 'value': 32, 'label': 'Red' },
                    { 'value': 48, 'label': 'Green' },
                    { 'value': 64, 'label': 'Blue' },
                    { 'value': 80, 'label': 'Purple' },
                    { 'value': 96, 'label': 'Yellow' },
                    { 'value': 112, 'label': 'Cyan' },
                    { 'value': 128, 'label': 'White' },
                    { 'value': 144, 'label': 'Color change' },
                    { 'value': 160, 'label': 'Color flow' },
                    { 'value': 176, 'label': 'Color dream' },
                    { 'value': 192, 'label': 'Multi flow' },
                    { 'value': 208, 'label': 'Dream flow' },
                    { 'value': 224, 'label': 'Two color flow' },
                    { 'value': 240, 'label': 'Sound activity' },
                ],
            },
            'dimmer': {
                'type': 'slider',
                'min': 0,
                'max': 255,
            },
        },
    },
    'stairville-led-par-56': {
        channels: ['ctrl', 'red', 'green', 'blue', 'speed'],
        ranges: {
            'ctrl': {
                'type': 'option',
                'options': [
                    { 'value': 0, 'label': 'RGB Control' },
                    { 'value': 64, 'label': '7 color fade' },
                    { 'value': 128, 'label': '7 color change' },
                    { 'value': 192, 'label': '3 color change' },
                ],
            },
        },
    },
    'ultra-pro-24ch-rdm': {
        channels: [...Array(25).keys()].slice(1),
    },
    'ultra-pro-6rgbch-rdm': {
        channels: [...Array(25).keys()].slice(1),
        channelgroups: ['1', '2', '3', '4', '5', '6'],
    },
    'oppsk-cob-uv-par': {
        channels: ['dimmer', 'strobe', 'program-speed', 'sound-activity'],
    },
    'lixda-par12-led': {
        channels: ['ctrl', 'static-color', 'speed', 'dimmer', 'red', 'green', 'blue', 'white'],
        ranges: {
            'ctrl': {
                'type': 'option',
                'options': [
                    { 'value': 0, 'label': 'Off' },
                    { 'value': 11, 'label': 'Static Color' },
                    { 'value': 51, 'label': 'Jump' },
                    { 'value': 101, 'label': 'Gradual' },
                    { 'value': 151, 'label': 'Sound Activate' },
                    { 'value': 200, 'label': 'Strobe' },
                ],
            },
            'static-color': {
                'type': 'option',
                'options': [
                    { 'value': 0, 'label': 'All Color' },
                    { 'value': 40, 'label': 'Red' },
                    { 'value': 50, 'label': 'Green' },
                    { 'value': 60, 'label': 'Blue' },
                    { 'value': 70, 'label': 'Yellow' },
                    { 'value': 80, 'label': 'Cyan' },
                    { 'value': 90, 'label': 'Purple' },
                    { 'value': 100, 'label': 'White' },
                    { 'value': 110, 'label': 'Red + Green' },
                    { 'value': 120, 'label': 'Red + Blue' },
                    { 'value': 130, 'label': 'Red + White' },
                    { 'value': 140, 'label': 'Green + Blue' },
                    { 'value': 150, 'label': 'Green + White' },
                    { 'value': 160, 'label': 'Blue + White' },
                    { 'value': 170, 'label': 'Red + Green + White' },
                    { 'value': 180, 'label': 'Red + Blue + White' },
                    { 'value': 190, 'label': 'Green + Blue + White' },
                    { 'value': 200, 'label': 'Red + Green + Blue' },
                    { 'value': 210, 'label': 'Red + Green + Blue + White' },
                ],
            },
        },
    },
    'eurolite-led-tha-120PC': {
        channels: ['red', 'green', 'blue', 'white', 'dimmer', 'strobe', 'effect'],
    },
    'briteq-bt-theatre-60FC': {
        channels: ['dimmer', 'strobe', 'effect', 'red', 'green', 'blue', 'white'],
    },
    'lalucenatz-led-4ch': {
        channels: ['master', 'red', 'green', 'blue'],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZXZpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVFhLFFBQUEsaUJBQWlCLEdBQVk7SUFDeEMsU0FBUyxFQUFFO1FBQ1QsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDO0tBQ3JCO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7S0FDbkM7SUFDRCxtQkFBbUIsRUFBRTtRQUNuQixRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7S0FDL0I7SUFDRCxrQkFBa0IsRUFBRTtRQUNsQixRQUFRLEVBQUU7WUFDUixNQUFNO1lBQ04sUUFBUTtZQUNSLFFBQVE7WUFDUixNQUFNO1lBQ04sUUFBUTtZQUNSLE9BQU87WUFDUCxNQUFNO1lBQ04sUUFBUTtZQUNSLE9BQU87WUFDUCxNQUFNO1lBQ04sUUFBUTtZQUNSLE9BQU87U0FDUjtRQUNELE1BQU0sRUFBRTtZQUNOLE1BQU0sRUFBRTtnQkFDTixNQUFNLEVBQUUsUUFBUTtnQkFDaEIsU0FBUyxFQUFFO29CQUNULEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFDO29CQUNsQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBQztvQkFDakMsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUM7b0JBQ2xDLEVBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDO29CQUM3QixFQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQztvQkFDL0IsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUM7b0JBQzlCLEVBQUMsT0FBTyxFQUFFLEVB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