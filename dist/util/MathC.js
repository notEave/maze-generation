"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cast_1 = require("../datastruct/Cast");
class MathC {
    static average(numbers) {
        let total;
        if (numbers.length === 0)
            throw new Error("Supplied array is empty");
        total = 0;
        numbers.forEach(v => {
            total += Cast_1.double(v);
        });
        return total / numbers.length;
    }
    static round(value, precision) {
        const DEFAULT_PRECISION = 0;
        const PRECISION_MULT = 10;
        let valueMult;
        let raisedValue;
        if (precision === undefined)
            precision = DEFAULT_PRECISION;
        valueMult = Math.pow(PRECISION_MULT, Cast_1.int(precision));
        return Math.round(Cast_1.double(value) * valueMult) / valueMult;
    }
    static floor(value, precision) {
        const DEFAULT_PRECISION = 0;
        const PRECISION_MULT = 10;
        let valueMult;
        let raisedValue;
        if (precision === undefined)
            precision = DEFAULT_PRECISION;
        valueMult = Math.pow(PRECISION_MULT, Cast_1.int(precision));
        return Math.floor(Cast_1.double(value) * valueMult) / valueMult;
    }
    static ceil(value, precision) {
        const DEFAULT_PRECISION = 0;
        const PRECISION_MULT = 10;
        let valueMult;
        let raisedValue;
        if (precision === undefined)
            precision = DEFAULT_PRECISION;
        valueMult = Math.pow(PRECISION_MULT, Cast_1.int(precision));
        return Math.ceil(Cast_1.double(value) * valueMult) / valueMult;
    }
}
exports.MathC = MathC;
