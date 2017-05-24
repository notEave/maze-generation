import { int } from '../datastructs/Cast';
import { Cell } from './Cell';

export class Maze {

  // STATIC
  private static readonly MINIMUM_DIMENSION:number = 1;

  // INSTANCE
  private readonly width:number;
  private readonly height:number;

  private readonly table:Cell[][];

  // CONSTRUCTOR
  public constructor(width:number, height:number) {
    if(width < Maze.MINIMUM_DIMENSION || height < Maze.MINIMUM_DIMENSION) {
      throw new Error();
    }

    this.width = int(width);
    this.height = int(height);
    this.table = Maze.generateTable(this.width, this.height);
  }

  // PUBLIC
  public static generateTable(width:number, height:number):Cell[][] {
    let x:number, y:number, i:number;
    let cellTable:Cell[][] = [] as Cell[][];

    for(i = 0; i < width; i++) {
      cellTable[i] = [] as Cell[];
    }
    for(y = 0; y < height; y++) {
    for(x = 0; x < width ; x++) {
      cellTable[x][y] = new Cell(x, y);
    }}
    return cellTable;
  }

  public getCell(x:number, y:number):Cell {
    if(x < 0 || y < 0) {
      throw new Error();
    }
    if(x >= this.width || y >= this.height) {
      throw new Error();
    }
    return this.table[int(x)][int(y)];
  }

  public neighborsOf(cell:Cell):Cell[] {
    let up:Cell|undefined, right:Cell|undefined, down:Cell|undefined, left:Cell|undefined;
    let table:Cell[] = [];
    // Am I Disabled?
    try {
      up = this.getCell(cell.getX(), cell.getY() - 1);
    } catch(e) {}
    try {
      right = this.getCell(cell.getX() + 1, cell.getY());
    } catch(e) {}
    try {
      down = this.getCell(cell.getX(), cell.getY() + 1);
    } catch(e) {}
    try {
      left = this.getCell(cell.getX() - 1, cell.getY());
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
  public getWidth():number {
    return this.width;
  }

  public getHeight():number {
    return this.height;
  }

  public getTable():Cell[][] {
    return this.table;
  }
}
