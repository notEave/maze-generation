import { NaNError } from '../error/NaNError';

export class Point {
  
  // STATIC

  // INSTANCE
  private x:number;
  private y:number;

  // CONSTRUCTOR
  public constructor(x:number, y:number) {
    if(isNaN(x) || isNaN(y))
      throw new NaNError();
    this.x = x;
    this.y = y;
  }

  // PUBLIC
  public distance(p:Point):number {
    return Math.hypot(this.x - p.x, this.y - p.y);
  }

  // PROTECTED

  // PRIVATE

  // SETTER
  public setX(x:number):void {
    if(isNaN(x))
    throw new NaNError();
    this.x = x;
  }

  public setY(y:number):void {
    if(isNaN(y))
    throw new NaNError();
    this.y = y;
  }

  // GETTER
  public getX():number {
    return this.x;
  }

  public getY():number {
    return this.y;
  }
}
