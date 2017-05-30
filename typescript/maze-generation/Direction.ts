import { Random } from '../util/Random';

export enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT
}

export namespace Direction {
  export function random():Direction {
    switch(Random.rangeInt(0, 4)) {
    case 0:
      return Direction.UP;
    case 1:
      return Direction.RIGHT;
    case 2:
      return Direction.DOWN;
    case 3:
      return Direction.LEFT;
    }

    throw new Error();
  }
}
