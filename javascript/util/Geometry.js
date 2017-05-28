"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cast_1 = require("../datastructs/Cast");
class Geometry {
    static radians(degrees) {
        const HALF_TURN = 180.0;
        return Cast_1.double(degrees) * Math.PI / HALF_TURN;
    }
    static degrees(radians) {
        const HALF_TURN = 180.0;
        return Cast_1.double(radians) * HALF_TURN / Math.PI;
    }
}
Geometry.TAU = Math.PI * 2;
exports.Geometry = Geometry;
