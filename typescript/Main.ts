import { GridWrapper } from './maze-generation/GridWrapper';
import { SimplexGrid } from './maze-generation/SimplexGrid';
import { GridPopulation } from './maze-generation/GridPopulation';

import { Canvas } from './browser/Canvas';
import { Cell } from './maze-generation/Cell';

import { SimplexWrapper } from './noise/SimplexWrapper';
import { MultiSimplex } from './noise/MultiSimplex';
import { HSL } from './color/HSL';
import { RGB } from './color/RGB';
import { Colors } from './color/Colors';

import { ImageBuffer } from './browser/ImageBuffer';

const WIDTH  = 3000;
const HEIGHT = 3000;
const C = new Canvas(document.getElementsByTagName('canvas')[0], WIDTH, HEIGHT);
const ib = new ImageBuffer(C.getContext().getImageData(0, 0, WIDTH, HEIGHT));
const MSMP = new MultiSimplex();
MSMP.addLayer(0, 0, 2.0, 0.4);
MSMP.addLayer(0, 0, 1.0, 2);
MSMP.addLayer(0, 0, 0.5, 10);
MSMP.addLayer(0, 0, 0.25, 50);
MSMP.addLayer(0, 0, 0.125, 250);
let iter = 0;
const ARR:number[][] = MSMP.normalNoise2D(WIDTH, HEIGHT);

class Main {
  public static main():void {

    requestAnimationFrame(Main.update);
  }

  public static update():void {
    C.clear();
    // MSMP.getSimplexWrappers()[0].moveOrigin(0.0005 * 5, 0);
    // MSMP.getSimplexWrappers()[1].moveOrigin(0.0025 * 5, 0);
    // MSMP.getSimplexWrappers()[2].moveOrigin(0.0125 * 5, 0);
    // MSMP.getSimplexWrappers()[3].moveOrigin(0.0625 * 5, 0);
    // MSMP.getSimplexWrappers()[4].moveOrigin(0.3125 * 5, 0);
    for(let y:number = 0; y < HEIGHT; y++) {
    for(let x:number = 0; x < WIDTH ; x++) {
      // let rgb = new RGB(ARR[x][y] * 255, ARR[x][y] * 255, ARR[x][y] * 255);
      let hsl = new HSL(ARR[x][y] * 330 + iter, 1.0, 0.5);
      ib.writeBuff(Colors.HSLtoRGB(hsl), x, y);
      // C.getContext().fillRect(x, y, 1, 1);
    }}
    iter++;
    C.getContext().putImageData(ib.getBuffer(), 0, 0);
    requestAnimationFrame(Main.update);
  }

  /*
  private static readonly width:number  = 200;
  private static readonly height:number = 200;
  private static readonly ratio:number = 5;
  private static readonly smpxGrd:SimplexGrid = new SimplexGrid(Main.width, Main.height, 10, 5, 0);
  private static readonly gw:GridWrapper = new GridWrapper(Main.smpxGrd);
  private static readonly gp:GridPopulation = new GridPopulation(Main.gw);
  private static readonly gp2:GridPopulation = new GridPopulation(Main.gw);
  private static readonly gp3:GridPopulation = new GridPopulation(Main.gw);
  private static readonly gp4:GridPopulation = new GridPopulation(Main.gw);
  private static readonly c:Canvas = new Canvas(document.getElementsByTagName('canvas')[0], Main.width * Main.ratio, Main.height * Main.ratio);

  public static main():void {
    let y:number;
    let x:number;

    for(y = 0; y < Main.gw.getGrid().getHeight(); y++) {
    for(x = 0; x < Main.gw.getGrid().getWidth() ; x++) {
      let chn:number = Math.round(Main.gw.getGrid().getCell(x, y).getAttraction() * 255);
      Main.c.getContext().fillStyle = `rgb(${chn},${chn},${chn})`;
      Main.c.getContext().fillRect(x * Main.ratio, y * Main.ratio, 1 * Main.ratio, 1 * Main.ratio);
    }}

    Main.c.getContext().fillStyle = 'rgba(255, 0, 0, 0.5)';
    Main.gp.startFrom(0, 0);
    Main.gp2.startFrom(Main.width - 1, Main.height - 1);
    Main.gp3.startFrom(Main.width - 1, 0);
    Main.gp4.startFrom(0, Main.height - 1);

    Main.draw();

    requestAnimationFrame(Main.update);
  }

  public static update():void {
    console.log(Main.gp.getActive().length());
    Main.calc();
    Main.draw();
    requestAnimationFrame(Main.update);
  }

  public static calc():void {
    Main.gp.iterate();
    Main.gp2.iterate();
    Main.gp3.iterate();
    Main.gp4.iterate();
  }

  public static draw():void {
    let i:number;
    let ls:Cell;
    Main.c.clear();

    Main.c.getContext().fillStyle = 'rgba(255, 0, 0, 0.3)';
    for(i = 0; i < Main.gp.getActive().length(); i++) {
      ls = Main.gp.getActive().peek(i);
      Main.c.getContext().fillRect(ls.getX() * Main.ratio, ls.getY() * Main.ratio, 1 * Main.ratio, 1 * Main.ratio);
    }

    Main.c.getContext().fillStyle = 'rgba(0, 0, 255, 0.3)';
    for(i = 0; i < Main.gp2.getActive().length(); i++) {
      ls = Main.gp2.getActive().peek(i);
      Main.c.getContext().fillRect(ls.getX() * Main.ratio, ls.getY() * Main.ratio, 1 * Main.ratio, 1 * Main.ratio);
    }

    Main.c.getContext().fillStyle = 'rgba(0, 255, 0, 0.3)';
    for(i = 0; i < Main.gp3.getActive().length(); i++) {
      ls = Main.gp3.getActive().peek(i);
      Main.c.getContext().fillRect(ls.getX() * Main.ratio, ls.getY() * Main.ratio, 1 * Main.ratio, 1 * Main.ratio);
    }

    Main.c.getContext().fillStyle = 'rgba(255, 0, 255, 0.3)';
    for(i = 0; i < Main.gp4.getActive().length(); i++) {
      ls = Main.gp4.getActive().peek(i);
      Main.c.getContext().fillRect(ls.getX() * Main.ratio, ls.getY() * Main.ratio, 1 * Main.ratio, 1 * Main.ratio);
    }

    /*
    Main.c.getContext().fillRect(ls.getX() * Main.ratio, ls.getY() * Main.ratio, 1 * Main.ratio, 1 * Main.ratio);

    ls = Main.gp2.getFullArea().peek();
    Main.c.getContext().fillRect(ls.getX() * Main.ratio, ls.getY() * Main.ratio, 1 * Main.ratio, 1 * Main.ratio);

    ls = Main.gp3.getFullArea().peek();
    Main.c.getContext().fillRect(ls.getX() * Main.ratio, ls.getY() * Main.ratio, 1 * Main.ratio, 1 * Main.ratio);

    ls = Main.gp4.getFullArea().peek();
    Main.c.getContext().fillRect(ls.getX() * Main.ratio, ls.getY() * Main.ratio, 1 * Main.ratio, 1 * Main.ratio);
    */
  /*}*/
}

Main.main();
