import { MazePather } from './MazePather';
import { Cell } from './Cell';
import { Stack } from '../datastructs/Stack';

export class MazeDrawer {
  private readonly mazePather:MazePather;
  private readonly ctx:CanvasRenderingContext2D;

  public constructor(mazePather:MazePather, ctx:CanvasRenderingContext2D) {
    this.mazePather = mazePather;
    this.ctx = ctx;
  }

  public drawPixels():void {
    let stack:Stack<Cell> = this.mazePather.getStack().clone();
    let totalSize:number = stack.length();

    let alpha:number = 0.5;
    let i:number = 0;
    this.ctx.fillStyle = `rgba(44,136,152,${alpha})`;

    while(stack.length() > 0) {
      i++;
      alpha = (50 - i) / 50;
      if(alpha < 0.5) alpha = 0.5;
      this.ctx.fillStyle = `rgba(44,136,152,${alpha})`;
      let current:Cell = stack.pop();
      this.ctx.fillRect(current.getX() * 5, current.getY() * 5, 5, 5);
    }
  }
}
