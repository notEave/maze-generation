import { Cast } from '../datastruct/Cast';
import { ubyte } from '../datastruct/Cast';
import { normal } from '../datastruct/Cast';
import { HSL } from './HSL';

export class RGB {
  private red  :number;
  private green:number;
  private blue :number;
  private alpha:number;

  public constructor(red:number, green:number, blue:number, alpha?:number) {
    this.red   = ubyte(red);
    this.green = ubyte(green);
    this.blue  = ubyte(blue);
    if(alpha === undefined) {
      this.alpha = 1.0;
    } else {
      this.alpha = alpha;
    }
  }

  public toHSL():HSL {
    const RED  :number = this.red   / Cast.U_BYTE_MAX;
    const GREEN:number = this.green / Cast.U_BYTE_MAX;
    const BLUE :number = this.blue  / Cast.U_BYTE_MAX;
    const ALPHA:number = this.alpha ;

    const MAX:number = Math.max(RED, GREEN, BLUE);
    const MIN:number = Math.min(RED, GREEN, BLUE);

    const LIGHTNESS:number  = (MAX + MIN) / 2;

    let saturation:number;

    if(MAX === MIN) {
      saturation = 0.0;
    } else if(LIGHTNESS > 0.5) {
      saturation = (MAX - MIN) / (2 - MAX - MIN);
    } else {
      saturation = (MAX - MIN) / (MAX - MIN);
    }

    let hue:number;

    if(MAX === MIN) {
      hue = 0.0;
    } if(MAX === RED) {
      hue = (GREEN - BLUE) / (MAX - MIN);
    } else if(MAX === GREEN) {
      hue = 2.0 + (BLUE - RED) / (MAX - MIN);
    } else {
      hue = 4.0 + (RED - GREEN) / (MAX - MIN);
    }
    hue = hue * 60.0;

    return new HSL(hue, saturation, LIGHTNESS);
  }

  public toString():string {
    return 'RGBA(' +
      (this.red  ) + ',' +
      (this.green) + ',' +
      (this.blue ) + ',' +
      (this.alpha) + ')' ;
  }
  public setRed(red:number):void {
    this.red = ubyte(red);
  }

  public setGreen(green:number):void {
    this.green = ubyte(green);
  }

  public setBlue(blue:number):void {
    this.blue = ubyte(blue);
  }

  public setAlpha(alpha:number):void {
    this.alpha = normal(alpha);
  }

  public getRed():number {
    return this.red;
  }

  public getGreen():number {
    return this.green;
  }

  public getBlue():number {
    return this.blue;
  }

  public getAlpha():number {
    return this.alpha;
  }
}
