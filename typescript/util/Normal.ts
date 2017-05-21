import { NaNError } from '../error/NaNError';

export class Normal {
  public static readonly MIN_VALUE:number = 0.0;
  public static readonly MAX_VALUE:number = 1.0;
  private static readonly SCALE_DEFAULT:number = 1.0;

  private scale:number;
  private value:number;
  constructor(value:number, scale?:number) {
    this.setValue(value);
    if(scale === undefined)
      this.scale = Normal.SCALE_DEFAULT;
    else
      this.setScale(scale);
  }

  public setValue(value:number):void {
    if(isNaN(value))
      throw new NaNError();
    if(value < Normal.MIN_VALUE)
      throw new RangeError('Given argument smaller than allowed minimum size ' + Normal.MIN_VALUE);
    if(value > Normal.MAX_VALUE)
      throw new RangeError('Given argument larger than allowed maximum size ' + Normal.MAX_VALUE);
    this.value = value;
  }

  private setScale(scale:number) {
    if(isNaN(scale))
      throw new NaNError();
    this.scale = scale;
  }

  public getNormal():number {
    return this.value;
  }

  public getScaled():number {
    return this.value * this.scale;
  }
}
