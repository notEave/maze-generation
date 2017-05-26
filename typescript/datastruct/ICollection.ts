export interface ICollection<T> {
  put(value:T):void;
  peek(index?:number):T;
  pop(index?:number):T;
  length():number;
  clear():void;
  clone():ICollection<T>;
  toArray():T[];
  putAll(arr:T[]):void;
}
