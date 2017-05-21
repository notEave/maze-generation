import { NaNError } from '../error/NaNError';
import { Time } from './Time';

export class Random {
  private static readonly SEED_MULTIPLIER:number = 100000.0;

  private readonly seed:number;

  constructor(seed:number) {
    if(isNaN(seed))
      throw new NaNError();

    this.seed = seed;
    }

    /**
    * Random number between 0(inclusive) and 1(exclusive)
    */
    public static normal():number {
      const NEXT = Random.next(Random.seed());
      return NEXT - Math.floor(NEXT);
    }

    /**
    * Random number between min(inclusive) and max(inclusive)
    */
    public static range(min:number, max:number):number {
      const INCLUSION_OFFSET:number = 1;

      return Math.floor(Random.normal() * (max - min + INCLUSION_OFFSET) + min);
    }

    /**
    * generate an array of normalized numbers
    */
    public static numbers(size:number):number[] {
      const MINIMUM_SIZE:number = 1;
      let numbers:number[];
      let i:number;

      if(isNaN(size))
        throw new NaNError();

      if(size < MINIMUM_SIZE)
        throw new RangeError('Argument must be equal or larger than ' + MINIMUM_SIZE);

      if(!Number.isInteger(size))
        throw new RangeError('Argument must be an integer');

      numbers = [];

      for(i = 0; i < size; i++)
        numbers[i] = Random.normal();

      return numbers;
    }

    /**
    * generate a seed using Time.highResolutionTime()
    */
    public static seed():number {
      return Time.highResolutionTime() * Random.SEED_MULTIPLIER;
    }

    private static next(seed:number):number {
      if(isNaN(seed))
        throw new NaNError();

      return Math.sin(seed);
    }
}
