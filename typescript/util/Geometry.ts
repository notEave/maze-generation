import { NaNError } from '../error/NaNError';

export class Geometry {
  static readonly TAU:number = Math.PI * 2;

  public static radians(degrees:number):number {
    const HALF_TURN:number = 180.0;

    if(isNaN(degrees))
      throw new NaNError();

    return degrees * Math.PI / HALF_TURN;
  }

  public static degrees(radians:number):number {
    const HALF_TURN:number = 180.0;

    if(isNaN(radians))
      throw new NaNError();

    return radians * HALF_TURN / Math.PI;
  }
}
