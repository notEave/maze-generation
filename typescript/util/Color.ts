import { ColorChannel } from './ColorChannel';
import { Normal } from './Normal';
import { NaNError } from '../error/NaNError';
import { StringC } from './StringC';
import { IllegalArgumentError } from '../error/IllegalArgumentError';

export class Color {
  private static readonly RGB_MULT:number   = 255.0;
  private static readonly ALPHA_MULT:number =   1.0;

  private readonly red  :Normal;
  private readonly green:Normal;
  private readonly blue :Normal;
  private readonly alpha:Normal;

  constructor(red:number, green:number, blue:number, alpha?:number) {
    this.red   = new Normal(Normal.MAX_VALUE, Color.RGB_MULT);
    this.green = new Normal(Normal.MAX_VALUE, Color.RGB_MULT);
    this.blue  = new Normal(Normal.MAX_VALUE, Color.RGB_MULT);
    this.alpha = new Normal(Normal.MAX_VALUE, Color.ALPHA_MULT);

    this.red  .setValue(red);
    this.green.setValue(green);
    this.blue .setValue(blue);
    if(alpha !== undefined)
      this.alpha.setValue(alpha);
  }

  public setChannel(channel:ColorChannel, value:number):void {
    switch(channel) {
    case ColorChannel.RED:
      this.red.setValue(value);
      break;
    case ColorChannel.GREEN:
      this.green.setValue(value);
      break;
    case ColorChannel.BLUE:
      this.blue.setValue(value);
      break;
    case ColorChannel.ALPHA:
      this.alpha.setValue(value);
      break;
    }
  }

  public getChannel(channel:ColorChannel):number {
    switch(channel) {
    case ColorChannel  .RED: return this.red  .getScaled();
    case ColorChannel.GREEN: return this.green.getScaled();
    case ColorChannel .BLUE: return this.blue .getScaled();
    case ColorChannel.ALPHA: return this.alpha.getScaled();
    }
  }

  private getIntegerValues():number[] {
    const RED  :number = Math.round(this.getChannel(ColorChannel.RED  ));
    const GREEN:number = Math.round(this.getChannel(ColorChannel.GREEN));
    const BLUE :number = Math.round(this.getChannel(ColorChannel.BLUE ));
    const ALPHA:number = Math.round(this.getChannel(ColorChannel.ALPHA));

    return [RED, GREEN, BLUE, ALPHA];
  }

  public static fromHex(hex:string):Color {
    const HEX_COLOR:RegExp = /^#[0-9a-f]{6}$/gi;

    if(!StringC.contains(hex, HEX_COLOR))
      throw new IllegalArgumentError();

    const RED  :number = StringC.parseHex(hex.substr(1, 2)) / Color.RGB_MULT;
    const GREEN:number = StringC.parseHex(hex.substr(3, 2)) / Color.RGB_MULT;
    const BLUE :number = StringC.parseHex(hex.substr(5, 2)) / Color.RGB_MULT;

    return new Color(RED, GREEN, BLUE);
  }

  public toRgb():string {
    const VALUES:number[] = this.getIntegerValues();

    return 'rgb(' +
      VALUES[ColorChannel  .RED] + ',' +
      VALUES[ColorChannel.GREEN] + ',' +
      VALUES[ColorChannel .BLUE] +
      ')';
  }

  public toRgba():string {
    const VALUES:number[] = this.getIntegerValues();

    return 'rgba(' +
      VALUES[ColorChannel  .RED] + ',' +
      VALUES[ColorChannel.GREEN] + ',' +
      VALUES[ColorChannel .BLUE] + ',' +
      VALUES[ColorChannel.ALPHA] +
      ')';
  }
}
