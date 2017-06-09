import { int } from '../datastruct/Cast';
import { Vec2 } from '../space/Vec2';
import { Random } from '../util/Random';

import { MultiSimplex } from './MultiSimplex';



export class MultiSimplexWrapper {
  private readonly resolution:number;
  private readonly layers:number;
  private readonly multiSimplex:MultiSimplex;

  public constructor(resolution:number, layers:number) {
    this.resolution = int(resolution);
    this.layers     = int(layers);
    this.multiSimplex = new MultiSimplex();
    this.createLayers();
  }

  private createLayers():void {
    for(let i:number = 1; i <= this.layers; i++) {
      this.multiSimplex.addLayer(
        new Vec2(
          Random.rangeDouble(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
          Random.rangeDouble(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
        ),
        1 / i,
        Math.pow(5, i / 2)
      );
    }
  }

  public normalNoise2D():number[][] {
    return this.multiSimplex.normalNoise2D(this.resolution, this.resolution);
  }
}
