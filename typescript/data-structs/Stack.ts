import { Integer } from '../datatypes/Integer';
import { Collection } from './Collection';

export class Stack<T> implements Collection<T> {
  private readonly collection:T[];

  public constructor() {
    this.collection = [] as T[];
  }

  public put(value:T):void {
    this.collection.push(value);
  }

  public peek():T {
    return this.collection[this.collection.length - 1];
  }

  public pop():T {
    let v:T = this.peek();
    this.collection.pop();
    return v;
  }

  public length():Integer {
    return new Integer(this.collection.length);
  }

  public clone():Stack<T> {
    let collection:Stack<T> = new Stack<T>();
    this.toArray().forEach(v => collection.put(v));
    return collection;
  }

  public toArray():T[] {
    return this.collection.slice();
  }
}
