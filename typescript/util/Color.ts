import { StringC }              from './StringC';
import { IllegalArgumentError } from '../error/IllegalArgumentError';
import { normal }               from '../datastructs/Cast';

import { ColorChannel }         from './ColorChannel';

export class Color {
  private static readonly RGB_MULT:number   = 255.0;
  private static readonly ALPHA_MULT:number =   1.0;

  private red  :number;
  private green:number;
  private blue :number;
  private alpha:number;

  constructor(red:number, green:number, blue:number, alpha?:number) {
    this.red   = normal(red);
    this.green = normal(green);
    this.blue  = normal(blue);

    if(alpha !== undefined) {
      this.alpha = normal(alpha);
    } else {
      this.alpha = 1.0;
    }
  }

  public setChannel(channel:ColorChannel, value:number):void {
    switch(channel) {
    case ColorChannel.RED:
      this.red   = normal(value); break;
    case ColorChannel.GREEN:
      this.green = normal(value); break;
    case ColorChannel.BLUE:
      this.blue  = normal(value); break;
    case ColorChannel.ALPHA:
      this.alpha = normal(value); break;
    }
  }

  public getChannel(channel:ColorChannel):number {
    switch(channel) {
    case ColorChannel  .RED: return this.red  ;
    case ColorChannel.GREEN: return this.green;
    case ColorChannel .BLUE: return this.blue ;
    case ColorChannel.ALPHA: return this.alpha;
    }
  }

  private getRrgbValues():number[] {
    const RED  :number = Math.round(this.red   * Color.RGB_MULT);
    const GREEN:number = Math.round(this.green * Color.RGB_MULT);
    const BLUE :number = Math.round(this.blue  * Color.RGB_MULT);
    const ALPHA:number = this.alpha;
    return [RED, GREEN, BLUE, ALPHA];
  }

  public static fromHex(hex:string):Color {
    const HEX_COLOR:RegExp = /^#[0-9a-f]{6}$/gi;

    if(!StringC.contains(hex, HEX_COLOR)) {
      throw new IllegalArgumentError();
    }

    const RED  :number = StringC.parseHex(hex.substr(1, 2)) / Color.RGB_MULT;
    const GREEN:number = StringC.parseHex(hex.substr(3, 2)) / Color.RGB_MULT;
    const BLUE :number = StringC.parseHex(hex.substr(5, 2)) / Color.RGB_MULT;

    return new Color(RED, GREEN, BLUE);
  }

  public toRgb():string {
    const VALUES:number[] = this.getRrgbValues();

    return 'rgb(' +
      VALUES[ColorChannel  .RED] + ',' +
      VALUES[ColorChannel.GREEN] + ',' +
      VALUES[ColorChannel .BLUE] +
      ')';
  }

  public toRgba():string {
    const VALUES:number[] = this.getRrgbValues();

    return 'rgba(' +
      VALUES[ColorChannel  .RED] + ',' +
      VALUES[ColorChannel.GREEN] + ',' +
      VALUES[ColorChannel .BLUE] + ',' +
      VALUES[ColorChannel.ALPHA] +
      ')';
  }
}
