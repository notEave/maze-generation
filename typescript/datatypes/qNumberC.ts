// DEPRECATED

import { NaNError } from '../error/number/NaNError';
import { PositiveInfinityError } from '../error/number/PositiveInfinityError';
import { NegativeInfinityError } from '../error/number/NegativeInfinityError';
import { MaxValueExceededError } from '../error/number/MaxValueExceededError';
import { MinValueExceededError } from '../error/number/MinValueExceededError';
import { UnsupportedFunctionalityError } from '../error/UnsupportedFunctionalityError';

export abstract class NumberC {

  // STATIC
  protected static readonly MIN_VALUE:number = -Math.pow(2, 53) + 1;
  protected static readonly MAX_VALUE:number =  Math.pow(2, 53) - 1;

  // INSTANCE
  private value:number;

  // CONSTRUCTOR
  protected constructor(value:number) {
    this.set(value);
  }

  // PUBLIC
  public static isSafe(value:number):boolean {
    try {
      NumberC.safetyCheck(value);
      return true;
    } catch(e) {
      return false;
    }
  }

  public clone():NumberC {
    throw new UnsupportedFunctionalityError();
  }

  public preIncrement():number {
    NumberC.safetyCheck(this.value + 1);
    return ++this.value;
  }

  public preDecrement():number {
    NumberC.safetyCheck(this.value - 1);
    return --this.value;
  }

  public postIncrement():number {
    NumberC.safetyCheck(this.value + 1);
    return this.value++;
  }

  public postDecrement():number {
    NumberC.safetyCheck(this.value - 1);
    return this.value--;
  }

  // PROTECTED
  protected static safetyCheck(value:number):void {
    if(isNaN(value)) {
      throw new NaNError();
    }

    if(Number.POSITIVE_INFINITY === value) {
      throw new PositiveInfinityError();
    }

    if(Number.NEGATIVE_INFINITY === value) {
      throw new NegativeInfinityError();
    }

    if(NumberC.MAX_VALUE < value) {
      throw new MaxValueExceededError();
    }

    if(NumberC.MIN_VALUE > value) {
      throw new MinValueExceededError();
    }
  }

  // PRIVATE

  // SETTER
  public set(value:number):number {
    NumberC.safetyCheck(value);
    this.value = value;
    return this.value;
  }

  // GETTER
  public get():number {
    return this.value;
  }
}
