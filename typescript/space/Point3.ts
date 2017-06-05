import { Point2 } from './Point2';
import { double } from '../datastruct/Cast';

export class Point3 extends Point2 {
  protected z:number;

  public constructor(x:number, y:number, z:number) {
    super(x, y);
    this.z = double(z);
  }

  public distance(p:Point3):number {
    // return Math.hypot(super.x - p.x, super.y - p.y, this.z - p.z);
    throw new Error('Feature not tested');
  }

  public clone():Point3 {
    return new Point3(super.x, super.y, this.z);
  }

  public setZ(z:number):void {
    this.z = double(z);
  }

  public getZ():number {
    return this.z;
  }
}
