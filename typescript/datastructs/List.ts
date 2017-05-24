import { Collection } from './Collection';
import { int } from './Cast';

export class List<T> implements Collection<T> {
  private readonly collection:T[];

  public constructor() {
    this.collection = [] as T[];
  }

  public put(value:T):void {
    this.collection.push(value);
  }

  public peek(index:number):T {
    return this.collection[int(index)];
  }

  public pop(index:number):T {
    let v:T = this.peek(index);
    this.collection.splice(int(index), 1);
    return v;
  }

  public length():number {
    return this.collection.length;
  }

  public clone():List<T> {
    let collection:List<T> = new List<T>();
    this.toArray().forEach(v => collection.put(v));
    return collection;
  }

  public toArray():T[] {
    return this.collection.slice();
  }
}
