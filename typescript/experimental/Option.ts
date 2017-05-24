import { Float } from '../datatypes/Float';

export class Option {
  private readonly text:string;
  private readonly action:() => void;
  private readonly ctx:CanvasRenderingContext2D;

  public constructor(text:string, action:() => void, ctx:CanvasRenderingContext2D) {
    this.text = text;
    this.action = action;
    this.ctx = ctx;
  }

  public trigger():void {
    this.action.call(this);
  }

  public length():Float {
    return new Float(this.ctx.measureText(this.text).width);
  }

  public draw():void {
    this.ctx.fillText(this.text, 10, 50);
  }
}
