"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RGB_1 = require("./color/RGB");
const Colors_1 = require("./color/Colors");
class Main {
    static main() {
        for (let i = 0; i < 3; i++) {
            for (let n = 0; n < 256; n++) {
                if (i === 0) {
                    console.log(new RGB_1.RGB(n, 0, 0).toString());
                    console.log(Colors_1.Colors.HSLtoRGB(Colors_1.Colors.RGBtoHSL(new RGB_1.RGB(n, 0, 0))).toString());
                }
                else if (i === 1) {
                    console.log(new RGB_1.RGB(0, n, 0).toString());
                    console.log(Colors_1.Colors.HSLtoRGB(Colors_1.Colors.RGBtoHSL(new RGB_1.RGB(0, n, 0))).toString());
                }
                else if (i === 2) {
                    console.log(new RGB_1.RGB(0, 0, n).toString());
                    console.log(Colors_1.Colors.HSLtoRGB(Colors_1.Colors.RGBtoHSL(new RGB_1.RGB(0, 0, n))).toString());
                }
            }
        }
    }
}
Main.main();
