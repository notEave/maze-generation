import { int } from '../datastruct/Cast';

export class Cell {

  // STATIC

  // INSTANCE
  private readonly x:number;
  private readonly y:number;
  private previous:Cell;

  // CONSTRUCTOR
  public constructor(x:number, y:number) {
    this.x = int(x);
    this.y = int(y);
  }

  // PUBLIC
  public equals(c:Cell):boolean {
    return this.x  === c.x &&
           this.y  === c.y &&
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
  public getX():number {
    return this.x;
  }

  public getY():number {
    return this.y;
  }

  public getPrevious():Cell {
    if(this.previous == null) {
      throw new Error('previous not yet defined');
    }
    return this.previous;
  }
}
