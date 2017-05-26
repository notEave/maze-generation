"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RGB_1 = require("./RGB");
const HSL_1 = require("./HSL");
const Cast_1 = require("../datastruct/Cast");
const Cast_2 = require("../datastruct/Cast");
class Colors {
    static RGBtoHSL(rgb) {
        const RED = rgb.getRed() / Cast_1.Cast.U_BYTE_MAX;
        const GREEN = rgb.getGreen() / Cast_1.Cast.U_BYTE_MAX;
        const BLUE = rgb.getBlue() / Cast_1.Cast.U_BYTE_MAX;
        const ALPHA = rgb.getAlpha();
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
    static HSLtoRGB(hsl) {
        const R = 0;
        const G = 1;
        const B = 2;
        const HUE = hsl.getHue();
        const SATURATION = hsl.getSaturation();
        const LUMINANCE = hsl.getLuminance();
        const ALPHA = hsl.getAlpha();
        if (SATURATION === 0.0) {
            const REDGREENBLUE = (LUMINANCE * Cast_1.Cast.U_BYTE_MAX + 0.5) | 0;
            return new RGB_1.RGB(REDGREENBLUE, REDGREENBLUE, REDGREENBLUE, ALPHA);
        }
        const ANGLE = HUE / 360.0;
        let tmp0;
        let tmp1;
        if (LUMINANCE > 0.5) {
            tmp0 = LUMINANCE + SATURATION - LUMINANCE * SATURATION;
        }
        else {
            tmp0 = LUMINANCE * (1.0 + SATURATION);
        }
        tmp1 = 2 * LUMINANCE - tmp0;
        let chn = [
            ANGLE + (1 / 3),
            ANGLE,
            ANGLE - (1 / 3)
        ].map((channel) => {
            if (channel > 1.0) {
                channel -= 1.0;
            }
            else if (channel < 0.0) {
                channel += 1.0;
            }
            if (channel * 6.0 > 1.0) {
                if (channel * 2.0 > 1.0) {
                    if (channel * 3.0 > 2.0) {
                        channel = tmp1;
                    }
                    else if (channel * 3.0 < 2.0) {
                        channel = tmp1 + (tmp0 - tmp1) * (2 / 3 - channel) * 6.0;
                    }
                }
                else if (channel * 2.0 < 1.0) {
                    channel = tmp0;
                }
            }
            else if (channel * 6.0 < 1.0) {
                channel = tmp1 + (tmp0 - tmp1) * 6.0 * channel;
            }
            return channel = Cast_2.ubyte(Math.round(channel * Cast_1.Cast.U_BYTE_MAX));
        });
        return new RGB_1.RGB(chn[R], chn[G], chn[B], ALPHA);
    }
}
exports.Colors = Colors;
