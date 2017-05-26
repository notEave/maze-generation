"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Option {
    constructor(text, action, ctx) {
        this.text = text;
        this.action = action;
        this.ctx = ctx;
    }
    trigger() {
        this.action.call(this);
    }
    length() {
        return this.ctx.measureText(this.text).width;
    }
    draw() {
        console.log('you are here');
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.text, 10, 50);
    }
}
exports.Option = Option;
