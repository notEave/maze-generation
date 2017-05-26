"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = require("./Shape");
const NaNError_1 = require("../error/NaNError");
const Geometry_1 = require("../util/Geometry");
class Circle extends Shape_1.Shape {
    constructor(p, radius, color, ctx) {
        super(p, color, ctx);
        this.setRadius(radius);
        this.sAngle = Circle.S_ANGLE_DEFAULT;
        this.eAngle = Circle.E_ANGLE_DEFAULT;
        this.counterClockwise = Circle.COUNTER_CLOCKWISE_DEFAULT;
    }
    draw() {
        this.applyFillStyle();
        this.arc();
        this.fill();
    }
    arc() {
        const P_X = this.center.getX();
        const P_Y = this.center.getY();
        this.ctx.arc(P_X, P_Y, this.radius, this.sAngle, this.eAngle);
    }
    setRadius(radius) {
        if (isNaN(radius))
            throw new NaNError_1.NaNError();
        this.radius = radius;
    }
    setStartAngle(angle) {
        if (isNaN(angle))
            throw new NaNError_1.NaNError();
        this.sAngle = angle;
    }
    setEndAngle(angle) {
        if (isNaN(angle))
            throw new NaNError_1.NaNError();
        this.eAngle = angle;
    }
    getRadius() {
        return this.radius;
    }
    getStartAngle() {
        return this.sAngle;
    }
    getEndAngle() {
        return this.eAngle;
    }
}
Circle.S_ANGLE_DEFAULT = 0.0;
Circle.E_ANGLE_DEFAULT = Geometry_1.Geometry.TAU;
Circle.COUNTER_CLOCKWISE_DEFAULT = false;
exports.Circle = Circle;
