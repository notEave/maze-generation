import { CanvasWrapper } from '../browser/CanvasWrapper';

import { SimplexVisualizationIO } from './SimplexVisualizationIO';
import { SimplexLogic } from './SimplexLogic';

export class SimplexVisualization {
  private readonly canvWrap:CanvasWrapper;
  private readonly sio     :SimplexVisualizationIO;
  private          logic   :SimplexLogic;

  public constructor(canvWrap:CanvasWrapper) {
    this.canvWrap = canvWrap;
    this.sio = new SimplexVisualizationIO(this);
  }

  public start(self:SimplexVisualization):void {
    const RESOLUTION :number = this.sio.getResolution();
    const COMPRESSION:number = this.sio.getCompression();
    const LAYER_NUM  :number = this.sio.getNoiseLayerAmt();

    self.logic = new SimplexLogic(RESOLUTION, COMPRESSION, LAYER_NUM);
    self.cycle();
  }

  public update():void {
  }

  public draw():void {

  }

  public cycle():void {
    console.log(this);

    this.logic.update();
    const lead = this.logic.getPopulation().getFullArea().peek();
    console.log(lead.getX() + " . " + lead.getY());
    requestAnimationFrame(this.cycle);
  }
}
