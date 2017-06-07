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
import { MathC } from './util/MathC';

const WIDTH  = 800;
const HEIGHT = 800;
const C = new Canvas(document.getElementsByTagName('canvas')[0], WIDTH, HEIGHT);
const ib = new ImageBuffer(C.getContext().getImageData(0, 0, WIDTH, HEIGHT));
const MSMP = new MultiSimplex();
for(let i:number = 1; i <= 100; i++) {
  MSMP.addLayer(1000, 1000, 1 / i, Math.pow(5, i / 2));
}
// MSMP.addLayer(0, 0, 1,   0.2);
// MSMP.addLayer(0, 0, 1,   1.0);
// MSMP.addLayer(0, 0, 1,   5.0);
// MSMP.addLayer(0, 0, 1,  25.0);
// MSMP.addLayer(0, 0, 1, 125.0);

let attrgrid:SimplexGrid = new SimplexGrid(WIDTH, HEIGHT, MSMP);
let gw:GridWrapper = new GridWrapper(attrgrid);
let gp:GridPopulation = new GridPopulation(gw);
let iter:number = 0;
for(let y:number = 0; y < HEIGHT; y++) {
for(let x:number = 0; x < WIDTH ; x++) {
  let cc:number = attrgrid.getCell(x, y).getAttraction() * 255;
  let rgb = new RGB(cc, cc, cc);
  ib.writeBuff(rgb, x, y);
}}
C.getContext().putImageData(ib.getBuffer(), 0, 0);

gp.startFrom(0, 0);

class Main {
  public static main():void {
    requestAnimationFrame(Main.update);
  }

  public static update():void {
    for(let i:number = 0; i < 5; i++) {
      let Cx:Cell = gp.getFullArea().peek();
      C.getContext().fillStyle = new HSL(Cx.getAttraction() * 330, 1.0, 0.5, 1.0).toString();
      C.getContext().fillRect(Cx.getX(), Cx.getY(), 1, 1);
      gp.iterate();
      iter += 0.01;
    }
    requestAnimationFrame(Main.update);
  }
}

Main.main();
