import { Maze } from './Maze';
import { MazePather } from './MazePather';
import { List } from '../datastruct/List';
import { Queue } from '../datastruct/Queue';
import { int } from '../datastruct/Cast';
import { Random } from '../util/Random';
import { Cell } from './Cell';
import { ICollection } from '../datastruct/ICollection';

export class MazePatherManager {
  private readonly paths:ICollection<MazePather>;

  public constructor(paths:number, sizeX:number, sizeY:number) {
    this.paths = new Queue<MazePather>();
    let maze:Maze = new Maze(int(sizeX), int(sizeY));
    for(let i:number = 0; i < int(paths); i++) {
      // this.paths.put(new MazePather(new Maze(int(sizeX), int(sizeY))));
      this.paths.put(new MazePather(maze));
    }
  }

  public getPathAmount():number {
    return this.paths.length();
  }

  public addPather(mp:MazePather):void {
    this.paths.put(mp);
  }

  public setStart(maxX:number, maxY:number):void {
    this.paths.toArray().forEach((v:MazePather) => {
      const X:number = Random.rangeInt(0, maxX);
      const Y:number = Random.rangeInt(0, maxY);
      v.setStart(X, Y);
    });
  }

  public iterate():void {
    this.paths.toArray().forEach(v => v.iterate());
  }

  public clonePaths():ICollection<ICollection<Cell>> {
    let paths:ICollection<ICollection<Cell>> = new List<ICollection<Cell>>();

    this.paths.toArray().forEach(v =>  paths.put(v.cloneQueue()));

    return paths;
  }

  public mergePaths():ICollection<Cell> {
    let paths:ICollection<Cell> = new Queue<Cell>();
    let clonedPaths:ICollection<ICollection<Cell>> = this.clonePaths();
    let size:number = clonedPaths.peek(0).length();

    for(let i:number = 0; i < size; i++) {
    for(let k:number = 0; k < clonedPaths.length(); k++) {
      paths.put(clonedPaths.peek(k).take());
    }}

    return paths;
  }
}
