import { MultiSimplex } from '../noise/MultiSimplex';
import { AttractionGrid } from './AttractionGrid';

export class SimplexGrid extends AttractionGrid {
  private readonly simplex:MultiSimplex;

  public constructor(x:number, y:number, simplex:MultiSimplex) {
    super(x, y);
    this.simplex = simplex;

    const NOISE:number[][] = this.simplex.normalNoise2D(x, y);

    let _x:number;
    let _y:number;
    for(_y = 0; _y < super.getHeight(); _y++) {
    for(_x = 0; _x < super.getWidth() ; _x++) {
      // super.getCell(_x, _y).setAttraction(NOISE[_x][_y]);
      if(NOISE[_x][_y] > 0.55) {
        super.getCell(_x, _y).setAttraction(1.0);
      } else if(NOISE[_x][_y] > 0.333) {
        super.getCell(_x, _y).setAttraction(0.5);
      }
    }}
  }
}
