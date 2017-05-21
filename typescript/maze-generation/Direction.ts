import { Random } from '../util/Random';
import { Integer } from '../datatypes/Integer';

export enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT
}

export namespace Direction {
  export function random():Direction {
    switch(Random.range(0, 3)) {
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

  export function relativeX(direction:Direction):Integer {
    if(direction === Direction.LEFT) {
      return new Integer(-1);
    }

    if(direction === Direction.RIGHT) {
      return new Integer(1);
    }

    return new Integer(0);
  }

  export function relativeY(direction:Direction):Integer {
    if(direction === Direction.UP) {
      return new Integer(-1);
    }

    if(direction === Direction.DOWN) {
      return new Integer(1);
    }

    return new Integer(0);
  }
}
