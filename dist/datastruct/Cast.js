"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cast {
    static ubyte(v) {
        return v & Cast.U_BYTE_MAX;
    }
    static ushort(v) {
        return v & Cast.U_SHORT_MAX;
    }
    static uint(v) {
        return v >>> 0;
    }
    static byte(v) {
        return Cast.ubyte(v) << 24 >> 24;
    }
    static short(v) {
        return Cast.ushort(v) << 16 >> 16;
    }
    static int(v) {
        return v | 0;
    }
    static double(v) {
        return isFinite(v) ? v : 0;
    }
    static float(v) {
        return Math.fround(Cast.double(v));
    }
    static normal(v) {
        if (Cast.double(v) > 1.0)
            return 1.0;
        if (Cast.double(v) < 0.0)
            return 0.0;
        return double(v);
    }
}
Cast.U_BYTE_MIN = 0;
Cast.U_BYTE_MAX = 255;
Cast.S_BYTE_MIN = -128;
Cast.S_BYTE_MAX = 127;
Cast.U_SHORT_MIN = 0;
Cast.U_SHORT_MAX = 65535;
Cast.S_SHORT_MIN = -32768;
Cast.S_SHORT_MAX = 32767;
Cast.U_INT_MIN = 0;
Cast.U_INT_MAX = 4294967295;
Cast.S_INT_MIN = -2147483648;
Cast.S_INT_MAX = 2147483647;
exports.Cast = Cast;
function ubyte(v) {
    return Cast.ubyte(v);
}
exports.ubyte = ubyte;
function ushort(v) {
    return Cast.ushort(v);
}
exports.ushort = ushort;
function uint(v) {
    return Cast.uint(v);
}
exports.uint = uint;
function byte(v) {
    return Cast.byte(v);
}
exports.byte = byte;
function short(v) {
    return Cast.short(v);
}
exports.short = short;
function int(v) {
    return Cast.int(v);
}
exports.int = int;
function double(v) {
    return Cast.double(v);
}
exports.double = double;
function float(v) {
    return Cast.float(v);
}
exports.float = float;
function normal(v) {
    return Cast.normal(v);
}
exports.normal = normal;
