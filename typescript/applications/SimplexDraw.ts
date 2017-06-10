import { CanvasWrapper } from '../browser/CanvasWrapper';

import { SimplexLogic } from './SimplexLogic';
import { SimplexDrawStyle } from './SimplexDrawStyle';

import { ColorBuffer } from '../browser/ColorBuffer';

import { Point2 } from '../space/Point2';

import { AttractionGrid } from '../maze-generation/AttractionGrid';
import { Cell } from '../maze-generation/Cell';

import { RGB } from '../color/RGB';
import { HSL } from '../color/HSL';
import { Colors } from '../color/Colors';

export class SimplexDraw {
  private readonly canvWrap:CanvasWrapper;
  private          logic    :SimplexLogic;
  private          style    :SimplexDrawStyle;
  private          drawCalls:number;
  private          noiseBuffer:ColorBuffer;
  private          pathBuffer :ColorBuffer;

  public constructor(canvas:HTMLCanvasElement) {
    this.canvWrap  = new CanvasWrapper(canvas);
    this.style     = SimplexDrawStyle.ITERATION;
    this.drawCalls = 0;
  }

  public initialize(resolution:number, logic:SimplexLogic, style:SimplexDrawStyle):void {
    this.clearCanvas  (          );
    this.setResolution(resolution);

    this.noiseBuffer = new ColorBuffer(
      this.canvWrap.context().getImageData(0, 0, resolution, resolution)
    );

    this.pathBuffer = new ColorBuffer(
      this.canvWrap.context().getImageData(0, 0, resolution, resolution)
    );

    this.setLogic(logic);
    this.setStyle(style);
    this.drawCalls = 0;
  }


  public clearCanvas():void {
    const X:number = this.canvWrap.getCanvas().width;
    const Y:number = this.canvWrap.getCanvas().height;

    this.canvWrap.context().clearRect(0, 0, X, Y);
  }

  public draw():void {
    if(this.drawCalls === 0) {
      this.fillNoiseBuffer();
    }

    switch(this.style) {
    case SimplexDrawStyle.ITERATION:
      this.iterationDraw();
      break;
    case SimplexDrawStyle.NOISEMAP:
      this.noiseMapDraw();
      break;
    case SimplexDrawStyle.EDGE:
      throw new Error();
      // break;
    }

    this.drawCalls++;
  }

  public iterationDraw():void {
    // if(this.drawCalls === 0) {
    //   this.drawNoiseBuffer();
    // }
    const color    :HSL  = new HSL(this.drawCalls * 0.05, 1.0, 0.5);
    const LAST_CELL:Cell = this.logic.getPopulation().getFullArea().peek();

    this.noiseBuffer.writePx(
      LAST_CELL.getX(), LAST_CELL.getY(), Colors.HSLtoRGB(color)
    );

    this.canvWrap.context().putImageData(this.noiseBuffer.getImageData(), 0, 0);
  }

  public noiseMapDraw():void {
    throw new Error();
  }

  public fillNoiseBuffer():void {
    let x:number, y:number;
    const GRID:AttractionGrid = this.logic.getGridWrapper().getGrid();
    for(y = 0; y < GRID.getHeight(); y++) {
    for(x = 0; x < GRID.getWidth();  x++) {
      const ATTRACTION:number = GRID.getCell(x, y).getAttraction() * 255;
      let   color     :RGB    = new RGB(ATTRACTION, ATTRACTION, ATTRACTION);
      this.noiseBuffer.writePx(x, y, color);
    }}
  }

  public drawNoiseBuffer():void {
    this.canvWrap.context().putImageData(this.noiseBuffer.getImageData(), 0, 0);
  }

  public setResolution(resolution:number):void {
    this.canvWrap.setSize(new Point2(resolution, resolution));
  }

  public setStyle(style:SimplexDrawStyle):void {
    this.style = style;
  }

  public setLogic(logic:SimplexLogic):void {
    this.logic = logic;
  }
}
