import { Integer } from '../datatypes/Integer';
import { Collection } from './Collection';

export class Stack<T> implements Collection<T> {
  private readonly stack:T[];

  public constructor() {
    this.stack = [] as T[];
  }

  public put(value:T):void {
    this.stack.push(value);
  }

  public peek():T {
    return this.stack[this.stack.length - 1];
  }

  public pop():T {
    let v:T = this.peek();
    this.stack.pop();
    return v;
  }

  public length():Integer {
    return new Integer(this.stack.length);
  }

  public clone():Stack<T> {
    let stack:Stack<T> = new Stack<T>();
    this.toArray().forEach(v => stack.put(v));
    return stack;
  }

  public toArray():T[] {
    return this.stack.slice();
  }
}
