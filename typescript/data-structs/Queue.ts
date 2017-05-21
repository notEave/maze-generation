import { Integer } from '../datatypes/Integer';
import { Collection } from './Collection';

export class Queue<T> implements Collection<T> {
  private readonly queue:T[];

  public constructor() {
    this.queue = []as T[];
  }

  public put(value:T):void {
    this.queue.push(value);
  }

  public peek():T {
    return this.queue[0];
  }

  public pop():T {
    let v:T = this.peek();
    this.queue.shift();
    return v;
  }

  public length():Integer {
    return new Integer(this.queue.length);
  }

  public clone():Queue<T> {
    let queue:Queue<T> = new Queue<T>();
    this.toArray().forEach(v => queue.put(v));
    return queue;
  }

  public toArray():T[] {
    return this.queue.slice();
  }
}
