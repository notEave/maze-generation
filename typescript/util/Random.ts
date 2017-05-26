import { Time } from './Time';

import { double, int } from '../datastruct/Cast';

export class Random {
  private static readonly SEED_MULTIPLIER:number = 100000.0;

  private readonly seed:number;

  constructor(seed:number) {
    this.seed = double(seed);
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

      return Math.floor(Random.normal() * (double(max) - double(min) + INCLUSION_OFFSET) + double(min));
    }

    /**
    * generate an array of normalized numbers
    */
    public static numbers(size:number):number[] {
      const MINIMUM_SIZE:number = 1;
      let numbers:number[];
      let i:number;

      if(int(size) < MINIMUM_SIZE)
        throw new RangeError('Argument must be equal or larger than ' + MINIMUM_SIZE);

      numbers = [];

      for(i = 0; i < int(size); i++)
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
      return Math.sin(double(seed));
    }
}
