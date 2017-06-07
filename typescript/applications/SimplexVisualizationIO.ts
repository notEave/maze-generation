import { SimplexVisualizationColor } from './SimplexVisualizationColor';

export class SimplexVisualizationIO {

  private seed         :HTMLInputElement ;
  private resolution   :HTMLInputElement ;
  private compression  :HTMLInputElement ;
  private noiseLayerAmt:HTMLInputElement ;
  private colorScheme  :HTMLSelectElement;

  public constructor() {
    this.seed          = $('seed')               as HTMLInputElement ;
    this.resolution    = $('resolution')         as HTMLInputElement ;
    this.compression   = $('compression-level')  as HTMLInputElement ;
    this.noiseLayerAmt = $('noise-layer-amount') as HTMLInputElement ;
    this.colorScheme   = $('color-scheme')       as HTMLSelectElement;
  }

  public getSeed():number {
    return Number.parseInt(this.seed.value, 10);
  }

  public getResolution():number {
    return Number.parseInt(this.resolution.value, 10);
  }

  public getCompression():number {
    return Number.parseInt(this.compression.value, 10);
  }

  public getNoiseLayerAmt():number {
    return Number.parseInt(this.noiseLayerAmt.value, 10);
  }

  public getColorScheme():SimplexVisualizationColor {
    if(this.colorScheme.value === 'iteration-based') {
      return SimplexVisualizationColor.ITERATION;
    } else {
      return SimplexVisualizationColor.NOISEMAP;
    }
  }
}

function $(id:string):HTMLElement {
  return document.getElementById(id) as HTMLElement;
}
