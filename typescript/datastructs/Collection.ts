export interface Collection<T> {
  put(value:T):void;
  pop(index?:number):T;
  peek(index?:number):T;
  length():number;
}
