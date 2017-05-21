export class Time {
  private readonly start:number;

  private frameStart:number;
  private frameEnd:number;

  private currentFrame:number;

  private physicsStart:number;
  private physicsEnd:number;

  private drawStart:number;
  private drawEnd:number;

  constructor() {
    this.start = Time.highResolutionTime();
    this.currentFrame = 0;
  }

  public static highResolutionTime():number {
    return window.performance.now();
  }

  public static timeSinceUnixEpoch():number {
    return window.performance.timing.navigationStart + Time.highResolutionTime();
  }

  public deltaFrame():number {
    return this.frameEnd - this.frameStart;
  }

  public deltaPhysics():number {
    return this.physicsEnd - this.physicsStart;
  }

  public deltaDraw():number {
    return this.drawEnd - this.drawStart;
  }

  public setFrameStart():void {
    this.frameStart = Time.highResolutionTime();
  }

  public setFrameEnd():void {
    this.frameEnd = Time.highResolutionTime();
  }

  public setPhysicsStart():void {
    this.physicsStart = Time.highResolutionTime();
  }

  public setPhysicsEnd():void {
    this.physicsEnd = Time.highResolutionTime();
  }

  public setDrawStart():void {
    this.drawStart = Time.highResolutionTime();
  }

  public setDrawEnd():void {
    this.drawEnd = Time.highResolutionTime();
  }

  public getCurrentFrame():number {
    return this.currentFrame;
  }

  public iterateCurrentFrame():void {
    this.currentFrame++;
  }
}
