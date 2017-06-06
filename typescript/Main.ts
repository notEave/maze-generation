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

const WIDTH  = 100;
const HEIGHT = 100;
const C = new Canvas(document.getElementsByTagName('canvas')[0], WIDTH, HEIGHT);
const ib = new ImageBuffer(C.getContext().getImageData(0, 0, WIDTH, HEIGHT));
const MSMP = new MultiSimplex();
MSMP.addLayer(0, 0, 2.0, 0.4);
MSMP.addLayer(0, 0, 1.0, 2);
MSMP.addLayer(0, 0, 0.5, 10);
// MSMP.addLayer(0, 0, 0.25, 50);
// MSMP.addLayer(0, 0, 0.125, 250);
let attrgrid:SimplexGrid = new SimplexGrid(WIDTH, HEIGHT, MSMP);
let gw:GridWrapper = new GridWrapper(attrgrid);
let gp:GridPopulation = new GridPopulation(gw);

for(let y:number = 0; y < HEIGHT; y++) {
for(let x:number = 0; x < WIDTH ; x++) {
  let cc:number = attrgrid.getCell(x, y).getAttraction() * 255;
  let rgb = new RGB(cc, cc, cc);
  ib.writeBuff(rgb, x, y);
}}
C.getContext().putImageData(ib.getBuffer(), 0, 0);

gp.startFrom(0, 0);
C.getContext().fillStyle = 'rgba(255, 0, 0, 0.5)';

class Main {
  public static main():void {
    requestAnimationFrame(Main.update);
  }

  public static update():void {
    let Cx:Cell = gp.getFullArea().peek();
    C.getContext().fillRect(Cx.getX(), Cx.getY(), 1, 1);
    gp.iterate();
    requestAnimationFrame(Main.update);
  }
}

Main.main();
