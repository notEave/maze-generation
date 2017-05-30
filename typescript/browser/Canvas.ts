import { Point } from '../util/Point';
import { Mouse } from './Mouse';
import { IllegalArgumentError } from '../error/IllegalArgumentError';

export class Canvas {

  // STATIC
  private static readonly UNDEFINED_HTML_ELEMENT_MSG:string = 'missing canvas element';

  // INSTANCE
  private size:Point;

  private readonly canvas:HTMLCanvasElement;
  private readonly context:CanvasRenderingContext2D;

  // CONSTRUCTOR
  public constructor(canvas:HTMLCanvasElement, x:number, y:number) {
    if(canvas === undefined)
      throw new IllegalArgumentError(Canvas.UNDEFINED_HTML_ELEMENT_MSG);

    this.canvas = canvas;

    this.size = new Point(x, y);
    this.updateCanvasSize();

    const ctx:CanvasRenderingContext2D|null = this.canvas.getContext('2d');

    if(ctx === null)
      throw new IllegalArgumentError();

    this.context = ctx;
  }

  // PUBLIC
  public updateCanvasSize():void {
    this.canvas.width = this.size.getX();
    this.canvas.height = this.size.getY();
  }

  public clear():void {
    this.getContext().clearRect(0, 0, this.size.getX(), this.size.getY());
  }

  // PROTECTED

  // PRIVATE

  // SETTER
  public setSize(point:Point):void {
    if(!Number.isInteger(point.getX()) || !Number.isInteger(point.getY()))
      throw new IllegalArgumentError();
    this.size = point;
  }

  // GETTER
  public getContext():CanvasRenderingContext2D {
    return this.context;
  }

  public getWidth():number {
    return this.size.getX();
  }

  public getHeight():number {
    return this.size.getY();
  }
}
