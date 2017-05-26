"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IllegalArgumentError_1 = require("../error/IllegalArgumentError");
class StringC {
    static parseHex(hex) {
        const PARSED_NUM = Number.parseInt(hex, 16);
        if (isNaN(PARSED_NUM))
            throw new IllegalArgumentError_1.IllegalArgumentError();
        return PARSED_NUM;
    }
    static contains(s, regex) {
        const NO_MATCH_INDEX = -1;
        return s.search(regex) !== NO_MATCH_INDEX;
    }
}
exports.StringC = StringC;
