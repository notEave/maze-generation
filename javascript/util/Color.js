"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringC_1 = require("./StringC");
const IllegalArgumentError_1 = require("../error/IllegalArgumentError");
const Cast_1 = require("../datastructs/Cast");
class Color {
    constructor(red, green, blue, alpha) {
        this.red = Cast_1.normal(red);
        this.green = Cast_1.normal(green);
        this.blue = Cast_1.normal(blue);
        if (alpha !== undefined) {
            this.alpha = Cast_1.normal(alpha);
        }
        else {
            this.alpha = 1.0;
        }
    }
    setChannel(channel, value) {
        switch (channel) {
            case 0:
                this.red = Cast_1.normal(value);
                break;
            case 1:
                this.green = Cast_1.normal(value);
                break;
            case 2:
                this.blue = Cast_1.normal(value);
                break;
            case 3:
                this.alpha = Cast_1.normal(value);
                break;
        }
    }
    getChannel(channel) {
        switch (channel) {
            case 0: return this.red;
            case 1: return this.green;
            case 2: return this.blue;
            case 3: return this.alpha;
        }
    }
    getRrgbValues() {
        const RED = Math.round(this.red * Color.RGB_MULT);
        const GREEN = Math.round(this.green * Color.RGB_MULT);
        const BLUE = Math.round(this.blue * Color.RGB_MULT);
        const ALPHA = this.alpha;
        return [RED, GREEN, BLUE, ALPHA];
    }
    static fromHex(hex) {
        const HEX_COLOR = /^#[0-9a-f]{6}$/gi;
        if (!StringC_1.StringC.contains(hex, HEX_COLOR)) {
            throw new IllegalArgumentError_1.IllegalArgumentError();
        }
        const RED = StringC_1.StringC.parseHex(hex.substr(1, 2)) / Color.RGB_MULT;
        const GREEN = StringC_1.StringC.parseHex(hex.substr(3, 2)) / Color.RGB_MULT;
        const BLUE = StringC_1.StringC.parseHex(hex.substr(5, 2)) / Color.RGB_MULT;
        return new Color(RED, GREEN, BLUE);
    }
    toRgb() {
        const VALUES = this.getRrgbValues();
        return 'rgb(' +
            VALUES[0] + ',' +
            VALUES[1] + ',' +
            VALUES[2] +
            ')';
    }
    toRgba() {
        const VALUES = this.getRrgbValues();
        return 'rgba(' +
            VALUES[0] + ',' +
            VALUES[1] + ',' +
            VALUES[2] + ',' +
            VALUES[3] +
            ')';
    }
}
Color.RGB_MULT = 255.0;
Color.ALPHA_MULT = 1.0;
exports.Color = Color;
