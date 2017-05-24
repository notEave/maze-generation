import { MinValueExceededError } from '../error/number/MinValueExceededError';
import { MaxValueExceededError } from '../error/number/MaxValueExceededError';

import { NumberC } from './qNumberC';

export class Normal extends NumberC {

  // STATIC
  public static readonly MIN_VALUE:number = 0.0;
  public static readonly MAX_VALUE:number = 1.0;

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
