"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Time_1 = require("./Time");
const Cast_1 = require("../datastruct/Cast");
class Random {
    constructor(seed) {
        this.seed = Cast_1.double(seed);
    }
    static normal() {
        const NEXT = Random.next(Random.seed());
        return NEXT - Math.floor(NEXT);
    }
    static range(min, max) {
        const INCLUSION_OFFSET = 1;
        return Math.floor(Random.normal() * (Cast_1.double(max) - Cast_1.double(min) + INCLUSION_OFFSET) + Cast_1.double(min));
    }
    static numbers(size) {
        const MINIMUM_SIZE = 1;
        let numbers;
        let i;
        if (Cast_1.int(size) < MINIMUM_SIZE)
            throw new RangeError('Argument must be equal or larger than ' + MINIMUM_SIZE);
        numbers = [];
        for (i = 0; i < Cast_1.int(size); i++)
            numbers[i] = Random.normal();
        return numbers;
    }
    static seed() {
        return Time_1.Time.highResolutionTime() * Random.SEED_MULTIPLIER;
    }
    static next(seed) {
        return Math.sin(Cast_1.double(seed));
    }
}
Random.SEED_MULTIPLIER = 100000.0;
exports.Random = Random;
