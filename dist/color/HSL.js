"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cast_1 = require("../datastruct/Cast");
const Cast_2 = require("../datastruct/Cast");
class HSL {
    constructor(hue, saturation, lightness, alpha) {
        this.hue = Cast_1.double(hue) % 360.0;
        this.saturation = Cast_2.normal(saturation);
        this.luminance = Cast_2.normal(lightness);
        if (alpha === undefined) {
            this.alpha = 1.0;
        }
        else {
            this.alpha = alpha;
        }
    }
    toString() {
        return 'HSLA(' + (this.hue) + ',' +
            (this.saturation * 100) + '%,' +
            (this.luminance * 100) + '%,' +
            (this.alpha) + ')';
    }
    setHue(hue) {
        this.hue = Cast_1.double(hue);
    }
    setSaturation(saturation) {
        this.saturation = Cast_2.normal(saturation);
    }
    setLuminance(luminance) {
        this.luminance = Cast_2.normal(luminance);
    }
    setAlpha(alpha) {
        this.alpha = Cast_2.normal(alpha);
    }
    getHue() {
        return this.hue;
    }
    getSaturation() {
        return this.saturation;
    }
    getLuminance() {
        return this.luminance;
    }
    getAlpha() {
        return this.alpha;
    }
}
exports.HSL = HSL;
