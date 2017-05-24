export class Option {
  private readonly text:string;
  private readonly action:() => void;

  public constructor(text:string, action:() => void) {
    this.text = text;
    this.action = action;
  }

  public trigger():void {
    this.action.call(this);
  }
}
