import { MazePather } from './MazePather';
import { Cell } from './Cell';
import { ICollection } from '../datastruct/ICollection';
import { MazePatherManager } from './MazePatherManager';

export class MazeDrawer {
  private readonly manager:MazePatherManager;
  private readonly ctx:CanvasRenderingContext2D;

  public constructor(manager:MazePatherManager, ctx:CanvasRenderingContext2D) {
    this.manager = manager;
    this.ctx = ctx;
  }

  public drawPixels():void {

    // bootstrap
    let alpha:number = 0.7;
    let fillStyles:string[] = [
      `rgba(152, 147, 44, ${alpha})`,
      `rgba(44, 152, 84, ${alpha})`,
      `rgba(152, 44, 83, ${alpha})`,
      `rgba(44, 103, 152, ${alpha})`,
    ] as string[];

    let path:ICollection<Cell> = this.manager.mergePaths();
    console.log(path.length());
    for(let i:number = 0; i < 4; i++) {
      this.ctx.fillStyle = fillStyles[i];
      let current:Cell = path.toArray()[path.length() - 1 - i];
      this.ctx.fillRect(current.getX() * 4, current.getY() * 4, 4, 4);
    }
  }
}
