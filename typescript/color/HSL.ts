import { double } from '../datastructs/Cast';

import { IColor } from './IColor';

export class HSL implements IColor {
  private hue:number;
  private saturation:number;
  private lightness:number;

  public constructor(hue:number, saturation:number, lightness:number) {
    this.hue = double(hue);
    this.saturation = double(saturation);
    this.lightness = double(lightness);
  }

  public setHue(hue:number):void {
    this.hue = double(hue);
  }

  public setSaturation(saturation:number):void {
    this.saturation = double(saturation);
  }

  public setLightness(lightness:number):void {
    this.lightness = double(lightness);
  }

  public getHue():number {
    return this.hue;
  }

  public getSaturation():number {
    return this.saturation;
  }

  public getLightness():number {
    return this.lightness;
  }
}
