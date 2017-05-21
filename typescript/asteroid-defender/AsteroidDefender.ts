import { NaNError } from '../error/NaNError';

export class AsteroidDefender {
  private width:number;
  private height:number;

  constructor(width:number, height:number) {
    this.setWidth(width);
    this.setHeight(height);
    
  }

  public setWidth(width:number):void {
    if(isNaN(width))
      throw new NaNError();
    this.width = width;

  }

  public setHeight(height:number):void {
    if(isNaN(height))
      throw new NaNError();
    this.height = height;
  }
}
