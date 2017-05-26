"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IllegalArgumentError_1 = require("../error/IllegalArgumentError");
class Canvas {
    constructor(canvas, size) {
        if (canvas === undefined)
            throw new IllegalArgumentError_1.IllegalArgumentError(Canvas.UNDEFINED_HTML_ELEMENT_MSG);
        this.canvas = canvas;
        if (!Number.isInteger(size.getX()) || !Number.isInteger(size.getY()))
            throw new IllegalArgumentError_1.IllegalArgumentError();
        this.size = size;
        this.updateCanvasSize();
        const ctx = this.canvas.getContext('2d');
        if (ctx === null)
            throw new IllegalArgumentError_1.IllegalArgumentError();
        this.context = ctx;
    }
    update(deltaTime) {
        throw new Error();
    }
    updateCanvasSize() {
        this.canvas.width = this.size.getX();
        this.canvas.height = this.size.getY();
    }
    clear() {
        this.getContext().clearRect(0, 0, this.size.getX(), this.size.getY());
    }
    setSize(point) {
        if (!Number.isInteger(point.getX()) || !Number.isInteger(point.getY()))
            throw new IllegalArgumentError_1.IllegalArgumentError();
        this.size = point;
    }
    getContext() {
        return this.context;
    }
    getWidth() {
        return this.size.getX();
    }
    getHeight() {
        return this.size.getY();
    }
}
Canvas.UNDEFINED_HTML_ELEMENT_MSG = 'missing canvas element';
exports.Canvas = Canvas;
