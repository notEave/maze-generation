import { RGB } from './color/RGB';
import { HSL } from './color/HSL';
import { Colors } from './color/Colors';

class Main {
  public static main():void {
    for(let i = 0; i < 3; i++) {
      for(let n = 0; n < 256; n++) {
        if(i === 0) {
          console.log(new RGB(n,0,0).toString());
          console.log(Colors.HSLtoRGB(Colors.RGBtoHSL(new RGB(n, 0, 0))).toString());
        } else if(i === 1) {
          console.log(new RGB(0, n, 0).toString());
          console.log(Colors.HSLtoRGB(Colors.RGBtoHSL(new RGB(0, n, 0))).toString());
        } else if(i === 2) {
          console.log(new RGB(0,0,n).toString());
          console.log(Colors.HSLtoRGB(Colors.RGBtoHSL(new RGB(0,0,n))).toString());
        }
      }
    }
  }
}

Main.main();
