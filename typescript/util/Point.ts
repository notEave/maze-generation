import { double } from '../datastructs/Cast';

export class Point {

  // STATIC

  // INSTANCE
  private x:number;
  private y:number;

  // CONSTRUCTOR
  public constructor(x:number, y:number) {
    this.x = double(x);
    this.y = double(y);
  }

  // PUBLIC
  public distance(p:Point):number {
    return Math.hypot(this.x - p.x, this.y - p.y);
  }

  // PROTECTED

  // PRIVATE

  // SETTER
  public setX(x:number):void {
    this.x = double(x);
  }

  public setY(y:number):void {
    this.y = double(y);
  }

  // GETTER
  public getX():number {
    return this.x;
  }

  public getY():number {
    return this.y;
  }
}
