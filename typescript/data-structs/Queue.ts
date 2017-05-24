import { Collection } from './Collection';

export class Queue<T> implements Collection<T> {
  private readonly collection:T[];

  public constructor() {
    this.collection = []as T[];
  }

  public put(value:T):void {
    this.collection.push(value);
  }

  public peek():T {
    return this.collection[0];
  }

  public pop():T {
    let v:T = this.peek();
    this.collection.shift();
    return v;
  }

  public length():number {
    return this.collection.length;
  }

  public clone():Queue<T> {
    let collection:Queue<T> = new Queue<T>();
    this.toArray().forEach(v => collection.put(v));
    return collection;
  }

  public toArray():T[] {
    return this.collection.slice();
  }
}
