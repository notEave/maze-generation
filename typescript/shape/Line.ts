import { Shape } from './Shape';
import { Color } from '../util/Color';
import { Point } from '../util/Point';
import { NaNError } from '../error/NaNError';

export class Line extends Shape {

  // STATIC

  // INSTANCE
  private readonly end:Point;
  private width:number;

  // CONSTRUCTOR
  public constructor(p:Point, e:Point, width:number, color:Color, ctx:CanvasRenderingContext2D) {
    super(p, color, ctx);
    this.end = e;
    this.setWidth(width);
    this.width = width;
  }

  // PUBLIC
  public draw():void {
    this.applyStrokeStyle();
    this.applyLineWidth();
    this.createLine();
    this.stroke();
  }

  // PROTECTED
  protected createLine():void {
    this.beginPath(this.center);
    this.lineTo(this.end);
    this.closePath();
  }

  protected beginPath(point:Point):void {
    this.ctx.beginPath();
    this.moveTo(point);
  }

  protected closePath():void {
    this.ctx.closePath();
  }

  protected moveTo(point:Point):void {
    this.ctx.moveTo(point.getX(), point.getY());
  }

  protected lineTo(point:Point):void {
    this.ctx.lineTo(point.getX(), point.getY());
  }

  protected applyLineWidth():void {
    this.ctx.lineWidth = this.width;
  }

  // PRIVATE

  // SETTER
  public setWidth(width:number):void {
    if(isNaN(width))
    throw new NaNError();
    this.width = width;
  }

  // GETTER
  public getWidth():number {
    return this.width;
  }

  public getEnd():Point {
    return this.end;
  }
}
