import { Integer } from '../datatypes/Integer';

export class Cell {

  // STATIC

  // INSTANCE
  private readonly x:Integer;
  private readonly y:Integer;
  private previous:Cell;

  // CONSTRUCTOR
  public constructor(x:Integer, y:Integer) {
    this.x = x;
    this.y = y;
  }

  // PUBLIC
  public equals(c:Cell):boolean {
    return this.x.get()  === c.x.get() &&
           this.y.get()  === c.y.get() &&
           this.previous === c.previous;
  }

  public hasPrevious():boolean {
    return this.previous !== undefined;
  }
  // PROTECTED
  // PRIVATE

  // SETTER
  public setPrevious(previous:Cell):void {
    this.previous = previous;
  }

  // GETTER
  public getX():Integer {
    return this.x;
  }

  public getY():Integer {
    return this.y;
  }

  public getPrevious():Cell {
    if(this.previous == null) {
      throw new Error('previous not yet defined');
    }
    return this.previous;
  }
}
