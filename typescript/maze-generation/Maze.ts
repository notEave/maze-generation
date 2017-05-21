import { Integer } from '../datatypes/Integer';
import { Cell } from './Cell';

export class Maze {

  // STATIC
  private static readonly MINIMUM_DIMENSION:Integer = new Integer(1);

  // INSTANCE
  private readonly width:Integer;
  private readonly height:Integer;

  private readonly table:Cell[][];

  // CONSTRUCTOR
  public constructor(width:Integer, height:Integer) {
    if(width.get() < Maze.MINIMUM_DIMENSION.get() || height.get() < Maze.MINIMUM_DIMENSION.get()) {
      throw new Error();
    }

    this.width = width.clone();
    this.height = height.clone();
    this.table = Maze.generateTable(this.width, this.height);
  }

  // PUBLIC
  public static generateTable(width:Integer, height:Integer):Cell[][] {
    let x:number, y:number, i:number;
    let cellTable:Cell[][] = [] as Cell[][];

    for(i = 0; i < width.get(); i++) {
      cellTable[i] = [] as Cell[];
    }
    for(y = 0; y < height.get(); y++) {
    for(x = 0; x < width .get(); x++) {
      cellTable[x][y] = new Cell(new Integer(x), new Integer(y));
    }}
    return cellTable;
  }

  public getCell(x:Integer, y:Integer):Cell {
    if(x.get() < 0 || y.get() < 0) {
      throw new Error();
    }
    if(x.get() >= this.width.get() || y.get() >= this.height.get()) {
      throw new Error();
    }
    return this.table[x.get()][y.get()];
  }

  public neighborsOf(cell:Cell):Cell[] {
    let up:Cell|undefined, right:Cell|undefined, down:Cell|undefined, left:Cell|undefined;
    let table:Cell[] = [];
    // Am I Disabled?
    try {
      up = this.getCell(cell.getX(), new Integer(cell.getY().get() - 1));
    } catch(e) {}
    try {
      right = this.getCell(new Integer(cell.getX().get() + 1), cell.getY());
    } catch(e) {}
    try {
      down = this.getCell(cell.getX(), new Integer(cell.getY().get() + 1));
    } catch(e) {}
    try {
      left = this.getCell(new Integer(cell.getX().get() - 1), cell.getY());
    } catch(e) {}

    if(up    !== undefined) table.push(up)   ;
    if(right !== undefined) table.push(right);
    if(down  !== undefined) table.push(down) ;
    if(left  !== undefined) table.push(left) ;

    return table;
  }


  // PROTECTED
  // PRIVATE
  // SETTER

  // GETTER
  public getWidth():Integer {
    return this.width;
  }

  public getHeight():Integer {
    return this.height;
  }

  public getTable():Cell[][] {
    return this.table;
  }
}
