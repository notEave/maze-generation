import { Color } from '../util/Color';
import { Point } from '../util/Point';
import { IDrawable } from './IDrawable';
import { UnsupportedFunctionalityError } from '../error/UnsupportedFunctionalityError';

export abstract class Shape implements IDrawable {

  // STATIC

  // INSTANCE
  protected readonly center:Point;
  protected readonly color:Color;
  protected readonly ctx:CanvasRenderingContext2D;

  // CONSTRUCTOR
  protected constructor(position:Point, color:Color, ctx:CanvasRenderingContext2D) {
    this.center = position;
    this.color = color;
    this.ctx = ctx;
  }

  // PUBLIC
  public draw():void {
    throw new UnsupportedFunctionalityError();
  }

  // PROTECTED
  protected applyFillStyle():void {
    this.ctx.fillStyle = this.color.toRgb();
  }

  protected applyStrokeStyle():void {
    this.ctx.strokeStyle = this.color.toRgb();
  }

  protected stroke():void {
    this.ctx.stroke();
  }

  protected fill():void {
    this.ctx.fill();
  }

  // PRIVATE

  // SETTER

  // GETTER
  public getCenter():Point {
    return this.center;
  }

  public getColor():Color {
    return this.color;
  }

  public getContext():CanvasRenderingContext2D {
    return this.ctx;
  }
}
