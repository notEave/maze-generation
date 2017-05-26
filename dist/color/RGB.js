"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cast_1 = require("../datastruct/Cast");
const Cast_2 = require("../datastruct/Cast");
const Cast_3 = require("../datastruct/Cast");
const HSL_1 = require("./HSL");
class RGB {
    constructor(red, green, blue, alpha) {
        this.red = Cast_2.ubyte(red);
        this.green = Cast_2.ubyte(green);
        this.blue = Cast_2.ubyte(blue);
        if (alpha === undefined) {
            this.alpha = 1.0;
        }
        else {
            this.alpha = alpha;
        }
    }
    toHSL() {
        const RED = this.red / Cast_1.Cast.U_BYTE_MAX;
        const GREEN = this.green / Cast_1.Cast.U_BYTE_MAX;
        const BLUE = this.blue / Cast_1.Cast.U_BYTE_MAX;
        const ALPHA = this.alpha;
        const MAX = Math.max(RED, GREEN, BLUE);
        const MIN = Math.min(RED, GREEN, BLUE);
        const LIGHTNESS = (MAX + MIN) / 2;
        let saturation;
        if (MAX === MIN) {
            saturation = 0.0;
        }
        else if (LIGHTNESS > 0.5) {
            saturation = (MAX - MIN) / (2 - MAX - MIN);
        }
        else {
            saturation = (MAX - MIN) / (MAX - MIN);
        }
        let hue;
        if (MAX === MIN) {
            hue = 0.0;
        }
        if (MAX === RED) {
            hue = (GREEN - BLUE) / (MAX - MIN);
        }
        else if (MAX === GREEN) {
            hue = 2.0 + (BLUE - RED) / (MAX - MIN);
        }
        else {
            hue = 4.0 + (RED - GREEN) / (MAX - MIN);
        }
        hue = hue * 60.0;
        return new HSL_1.HSL(hue, saturation, LIGHTNESS);
    }
    toString() {
        return 'RGBA(' +
            (this.red) + ',' +
            (this.green) + ',' +
            (this.blue) + ',' +
            (this.alpha) + ')';
    }
    setRed(red) {
        this.red = Cast_2.ubyte(red);
    }
    setGreen(green) {
        this.green = Cast_2.ubyte(green);
    }
    setBlue(blue) {
        this.blue = Cast_2.ubyte(blue);
    }
    setAlpha(alpha) {
        this.alpha = Cast_3.normal(alpha);
    }
    getRed() {
        return this.red;
    }
    getGreen() {
        return this.green;
    }
    getBlue() {
        return this.blue;
    }
    getAlpha() {
        return this.alpha;
    }
}
exports.RGB = RGB;
