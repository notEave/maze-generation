import { GridWrapper } from './maze-generation/GridWrapper';
import { SimplexGrid } from './maze-generation/SimplexGrid';
import { GridPopulation } from './maze-generation/GridPopulation';

import { Canvas } from './browser/Canvas';
import { Cell } from './maze-generation/Cell';

class Main {
  private static readonly width:number  = 100;
  private static readonly height:number = 100;
  private static readonly ratio:number = 10;
  private static readonly smpxGrd:SimplexGrid = new SimplexGrid(Main.width, Main.height, 0.6, 5, 0);
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
    Main.c.getContext().fillStyle = 'rgba(255, 0, 0, 0.1)';
    let ls:Cell = Main.gp.getFullArea().peek();
    Main.c.getContext().fillRect(ls.getX() * Main.ratio, ls.getY() * Main.ratio, 1 * Main.ratio, 1 * Main.ratio);

    Main.c.getContext().fillStyle = 'rgba(0, 0, 255, 0.1)';
    ls = Main.gp2.getFullArea().peek();
    Main.c.getContext().fillRect(ls.getX() * Main.ratio, ls.getY() * Main.ratio, 1 * Main.ratio, 1 * Main.ratio);

    Main.c.getContext().fillStyle = 'rgba(0, 255, 0, 0.1)';
    ls = Main.gp3.getFullArea().peek();
    Main.c.getContext().fillRect(ls.getX() * Main.ratio, ls.getY() * Main.ratio, 1 * Main.ratio, 1 * Main.ratio);

    Main.c.getContext().fillStyle = 'rgba(255, 0, 255, 0.1)';
    ls = Main.gp4.getFullArea().peek();
    Main.c.getContext().fillRect(ls.getX() * Main.ratio, ls.getY() * Main.ratio, 1 * Main.ratio, 1 * Main.ratio);
  }
}

Main.main();
