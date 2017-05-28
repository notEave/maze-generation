import { MazePather } from './MazePather';
import { List } from '../datastruct/List';
import { Queue } from '../datastruct/Queue';

import { Cell } from './Cell';
import { ICollection } from '../datastruct/ICollection';

export class MazePatherManager {
  private readonly paths:ICollection<MazePather>;

  public constructor() {
    this.paths = new Queue<MazePather>();
  }

  public addPather(mp:MazePather):void {
    this.paths.put(mp);
  }

  public setStart(x:number, y:number):void {
    this.paths.toArray().forEach(v => v.setStart(x, y));
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
