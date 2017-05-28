"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Maze_1 = require("./maze-generation/Maze");
const MazePather_1 = require("./maze-generation/MazePather");
const Canvas_1 = require("./browser/Canvas");
const Point_1 = require("./util/Point");
const MazeDrawer_1 = require("./maze-generation/MazeDrawer");
class Main {
    static main() {
        Main.m = new Maze_1.Maze(128, 128);
        Main.mp = new MazePather_1.MazePather(Main.m);
        Main.mp.setStart(64, 64);
        Main.c = new Canvas_1.Canvas(document.getElementsByTagName('canvas')[0], new Point_1.Point(640, 640));
        Main.md = new MazeDrawer_1.MazeDrawer(Main.mp, Main.c.getContext());
        window.requestAnimationFrame(Main.update);
    }
    static update(time) {
        Main.c.clear();
        Main.mp.iterate();
        Main.md.drawPixels();
        window.requestAnimationFrame(Main.update);
    }
}
let c;
let ctm;
Main.main();
