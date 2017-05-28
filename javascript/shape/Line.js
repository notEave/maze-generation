"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = require("./Shape");
const NaNError_1 = require("../error/NaNError");
class Line extends Shape_1.Shape {
    constructor(p, e, width, color, ctx) {
        super(p, color, ctx);
        this.end = e;
        this.setWidth(width);
        this.width = width;
    }
    draw() {
        this.applyStrokeStyle();
        this.applyLineWidth();
        this.createLine();
        this.stroke();
    }
    createLine() {
        this.beginPath(this.center);
        this.lineTo(this.end);
        this.closePath();
    }
    beginPath(point) {
        this.ctx.beginPath();
        this.moveTo(point);
    }
    closePath() {
        this.ctx.closePath();
    }
    moveTo(point) {
        this.ctx.moveTo(point.getX(), point.getY());
    }
    lineTo(point) {
        this.ctx.lineTo(point.getX(), point.getY());
    }
    applyLineWidth() {
        this.ctx.lineWidth = this.width;
    }
    setWidth(width) {
        if (isNaN(width))
            throw new NaNError_1.NaNError();
        this.width = width;
    }
    getWidth() {
        return this.width;
    }
    getEnd() {
        return this.end;
    }
}
exports.Line = Line;
