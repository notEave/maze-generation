"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cast_1 = require("../datastructs/Cast");
const Cell_1 = require("./Cell");
class Maze {
    constructor(width, height) {
        if (width < Maze.MINIMUM_DIMENSION || height < Maze.MINIMUM_DIMENSION) {
            throw new Error();
        }
        this.width = Cast_1.int(width);
        this.height = Cast_1.int(height);
        this.table = Maze.generateTable(this.width, this.height);
    }
    static generateTable(width, height) {
        let x, y, i;
        let cellTable = [];
        for (i = 0; i < width; i++) {
            cellTable[i] = [];
        }
        for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                cellTable[x][y] = new Cell_1.Cell(x, y);
            }
        }
        return cellTable;
    }
    getCell(x, y) {
        if (x < 0 || y < 0) {
            throw new Error();
        }
        if (x >= this.width || y >= this.height) {
            throw new Error();
        }
        return this.table[Cast_1.int(x)][Cast_1.int(y)];
    }
    neighborsOf(cell) {
        let up, right, down, left;
        let table = [];
        try {
            up = this.getCell(cell.getX(), cell.getY() - 1);
        }
        catch (e) { }
        try {
            right = this.getCell(cell.getX() + 1, cell.getY());
        }
        catch (e) { }
        try {
            down = this.getCell(cell.getX(), cell.getY() + 1);
        }
        catch (e) { }
        try {
            left = this.getCell(cell.getX() - 1, cell.getY());
        }
        catch (e) { }
        if (up !== undefined)
            table.push(up);
        if (right !== undefined)
            table.push(right);
        if (down !== undefined)
            table.push(down);
        if (left !== undefined)
            table.push(left);
        return table;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getTable() {
        return this.table;
    }
}
Maze.MINIMUM_DIMENSION = 1;
exports.Maze = Maze;
