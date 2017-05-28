import { Canvas } from './browser/Canvas';
import { MazePatherManager } from './maze-generation/MazePatherManager';
import { MazeDrawer } from './maze-generation/MazeDrawer';
import { Point } from './util/Point';
import { int } from './datastruct/Cast';

class Main {
  private static mazeDrawer:MazeDrawer;
  private static pathManager:MazePatherManager;
  private static canvas:Canvas|null;
  private static loopActive:boolean = false;

  public static main():void {
    document.getElementsByTagName('button')[0].addEventListener('click', Main.init);
  }

  public static init():void {
    let size:Point;
    let pixelMult:number;
    let pathMult:number;
    let pixMultElement:HTMLInputElement = <HTMLInputElement>document.getElementById('pixel_multiplier');
    let pathMultElement:HTMLInputElement = <HTMLInputElement>document.getElementById('pather_multiplier');

    pixelMult = Number.parseInt(pixMultElement.value);
    pathMult = Number.parseInt(pathMultElement.value);

    size = new Point(1000 - 1000 % pixelMult, 640 - 640 % pixelMult);
    Main.canvas = new Canvas(document.getElementsByTagName('canvas')[0], size);
    Main.pathManager = new MazePatherManager(pathMult, size.getX() / pixelMult, size.getY() / pixelMult);
    Main.pathManager.setStart(int(size.getX() / pixelMult - 1), int(size.getY() / pixelMult - 1));
    Main.mazeDrawer = new MazeDrawer(Main.pathManager, Main.canvas.getContext(), pixelMult);
    if(!Main.loopActive) {
      Main.loopActive = true
      requestAnimationFrame(Main.update);
    }
  }

  public static update():void {
    Main.pathManager.iterate();
    Main.mazeDrawer.drawPixels();
    requestAnimationFrame(Main.update);
  }
}

Main.main();
