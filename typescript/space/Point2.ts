import { double } from '../datastruct/Cast';

export class Point2 {
  protected x:number;
  protected y:number;

  public constructor(x:number, y:number) {
    this.x = double(x);
    this.y = double(y);
  }

  public distance(p:Point2):number {
    return Math.hypot(this.x - p.x, this.y - p.y);
  }

  public clone():Point2 {
    return new Point2(this.x, this.y);
  }

  public setX(x:number):void {
    this.x = double(x);
  }

  public setY(y:number):void {
    this.y = double(y);
  }

  public getX():number {
    return this.x;
  }

  public getY():number {
    return this.y;
  }
}
