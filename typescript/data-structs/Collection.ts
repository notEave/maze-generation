import { Integer } from '../datatypes/Integer';

export interface Collection<T> {
  put(value:T):void;
  pop():T;
  peek():T;
  length():Integer;
}
