import { ICollection } from '../datastruct/ICollection';
import { List } from '../datastruct/List';
import { uint } from '../datastruct/Cast';

import { SimplexWrapper } from './SimplexWrapper';

export class MultiSimplex {
  private readonly coll:ICollection<SimplexWrapper>;

  public constructor() {
    this.coll = new List<SimplexWrapper>();
  }

  public addLayer(originx:number, originy:number, amplitude:number, frequency:number):void {
    this.coll.put(new SimplexWrapper(originx, originy, amplitude, frequency));
  }

  public noise2D(sx:number, sy:number):number[][] {
    if(this.coll.length() === 0) {
      throw new Error('Multisimplex is empty');
    }

    const ARR:number[][] = this.coll.peek(0).noise2D(uint(sx), uint(sy));

    let noise:number[][];
    let y:number, x:number;
    for(let i:number = 1; i < this.coll.length(); i++) {
      noise = this.coll.peek(i).positiveNoise2D(uint(sx), uint(sy));
      for(y = 0; y < sy; y++) {
      for(x = 0; x < sx; x++) {
        ARR[x][y] += noise[x][y];
      }}
    }

    return ARR;
  }

  public normalNoise2D(sx:number, sy:number):number[][] {
    const ARR:number[][] = this.noise2D(sx, sy);

    let x:number, y:number;
    let max:number = 0;
    for(y = 0; y < sy; y++) {
    for(x = 0; x < sx; x++) {
      if(ARR[x][y] > max) max = ARR[x][y];
    }}

    for(y = 0; y < sy; y++) {
    for(x = 0; x < sx; x++) {
      ARR[x][y] /= max;
    }}

    return ARR;
  }

  public noise1D(length:number):number[] {
    if(this.coll.length() === 0) {
      throw new Error('Multisimplex is empty');
    }

    const ARR:number[] = this.coll.peek(0).noise1D(uint(length));

    for(let i:number = 1; i < this.coll.length(); i++) {
      this.coll.peek(i).positiveNoise1D(uint(length)).forEach((v:number, j:number) => {
        ARR[j] += v;
      });
    }

    return ARR;
  }

  public normalNoise1D(length:number):number[] {
    const ARR:number[] = this.noise1D(length);
    const MAX:number = Math.max(...ARR);
    return ARR.map(v => v /= MAX);
  }
}
