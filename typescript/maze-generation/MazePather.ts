import { Integer } from '../datatypes/Integer';
import { Stack } from '../data-structs/Stack';
import { Maze } from './Maze';
import { Cell } from './Cell';
import { Direction } from './Direction';
import { Random } from '../util/Random';

export class MazePather {

  // STATIC

  // INSTANCE
  // TODO add stack for traversed cells
  private readonly maze:Maze;

  private start:Cell;
  private current:Cell;
  private readonly stack:Stack<Cell>;

  // CONSTRUCTOR
  public constructor(maze:Maze) {
    this.maze = maze;
    this.stack = new Stack<Cell>();
  }
  // PUBLIC

  public iterate():void {
    if(this.current === undefined) {
      this.initiatePath();
      return;
    }

    if(this.hasUndiscoveredNeigbor()) {
      this.moveToRandomAvailableNeighbor();
      return;
    }

    if(this.current.equals(this.start)) {
      return;
    }

    this.returnToLast();
  }

  // PROTECTED
  // PRIVATE
  private initiatePath():void {
    if(this.start === undefined) {
      throw new Error();
    }
    this.current = this.start;
    this.current.setPrevious(this.start);
    this.stack.put(this.current);
  }

  private moveToRandomAvailableNeighbor():void {
    let next:Cell;
    let direction:number;

    let neighbors:Cell[] = this.undiscoveredNeighbors();
    while(true) {
      direction = Random.range(0, neighbors.length - 1);
      if(neighbors[direction].equals(this.start)) {
        continue;
      }
      break;
    }

    next = neighbors[direction];

    next.setPrevious(this.current);
    this.current = next;
    this.stack.put(this.current);
  }

  private returnToLast():void {
    this.current = this.current.getPrevious();
    this.stack.put(this.current);
  }

  private hasUndiscoveredNeigbor():boolean {
    // Cell is undiscovered if it has no previous value set
    return this.undiscoveredNeigborCount().get() > 0;
  }

  public undiscoveredNeigborCount():Integer {
    return new Integer(this.undiscoveredNeighbors().length);
  }

  public undiscoveredNeighbors():Cell[] {
    let cell:Cell[] = this.maze.neighborsOf(this.current);
    return cell.filter(v => !v.hasPrevious());
  }

  // SETTER
  public setStart(x:Integer, y:Integer):void {
    const S_X:number = x.get(), S_Y:number = y.get();
    const WIDTH:number = this.maze.getWidth().get(), HEIGHT = this.maze.getHeight().get();

    if(S_X < 0 || S_Y < 0) {
      throw new Error();
    }

    if(S_X >= WIDTH || S_Y >= HEIGHT) {
      throw new Error();
    }

    this.start = this.maze.getCell(x, y);
  }

  // GETTER

  public getStart():Cell {
    return this.start;
  }

  public getCurrent():Cell {
    return this.current;
  }

  public getStack():Stack<Cell> {
    return this.stack;
  }
}
