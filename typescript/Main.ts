import { RGB } from './color/RGB';
import { HSL } from './color/HSL';
import { Colors } from './color/Colors';
import { Canvas } from './browser/Canvas';
import { Maze } from './maze-generation/Maze';
import { MazePather } from './maze-generation/MazePather';
import { MazeDrawer } from './maze-generation/MazeDrawer';
import { MazePatherManager } from './maze-generation/MazePatherManager';
import { Point } from './util/Point';

class Main {
  private static canv:Canvas;
  private static maze:Maze;
  private static mpmg:MazePatherManager;
  private static MazeDraw:MazeDrawer;

  public static main():void {
    let mSize:Point = new Point(800, 640);
    Main.canv = new Canvas(document.getElementsByTagName('canvas')[0], mSize);
    Main.mpmg = new MazePatherManager();
    Main.mpmg.addPather(new MazePather(new Maze(200, 160)));
    Main.mpmg.addPather(new MazePather(new Maze(200, 160)));
    Main.mpmg.addPather(new MazePather(new Maze(200, 160)));
    Main.mpmg.addPather(new MazePather(new Maze(200, 160)));
    Main.mpmg.setStart(100, 80);

    Main.MazeDraw = new MazeDrawer(Main.mpmg, Main.canv.getContext());
    requestAnimationFrame(Main.update);
  }

  public static update():void {
    // Main.canv.clear();
    Main.mpmg.iterate();
    Main.MazeDraw.drawPixels();
    requestAnimationFrame(Main.update);
  }

  /*
  public static main():void {
    for(let i = 0; i < 3; i++) {
      for(let n = 0; n < 256; n++) {
        if(i === 0) {
          console.log(new RGB(n,0,0).toString());
          console.log(Colors.HSLtoRGB(Colors.RGBtoHSL(new RGB(n, 0, 0))).toString());
        } else if(i === 1) {
          console.log(new RGB(255, n, 0).toString());
          console.log(Colors.HSLtoRGB(Colors.RGBtoHSL(new RGB(255, n, 0))).toString());
        } else if(i === 2) {
          console.log(new RGB(255,255,n).toString());
          console.log(Colors.HSLtoRGB(Colors.RGBtoHSL(new RGB(255,255,n))).toString());
        }
      }
    }
  }*/
}

Main.main();
