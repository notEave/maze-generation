import { Integer } from '../datatypes/Integer';

export interface Collection<T> {
  put(value:T):void;
  pop(index?:Integer):T;
  peek(index?:Integer):T;
  length():Integer;
}
