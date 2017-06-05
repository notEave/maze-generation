import { SimplexWrapper } from '../noise/SimplexWrapper';
import { AttractionGrid } from './AttractionGrid';

export class SimplexGrid extends AttractionGrid {
  private readonly simplex:SimplexWrapper;

  public constructor(x:number, y:number, originX:number, originY:number, zoom:number) {
    super(x, y);

    this.simplex = new SimplexWrapper(originX, originY, zoom);

    const NOISE:number[][] = this.simplex.normalNoise2D(x, y);

    let _x:number;
    let _y:number;
    for(_y = 0; _y < super.getHeight(); _y++) {
    for(_x = 0; _x < super.getWidth() ; _x++) {
      super.getCell(_x, _y).setAttraction(NOISE[_x][_y]);
      /*if(NOISE[_x][_y] > 0.55) {
        super.getCell(_x, _y).setAttraction(1.0);
      } else if(NOISE[_x][_y] > 0.333) {
        super.getCell(_x, _y).setAttraction(0.5);
      }*/
    }}
  }
}
