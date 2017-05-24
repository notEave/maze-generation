import { Maze } from './maze-generation/Maze';
import { MazePather } from './maze-generation/MazePather';
import { Integer } from './datatypes/Integer';
import { Canvas } from './browser/Canvas';
import { Point } from './util/Point';
import { MazeDrawer } from './maze-generation/MazeDrawer';
import { Mouse } from './browser/Mouse';


import { Option } from './experimental/Option';
import { ContextMenu } from './experimental/ContextMenu';

class Main {
  private static m:Maze;
  private static mp:MazePather;
  private static c:Canvas;
  private static md:MazeDrawer;

  public static main():void {

    c = new Canvas(document.getElementsByTagName('canvas')[0], new Point(640, 640));
    let htm:HTMLElement|null = document.getElementById('maze-generation');
    if(htm === null) {
      return;
    }
    let mou:Mouse = new Mouse(htm, false);

    ctm = new ContextMenu(new Point(100, 100), c, mou);
    let o:Option = new Option('testivalinta', function():void {console.log('minua kutsuttiin')});

    ctm.addOption(o);

    window.requestAnimationFrame(Main.test);
  }

  public static test():void {
    c.clear();
    ctm.mouseInsideMenu();
    ctm.draw();
    window.requestAnimationFrame(Main.test);
  }

  /*public static main():void {
     Main.m = new Maze(new Integer(128), new Integer(128));
     Main.mp = new MazePather(Main.m);
     Main.mp.setStart(new Integer(64), new Integer(64));
     Main.c = new Canvas(document.getElementsByTagName('canvas')[0], new Point(640, 640));
     Main.md = new MazeDrawer(Main.mp, Main.c.getContext());
     window.requestAnimationFrame(Main.update);
  }

  public static update(time:number):void {
    Main.c.clear();
    Main.mp.iterate();
    Main.md.drawPixels();
    window.requestAnimationFrame(Main.update);
  }*/
}
let c:Canvas;
let ctm:ContextMenu;
Main.main();
