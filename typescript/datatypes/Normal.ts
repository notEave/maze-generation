import { MinValueExceededError } from '../error/number/MinValueExceededError';
import { MaxValueExceededError } from '../error/number/MaxValueExceededError';

import { NumberC } from './NumberC';
import { Float } from './Float';

export class Normal extends NumberC {

  // STATIC
  public static readonly MIN_VALUE:number = new Float(0.0).get();
  public static readonly MAX_VALUE:number = new Float(1.0).get();

  // INSTANCE

  // CONSTRUCTOR
  public constructor(value:number) {
    Normal.safetyCheck(value);
    super(value);
  }

  // PUBLIC
  public static isSafe(value:number):boolean {
    try {
      NumberC.safetyCheck(value);
      Normal.safetyCheck(value);
      return true;
    } catch(e) {
      return false;
    }
  }

  // PROTECTED

  // PRIVATE
  protected static safetyCheck(value:number) {
    if(Normal.MIN_VALUE > value) {
      throw new MinValueExceededError();
    }

    if(Normal.MAX_VALUE < value) {
      throw new MaxValueExceededError();
    }
  }
}
