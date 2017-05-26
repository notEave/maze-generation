"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Random_1 = require("../util/Random");
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["DOWN"] = 2] = "DOWN";
    Direction[Direction["LEFT"] = 3] = "LEFT";
})(Direction = exports.Direction || (exports.Direction = {}));
(function (Direction) {
    function random() {
        switch (Random_1.Random.range(0, 3)) {
            case 0:
                return Direction.UP;
            case 1:
                return Direction.RIGHT;
            case 2:
                return Direction.DOWN;
            case 3:
                return Direction.LEFT;
        }
        throw new Error();
    }
    Direction.random = random;
})(Direction = exports.Direction || (exports.Direction = {}));
