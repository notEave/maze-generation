import { Shape } from './Shape';
import { Point } from '../util/Point';
import { NaNError } from '../error/NaNError';
import { Geometry } from '../util/Geometry';
import { Color } from '../util/Color';

export class Circle extends Shape {

  // STATIC
  private static readonly S_ANGLE_DEFAULT:number = 0.0;
  private static readonly E_ANGLE_DEFAULT:number = Geometry.TAU;
  private static readonly COUNTER_CLOCKWISE_DEFAULT:boolean = false;

  // INSTANCE
  private radius:number;
  private sAngle:number;
  private eAngle:number;
  private counterClockwise:boolean;

  // CONSTRUCTOR
  public constructor(p:Point, radius:number, color:Color, ctx:CanvasRenderingContext2D) {
    super(p, color, ctx);
    this.setRadius(radius);
    this.sAngle = Circle.S_ANGLE_DEFAULT;
    this.eAngle = Circle.E_ANGLE_DEFAULT;
    this.counterClockwise = Circle.COUNTER_CLOCKWISE_DEFAULT;
  }

  // PUBLIC
  public draw():void {
    this.applyFillStyle();
    this.arc();
    this.fill();
  }

  // PROTECTED
  protected arc():void {
    const P_X:number = this.center.getX();
    const P_Y:number = this.center.getY();
    this.ctx.arc(P_X, P_Y, this.radius, this.sAngle, this.eAngle);
  }

  // PRIVATE

  // SETTER
  public setRadius(radius:number):void {
    if(isNaN(radius))
      throw new NaNError();
    this.radius = radius;
  }

  public setStartAngle(angle:number):void {
    if(isNaN(angle))
    throw new NaNError();
    this.sAngle = angle;
  }

  public setEndAngle(angle:number):void {
    if(isNaN(angle))
      throw new NaNError();
    this.eAngle = angle;
  }

  // GETTER
  public getRadius():number {
    return this.radius;
  }

  public getStartAngle():number {
    return this.sAngle;
  }

  public getEndAngle():number {
    return this.eAngle;
  }
}
