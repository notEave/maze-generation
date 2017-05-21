import { MazePather } from './MazePather';
import { Cell } from './Cell';
import { Stack } from '../data-structs/Stack';
import { Integer } from '../datatypes/Integer'

export class MazeDrawer {
  private readonly mazePather:MazePather;
  private readonly ctx:CanvasRenderingContext2D;

  public constructor(mazePather:MazePather, ctx:CanvasRenderingContext2D) {
    this.mazePather = mazePather;
    this.ctx = ctx;
  }

  public drawPixels():void {
    let stack:Stack<Cell> = this.mazePather.getstack();

    let totalSize = stack.length().get();
    let alpha:number = 0.5;
    this.ctx.fillStyle = `rgba(44,136,152,${alpha})`;
    // while(stack.length().get() > 0) {
      /*alpha = (totalSize - stack.length().get()) / totalSize;
      this.ctx.fillStyle = `rgba(0,0,0,${alpha})`;*/
    let current:Cell = stack.peek();
    this.ctx.fillRect(current.getX().get() * 5, current.getY().get() * 5, 5, 5);
  }
}
