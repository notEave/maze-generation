import { NaNError } from '../error/NaNError';

export class MathC {

  public static average(numbers:number[]): number {
    let total:number;

    if(numbers.length === 0)
      throw new Error("Supplied array is empty");

    total = 0;

    numbers.forEach(v => {
      if(isNaN(v))
        throw new NaNError();
      else
        total += v;
    });

    return total / numbers.length;
  }

  /**
  * PHP style rounding function
  */
  public static round(value:number, precision?:number):number {
    const DEFAULT_PRECISION:number = 0;
    const PRECISION_MULT:number = 10;
    let valueMult:number;
    let raisedValue:number;

    if(precision === undefined)
      precision = DEFAULT_PRECISION;

    if(isNaN(precision))
      throw new NaNError();

    valueMult = Math.pow(PRECISION_MULT, precision);

    return Math.round(value * valueMult) / valueMult;
  }

  public static floor(value:number, precision?:number):number {
    const DEFAULT_PRECISION:number = 0;
    const PRECISION_MULT:number = 10;
    let valueMult:number;
    let raisedValue:number;

    if(precision === undefined)
      precision = DEFAULT_PRECISION;

    if(isNaN(precision))
      throw new NaNError();

    valueMult = Math.pow(PRECISION_MULT, precision);

    return Math.floor(value * valueMult) / valueMult;
  }

  public static ceil(value:number, precision?:number):number {
    const DEFAULT_PRECISION:number = 0;
    const PRECISION_MULT:number = 10;
    let valueMult:number;
    let raisedValue:number;

    if(precision === undefined)
      precision = DEFAULT_PRECISION;

    if(isNaN(precision))
      throw new NaNError();

    valueMult = Math.pow(PRECISION_MULT, precision);

    return Math.ceil(value * valueMult) / valueMult;
  }
}
