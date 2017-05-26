"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnsupportedFunctionalityError_1 = require("../error/UnsupportedFunctionalityError");
class Shape {
    constructor(position, color, ctx) {
        this.center = position;
        this.color = color;
        this.ctx = ctx;
    }
    draw() {
        throw new UnsupportedFunctionalityError_1.UnsupportedFunctionalityError();
    }
    applyFillStyle() {
        this.ctx.fillStyle = this.color.toRgb();
    }
    applyStrokeStyle() {
        this.ctx.strokeStyle = this.color.toRgb();
    }
    stroke() {
        this.ctx.stroke();
    }
    fill() {
        this.ctx.fill();
    }
    getCenter() {
        return this.center;
    }
    getColor() {
        return this.color;
    }
    getContext() {
        return this.ctx;
    }
}
exports.Shape = Shape;
