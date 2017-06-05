import { Simplex } from './Simplex';
import { Point2 } from '../space/Point2';
import { double, uint } from '../datastruct/Cast';

export class SimplexWrapper {

  private readonly origin:Point2;
  private resolution:number;

  /*
  * origin:Point2, resolution
  * Create a wrapper class for simple handling of simplex noise,
  * Origin is the x,y point where simplex generation starts,
  * resolution is the amount between generated simplex point.
  */
  public constructor(resolution:number, x:number|Point2, y?:number) {
    this.resolution = double(resolution);

    if(x instanceof Point2) {
      this.origin = x;
    } else {
      this.origin = new Point2(double(x), double(y || 0));
    }
  }

  public moveOrigin(x:number, y:number):void {
    this.origin.setX(this.origin.getX() + double(x));
    this.origin.setY(this.origin.getY() + double(y));
  }

  public noiseAt(x:number, y?:number):number {
    const X:number = this.origin.getX() + double(x);
    const Y:number = this.origin.getY() + double(y || 0);
    return Simplex.noise(X, Y);
  }

  public normalNoiseAt(x:number, y?:number):number {
    return SimplexWrapper.limitRange(this.noiseAt(x,y));
  }

  public noise2D(sx:number, sy:number):number[][] {
    const STEP_X:number = this.resolution / sx;
    const STEP_Y:number = this.resolution / sy;
    const START_X:number = this.origin.getX() - STEP_X * sx / 2;
    const START_Y:number = this.origin.getY() - STEP_Y * sy / 2;

    return (new Array<Array<number>>(uint(sx)).fill([])
      .map((v:number[], x:number) => {
        return new Array<number>(uint(sy)).fill(0).map((n:number, y:number) => {
          const X:number = START_X  + x * STEP_X;
          const Y:number = START_Y  + y * STEP_Y;
          return Simplex.noise(X, Y);
      });
    }));
  }

  public normalNoise2D(sx:number, sy:number):number[][] {
    return this.noise2D(sx, sy).map((n:number[]) => {
      return n.map((v:number) => {
        return SimplexWrapper.limitRange(v);
      });
    });
  }

  public noise1D(length:number):number[] {
    const STEP:number = this.resolution / length;
    const START:number = this.origin.getX() - STEP * length / 2;
    return new Array<number>(uint(length)).fill(0).map((v:number, x:number) => {
      const X:number = START + x * STEP;
      const Y:number = this.origin.getY();
      return Simplex.noise(X, Y);
    });
  }

  public normalNoise1D(length:number):number[] {
    return this.noise1D(length).map((v:number) => {
      return SimplexWrapper.limitRange(v);
    });
  }

  private static limitRange(v:number):number {
    return (v + 1) / 2;
  }

  public setResolution(resolution:number):void {
    this.resolution = double(resolution);
  }

  public getResolution():number {
    return this.resolution;
  }

  public getOrigin():Point2 {
    return this.origin;
  }
}
