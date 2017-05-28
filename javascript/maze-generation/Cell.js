"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cast_1 = require("../datastructs/Cast");
class Cell {
    constructor(x, y) {
        this.x = Cast_1.int(x);
        this.y = Cast_1.int(y);
    }
    equals(c) {
        return this.x === c.x &&
            this.y === c.y &&
            this.previous === c.previous;
    }
    hasPrevious() {
        return this.previous !== undefined;
    }
    setPrevious(previous) {
        this.previous = previous;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getPrevious() {
        if (this.previous == null) {
            throw new Error('previous not yet defined');
        }
        return this.previous;
    }
}
exports.Cell = Cell;
