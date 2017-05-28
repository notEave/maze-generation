"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cast_1 = require("../datastructs/Cast");
class Point {
    constructor(x, y) {
        this.x = Cast_1.double(x);
        this.y = Cast_1.double(y);
    }
    distance(p) {
        return Math.hypot(this.x - p.x, this.y - p.y);
    }
    setX(x) {
        this.x = Cast_1.double(x);
    }
    setY(y) {
        this.y = Cast_1.double(y);
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}
exports.Point = Point;
