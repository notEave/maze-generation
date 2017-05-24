import { Integer } from '../datatypes/Integer';
import { Collection } from './Collection';

export class List<T> implements Collection<T> {
  private readonly collection:T[];

  public constructor() {
    this.collection = [] as T[];
  }

  public put(value:T):void {
    this.collection.push(value);
  }

  public peek(index:Integer):T {
    return this.collection[index.get()];
  }

  public pop(index:Integer):T {
    let v:T = this.peek(index);
    this.collection.splice(index.get(), 1);
    return v;
  }

  public length():Integer {
    return new Integer(this.collection.length);
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
