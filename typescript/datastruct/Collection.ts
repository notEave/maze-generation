import { ICollection } from './ICollection';

export abstract class Collection<T> implements ICollection<T> {
  protected readonly collection:T[];

  protected constructor() {
    this.collection = [] as T[];
  }

  public put(value:T):void {
    this.collection.push(value);
  }

  public peek(index?:number):T {
    throw new Error('Unsupported functionality');
  }

  public pop(index?:number):T {
    throw new Error('Unsupported functionality');
  }

  public length():number {
    return this.collection.length;
  }

  public clear():void {
    this.collection.length = 0;
  }

  public clone():ICollection<T> {
    throw new Error('Unsupported functionality');
  }

  public toArray():T[] {
    return this.collection.slice();
  }

  public putAll(arr:T[]):void {
    arr.forEach(v => this.put(v));
  }

  protected first():T {
    return this.collection[0];
  }

  protected last():T {
    return this.collection[this.collection.length - 1];
  }

  protected index(index:number):T {
    return this.collection[index];
  }
}
