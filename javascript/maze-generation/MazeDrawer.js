"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MazeDrawer {
    constructor(mazePather, ctx) {
        this.mazePather = mazePather;
        this.ctx = ctx;
    }
    drawPixels() {
        let stack = this.mazePather.getStack().clone();
        let totalSize = stack.length();
        let alpha = 0.5;
        let i = 0;
        this.ctx.fillStyle = `rgba(44,136,152,${alpha})`;
        while (stack.length() > 0) {
            i++;
            alpha = (50 - i) / 50;
            if (alpha < 0.5)
                alpha = 0.5;
            this.ctx.fillStyle = `rgba(44,136,152,${alpha})`;
            let current = stack.pop();
            this.ctx.fillRect(current.getX() * 5, current.getY() * 5, 5, 5);
        }
    }
}
exports.MazeDrawer = MazeDrawer;
