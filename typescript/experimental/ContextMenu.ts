import { List } from '../data-structs/List';
import { Integer } from '../datatypes/Integer';
import { Float } from '../datatypes/Float';
import { Canvas } from '../browser/Canvas';
import { Point } from '../util/Point';
import { Mouse } from '../browser/Mouse';

import { Option } from './Option';

export class ContextMenu {
  private readonly options:List<Option>;
  private readonly canvas:Canvas;
  private readonly position:Point;
  private readonly mouse:Mouse;

  public constructor(position:Point, canvas:Canvas, mouse:Mouse) {
    this.options = new List<Option>();
    this.canvas = canvas;
    this.position = position;
    this.mouse = mouse;
  }

  public addOption(option:Option):void {
    this.options.put(option);
  }

  public length():Integer {
    return this.options.length();
  }

  public width():Integer {
    let i:Integer;
    let longest:Float = new Float(0);

    for(i = new Integer(0); i.get() < this.options.length().get(); i.postIncrement()) {
      if(this.options.peek(i).length().get() > longest.get()) {
        longest = this.options.peek(i).length();
      }
    }

    return new Integer(Math.ceil(longest.get()));
  }

  public height():Integer {
    return new Integer(200);
  }

  private localMousePosition():Point {
    let x:Float = new Float(this.mouse.getLocalPosition().getX() - this.position.getX());
    let y:Float = new Float(this.mouse.getLocalPosition().getY() - this.position.getY());

    return new Point(x.get(), y.get());
  }

  public mouseInsideMenu():boolean {
    let mousePosition:Point = this.localMousePosition();
    return mousePosition.getX() >= 0 &&
           mousePosition.getY() >= 0 &&
           mousePosition.getX() < this .width().get() &&
           mousePosition.getY() < this.height().get();
  }

  public draw():void {
    if(this.mouseInsideMenu()) {
      this.canvas.getContext().fillStyle = 'rgb(255,0,0)';
    } else {
      this.canvas.getContext().fillStyle = 'rgb(200,0,0)';
    }
    this.canvas.getContext().fillRect(this.position.getX(), this.position.getY(), this.width().get() - 1, this.height().get() - 1);
    this.canvas.getContext().strokeRect(this.position.getX() - 0.5, this.position.getY() - 0.5, this.width().get(), this.height().get());

    this.canvas.getContext().strokeRect(this.mouse.getLocalPosition().getX() -1.5, this.mouse.getLocalPosition().getY() -1.5, 3, 3);
    this.canvas.getContext().fillStyle = 'white';

    this.canvas.getContext().fillRect(this.mouse.getLocalPosition().getX(), this.mouse.getLocalPosition().getY(), 1, 1);
    this.options.peek(new Integer(0)).draw();
  }
}
