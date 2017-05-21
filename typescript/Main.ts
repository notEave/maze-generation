import { Maze } from './maze-generation/Maze';
import { MazePather } from './maze-generation/MazePather';
import { Integer } from './datatypes/Integer';
import { Canvas } from './browser/Canvas';
import { Point } from './util/Point';
import { MazeDrawer } from './maze-generation/MazeDrawer';

class Main {
  static main():void {
    // c.clear();
    mp.iterate();
    md.drawPixels();
    requestAnimationFrame(Main.main);
  }
}


let m:Maze = new Maze(new Integer(128), new Integer(128));
let mp:MazePather = new MazePather(m);
mp.setStart(new Integer(64), new Integer(64));
let c:Canvas = new Canvas(document.getElementsByTagName('canvas')[0], new Point(640, 640));
let md:MazeDrawer = new MazeDrawer(mp, c.getContext());
// window.setInterval(Main.main, 2000);
requestAnimationFrame(Main.main);
