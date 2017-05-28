"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cast_1 = require("../datastructs/Cast");
class HSL {
    constructor(hue, saturation, lightness) {
        this.hue = Cast_1.double(hue);
        this.saturation = Cast_1.double(saturation);
        this.lightness = Cast_1.double(lightness);
    }
    setHue(hue) {
        this.hue = Cast_1.double(hue);
    }
    setSaturation(saturation) {
        this.saturation = Cast_1.double(saturation);
    }
    setLightness(lightness) {
        this.lightness = Cast_1.double(lightness);
    }
    getHue() {
        return this.hue;
    }
    getSaturation() {
        return this.saturation;
    }
    getLightness() {
        return this.lightness;
    }
}
exports.HSL = HSL;
