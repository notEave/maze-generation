// DEPRECATED

import { NotAnIntegerError } from '../error/number/NotAnIntegerError';
import { NumberC } from './qNumberC';

export class Integer extends NumberC {

  // STATIC
  public static readonly MIN_VALUE:number = NumberC.MIN_VALUE;
  public static readonly MAX_VALUE:number = NumberC.MAX_VALUE;

  // INSTANCE

  // CONSTRUCTOR
  public constructor(value:number) {
    Integer.safetyCheck(value);
    super(value);
  }

  // PUBLIC
  public static isSafe(value:number):boolean {
    try {
      NumberC.safetyCheck(value);
      Integer.safetyCheck(value);
      return true;
    } catch(e) {
      return false;
    }
  }

  public clone():Integer {
    return new Integer(this.get());
  }

  // PROTECTED

  // PRIVATE
  protected static safetyCheck(value:number):void {
    if(!Number.isInteger(value)) {
      throw new NotAnIntegerError();
    }
  }

  // SETTER
  public set(value:number):number {
    Integer.safetyCheck(value);
    return super.set(value);
  }

  // GETTER
}
