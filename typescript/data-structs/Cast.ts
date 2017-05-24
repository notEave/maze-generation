export class Cast {
  public static readonly U_BYTE_MIN :number =           0;
  public static readonly U_BYTE_MAX :number =         255;
  public static readonly S_BYTE_MIN :number = -       128;
  public static readonly S_BYTE_MAX :number =         127;

  public static readonly U_SHORT_MIN:number =           0;
  public static readonly U_SHORT_MAX:number =       65535;
  public static readonly S_SHORT_MIN:number = -     32768;
  public static readonly S_SHORT_MAX:number =       32767;

  public static readonly U_INT_MIN  :number =           0;
  public static readonly U_INT_MAX  :number =  4294967295;
  public static readonly S_INT_MIN  :number = -2147483648;
  public static readonly S_INT_MAX  :number =  2147483647;

  export static function ubyte(v:number):number {
    return v & Cast.U_BYTE_MAX;
  }

  export static function ushort(v:number):number {
    return v & Cast.U_SHORT_MAX;
  }

  export static function uint(v:number):number {
    return v >>> 0;
  }

  export static function byte(v:number):number {
    return Cast.ubyte(v) << 24 >> 24;
  }

  export static function short(v:number):number {
    return Cast.ushort(v) << 16 >> 16;
  }

  export static function int(v:number):number {
    return v | 0;
  }

  export static function double(v:number):number {
    return isFinite(v) ? v : 0;
  }

  export static function float(v:number):number {
    return Math.fround(Cast.double(v));
  }
}
