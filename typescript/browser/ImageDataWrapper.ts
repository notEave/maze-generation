import { RGB } from  '../color/RGB';
import { uint } from '../datastruct/Cast';

export class ImageDataWrapper {
  private readonly img:ImageData;

  public constructor(img:ImageData) {
    this.img = img;
  }

  public writePixel(x:number, y:number, color:RGB):void {
    const OFFSET:number = 4 * this.img.width * y + x * 4;

    this.img.data[OFFSET    ] =      color.getRed  ()       ;
    this.img.data[OFFSET + 1] =      color.getGreen()       ;
    this.img.data[OFFSET + 2] =      color.getBlue ()       ;
    this.img.data[OFFSET + 3] = uint(color.getAlpha() * 255);
  }

  public readPixel(x:number, y:number):RGB {
    const OFFSET:number = 4 * this.img.width * y + 4 * x;

    const R:number = this.img.data[OFFSET    ];
    const G:number = this.img.data[OFFSET + 1];
    const B:number = this.img.data[OFFSET + 2];
    const A:number = this.img.data[OFFSET + 3];
    return new RGB(R, G, B, A);
  }

  public getImageData():ImageData {
    return this.img;
  }

  public getWidth():number {
    return this.img.width;
  }

  public getHeight():number {
    return this.img.height;
  }
}
