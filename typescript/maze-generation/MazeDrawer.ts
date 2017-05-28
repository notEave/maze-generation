import { MazePather } from './MazePather';
import { Cell } from './Cell';
import { ICollection } from '../datastruct/ICollection';
import { List } from '../datastruct/List';
import { MazePatherManager } from './MazePatherManager';
import { HSL } from '../color/HSL';
import { Random } from '../util/Random';

export class MazeDrawer {
  private readonly manager:MazePatherManager;
  private readonly ctx:CanvasRenderingContext2D;
  private readonly pixelMult:number;
  private readonly paths:number;
  private readonly colors:ICollection<HSL>;

  public constructor(manager:MazePatherManager, ctx:CanvasRenderingContext2D, pixelMult:number) {
    this.manager = manager;
    this.paths = this.manager.getPathAmount();
    this.ctx = ctx;
    this.pixelMult = pixelMult;

    this.colors = new List<HSL>();

    for(let i:number = 0; i < this.paths; i++) {
      this.colors.put(new HSL(Random.range(0, 360), 0.5, 0.5, 0.3));
    }
  }

  public drawPixels():void {
    let path:ICollection<Cell> = this.manager.mergePaths();

    for(let i:number = 0; i < this.paths; i++) {
      this.ctx.fillStyle = this.colors.peek(i).toString();
      let current:Cell = path.toArray()[path.length() - 1 - i];
      this.ctx.fillRect(current.getX() * this.pixelMult, current.getY() * this.pixelMult, this.pixelMult, this.pixelMult);
    }
  }
}
