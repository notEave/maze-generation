"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = require("../datastruct/Stack");
const Cast_1 = require("../datastruct/Cast");
const Random_1 = require("../util/Random");
class MazePather {
    constructor(maze) {
        this.maze = maze;
        this.stack = new Stack_1.Stack();
    }
    iterate() {
        if (this.current === undefined) {
            this.initiatePath();
            return;
        }
        if (this.hasUndiscoveredNeigbor()) {
            this.moveToRandomAvailableNeighbor();
            return;
        }
        if (this.current.equals(this.start)) {
            return;
        }
        this.returnToLast();
    }
    initiatePath() {
        if (this.start === undefined) {
            throw new Error();
        }
        this.current = this.start;
        this.current.setPrevious(this.start);
        this.stack.put(this.current);
    }
    moveToRandomAvailableNeighbor() {
        let next;
        let direction;
        let neighbors = this.undiscoveredNeighbors();
        while (true) {
            direction = Random_1.Random.range(0, neighbors.length - 1);
            if (neighbors[direction].equals(this.start)) {
                continue;
            }
            break;
        }
        next = neighbors[direction];
        next.setPrevious(this.current);
        this.current = next;
        this.stack.put(this.current);
    }
    returnToLast() {
        this.current = this.current.getPrevious();
        this.stack.put(this.current);
    }
    hasUndiscoveredNeigbor() {
        return this.undiscoveredNeigborCount() > 0;
    }
    undiscoveredNeigborCount() {
        return this.undiscoveredNeighbors().length;
    }
    undiscoveredNeighbors() {
        let cell = this.maze.neighborsOf(this.current);
        return cell.filter(v => !v.hasPrevious());
    }
    setStart(x, y) {
        const S_X = Cast_1.int(x), S_Y = Cast_1.int(y);
        const WIDTH = this.maze.getWidth(), HEIGHT = this.maze.getHeight();
        if (S_X < 0 || S_Y < 0) {
            throw new Error();
        }
        if (S_X >= WIDTH || S_Y >= HEIGHT) {
            throw new Error();
        }
        this.start = this.maze.getCell(x, y);
    }
    getStart() {
        return this.start;
    }
    getCurrent() {
        return this.current;
    }
    getStack() {
        return this.stack;
    }
}
exports.MazePather = MazePather;
