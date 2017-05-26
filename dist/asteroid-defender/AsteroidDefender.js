"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NaNError_1 = require("../error/NaNError");
class AsteroidDefender {
    constructor(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    }
    setWidth(width) {
        if (isNaN(width))
            throw new NaNError_1.NaNError();
        this.width = width;
    }
    setHeight(height) {
        if (isNaN(height))
            throw new NaNError_1.NaNError();
        this.height = height;
    }
}
exports.AsteroidDefender = AsteroidDefender;
