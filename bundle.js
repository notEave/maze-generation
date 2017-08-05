(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_1 = require("./browser/Canvas");
const MazePatherManager_1 = require("./maze-generation/MazePatherManager");
const MazeDrawer_1 = require("./maze-generation/MazeDrawer");
const Point_1 = require("./util/Point");
const Cast_1 = require("./datastruct/Cast");
class Main {
    static main() {
        document.getElementsByTagName('button')[0].addEventListener('click', Main.init);
    }
    static init() {
        let size;
        let pixelMult;
        let pathMult;
        let pixMultElement = document.getElementById('pixel_multiplier');
        let pathMultElement = document.getElementById('pather_multiplier');
        pixelMult = Number.parseInt(pixMultElement.value);
        pathMult = Number.parseInt(pathMultElement.value);
        size = new Point_1.Point(1000 - 1000 % pixelMult, 640 - 640 % pixelMult);
        Main.canvas = new Canvas_1.Canvas(document.getElementsByTagName('canvas')[0], size.getX(), size.getY());
        Main.pathManager = new MazePatherManager_1.MazePatherManager(pathMult, size.getX() / pixelMult, size.getY() / pixelMult);
        Main.pathManager.setStart(Cast_1.int(size.getX() / pixelMult - 1), Cast_1.int(size.getY() / pixelMult - 1));
        Main.mazeDrawer = new MazeDrawer_1.MazeDrawer(Main.pathManager, Main.canvas.getContext(), pixelMult);
        if (!Main.loopActive) {
            Main.loopActive = true;
            requestAnimationFrame(Main.update);
        }
    }
    static update() {
        Main.pathManager.iterate();
        Main.mazeDrawer.drawPixels();
        requestAnimationFrame(Main.update);
    }
}
Main.loopActive = false;
Main.main();

},{"./browser/Canvas":2,"./datastruct/Cast":4,"./maze-generation/MazeDrawer":11,"./maze-generation/MazePatherManager":13,"./util/Point":14}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("../util/Point");
const IllegalArgumentError_1 = require("../error/IllegalArgumentError");
class Canvas {
    constructor(canvas, x, y) {
        if (canvas === undefined)
            throw new IllegalArgumentError_1.IllegalArgumentError(Canvas.UNDEFINED_HTML_ELEMENT_MSG);
        this.canvas = canvas;
        this.size = new Point_1.Point(x, y);
        this.updateCanvasSize();
        const ctx = this.canvas.getContext('2d');
        if (ctx === null)
            throw new IllegalArgumentError_1.IllegalArgumentError();
        this.context = ctx;
    }
    updateCanvasSize() {
        this.canvas.width = this.size.getX();
        this.canvas.height = this.size.getY();
    }
    clear() {
        this.getContext().clearRect(0, 0, this.size.getX(), this.size.getY());
    }
    setSize(point) {
        if (!Number.isInteger(point.getX()) || !Number.isInteger(point.getY()))
            throw new IllegalArgumentError_1.IllegalArgumentError();
        this.size = point;
    }
    getContext() {
        return this.context;
    }
    getWidth() {
        return this.size.getX();
    }
    getHeight() {
        return this.size.getY();
    }
}
Canvas.UNDEFINED_HTML_ELEMENT_MSG = 'missing canvas element';
exports.Canvas = Canvas;

},{"../error/IllegalArgumentError":8,"../util/Point":14}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cast_1 = require("../datastruct/Cast");
const Cast_2 = require("../datastruct/Cast");
class HSL {
    constructor(hue, saturation, lightness, alpha) {
        this.hue = Cast_1.double(hue) % 360.0;
        this.saturation = Cast_2.normal(saturation);
        this.luminance = Cast_2.normal(lightness);
        if (alpha === undefined) {
            this.alpha = 1.0;
        }
        else {
            this.alpha = alpha;
        }
    }
    toString() {
        return 'HSLA(' + (this.hue) + ',' +
            (this.saturation * 100) + '%,' +
            (this.luminance * 100) + '%,' +
            (this.alpha) + ')';
    }
    setHue(hue) {
        this.hue = Cast_1.double(hue);
    }
    setSaturation(saturation) {
        this.saturation = Cast_2.normal(saturation);
    }
    setLuminance(luminance) {
        this.luminance = Cast_2.normal(luminance);
    }
    setAlpha(alpha) {
        this.alpha = Cast_2.normal(alpha);
    }
    getHue() {
        return this.hue;
    }
    getSaturation() {
        return this.saturation;
    }
    getLuminance() {
        return this.luminance;
    }
    getAlpha() {
        return this.alpha;
    }
}
exports.HSL = HSL;

},{"../datastruct/Cast":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collection {
    constructor() {
        this.collection = [];
    }
    put(value) {
        this.collection.push(value);
    }
    peek(index) {
        throw new Error('Unsupported functionality');
    }
    take(index) {
        throw new Error('Unsupported functionality');
    }
    length() {
        return this.collection.length;
    }
    clear() {
        this.collection.length = 0;
    }
    clone() {
        throw new Error('Unsupported functionality');
    }
    toArray() {
        return this.collection.slice();
    }
    putAll(arr) {
        arr.forEach(v => this.put(v));
    }
    toString() {
        let str = '[';
        this.toArray().forEach((v, i) => {
            if (i === this.length() - 1) {
                str = str.concat(v.toString());
            }
            else {
                str = str.concat(`${v.toString()}, `);
            }
        });
        str = str.concat(']');
        return str;
    }
    first() {
        return this.collection[0];
    }
    last() {
        return this.collection[this.collection.length - 1];
    }
    index(index) {
        return this.collection[index];
    }
}
exports.Collection = Collection;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = require("./Collection");
class List extends Collection_1.Collection {
    constructor() {
        super();
    }
    peek(index) {
        return super.index(index);
    }
    take(index) {
        const value = this.peek(index);
        this.collection.splice(index, 1);
        return value;
    }
    clone() {
        const collection = new List();
        super.toArray().forEach(v => collection.put(v));
        return collection;
    }
}
exports.List = List;

},{"./Collection":5}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = require("./Collection");
class Queue extends Collection_1.Collection {
    constructor() {
        super();
    }
    peek() {
        return super.first();
    }
    take() {
        const value = this.peek();
        this.collection.shift();
        return value;
    }
    clone() {
        const collection = new Queue();
        super.toArray().forEach(v => collection.put(v));
        return collection;
    }
}
exports.Queue = Queue;

},{"./Collection":5}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IllegalArgumentError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.IllegalArgumentError = IllegalArgumentError;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cast_1 = require("../datastruct/Cast");
class Cell {
    constructor(x, y) {
        this.x = Cast_1.int(x);
        this.y = Cast_1.int(y);
    }
    equals(c) {
        return this.x === c.x &&
            this.y === c.y &&
            this.previous === c.previous;
    }
    hasPrevious() {
        return this.previous !== undefined;
    }
    setPrevious(previous) {
        this.previous = previous;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getPrevious() {
        if (this.previous == null) {
            throw new Error('previous not yet defined');
        }
        return this.previous;
    }
    toString() {
        return `${this.x}, ${this.y}, prev: ${this.hasPrevious}`;
    }
}
exports.Cell = Cell;

},{"../datastruct/Cast":4}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cast_1 = require("../datastruct/Cast");
const Cell_1 = require("./Cell");
class Maze {
    constructor(width, height) {
        if (width < Maze.MINIMUM_DIMENSION || height < Maze.MINIMUM_DIMENSION) {
            throw new Error();
        }
        this.width = Cast_1.int(width);
        this.height = Cast_1.int(height);
        this.table = Maze.generateTable(this.width, this.height);
    }
    static generateTable(width, height) {
        let x, y, i;
        let cellTable = [];
        for (i = 0; i < width; i++) {
            cellTable[i] = [];
        }
        for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                cellTable[x][y] = new Cell_1.Cell(x, y);
            }
        }
        return cellTable;
    }
    getCell(x, y) {
        if (x < 0 || y < 0) {
            throw new Error();
        }
        if (x >= this.width || y >= this.height) {
            throw new Error();
        }
        return this.table[Cast_1.int(x)][Cast_1.int(y)];
    }
    neighborsOf(cell) {
        let up, right, down, left;
        let table = [];
        try {
            up = this.getCell(cell.getX(), cell.getY() - 1);
        }
        catch (e) { }
        try {
            right = this.getCell(cell.getX() + 1, cell.getY());
        }
        catch (e) { }
        try {
            down = this.getCell(cell.getX(), cell.getY() + 1);
        }
        catch (e) { }
        try {
            left = this.getCell(cell.getX() - 1, cell.getY());
        }
        catch (e) { }
        if (up !== undefined)
            table.push(up);
        if (right !== undefined)
            table.push(right);
        if (down !== undefined)
            table.push(down);
        if (left !== undefined)
            table.push(left);
        return table;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getTable() {
        return this.table;
    }
}
Maze.MINIMUM_DIMENSION = 1;
exports.Maze = Maze;

},{"../datastruct/Cast":4,"./Cell":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const List_1 = require("../datastruct/List");
const HSL_1 = require("../color/HSL");
const Random_1 = require("../util/Random");
class MazeDrawer {
    constructor(manager, ctx, pixelMult) {
        this.manager = manager;
        this.paths = this.manager.getPathAmount();
        this.ctx = ctx;
        this.pixelMult = pixelMult;
        this.colors = new List_1.List();
        for (let i = 0; i < this.paths; i++) {
            this.colors.put(new HSL_1.HSL(Random_1.Random.rangeDouble(0, 360), Random_1.Random.normal(), Random_1.Random.rangeDouble(0.2, 0.8), 0.3));
        }
    }
    drawPixels() {
        let path = this.manager.clonePaths();
        for (let i = 0; i < path.length(); i++) {
            this.ctx.fillStyle = this.colors.peek(i).toString();
            let current = path.peek(i).toArray()[path.peek(i).toArray().length - 1];
            this.ctx.fillRect(current.getX() * this.pixelMult, current.getY() * this.pixelMult, this.pixelMult, this.pixelMult);
        }
    }
}
exports.MazeDrawer = MazeDrawer;

},{"../color/HSL":3,"../datastruct/List":6,"../util/Random":15}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Queue_1 = require("../datastruct/Queue");
const Cast_1 = require("../datastruct/Cast");
const Random_1 = require("../util/Random");
class MazePather {
    constructor(maze) {
        this.maze = maze;
        this.path = new Queue_1.Queue();
    }
    iterate() {
        if (this.current === undefined) {
            this.initiatePath();
            return;
        }
        if (this.hasUndiscoveredNeigbor()) {
            this.moveToRandomAvailableNeighbor();
            return;
        }
        if (this.current.equals(this.start)) {
            return;
        }
        this.returnToLast();
    }
    cloneQueue() {
        return this.path.clone();
    }
    initiatePath() {
        if (this.start === undefined) {
            throw new Error();
        }
        this.current = this.start;
        this.current.setPrevious(this.start);
        this.path.put(this.current);
    }
    moveToRandomAvailableNeighbor() {
        let next;
        let direction;
        let neighbors = this.undiscoveredNeighbors();
        while (true) {
            direction = Random_1.Random.rangeInt(0, neighbors.length);
            if (neighbors[direction].equals(this.start)) {
                continue;
            }
            break;
        }
        next = neighbors[direction];
        next.setPrevious(this.current);
        this.current = next;
        this.path.put(this.current);
    }
    returnToLast() {
        this.current = this.current.getPrevious();
        this.path.put(this.current);
    }
    hasUndiscoveredNeigbor() {
        return this.undiscoveredNeigborCount() > 0;
    }
    undiscoveredNeigborCount() {
        return this.undiscoveredNeighbors().length;
    }
    undiscoveredNeighbors() {
        let cell = this.maze.neighborsOf(this.current);
        return cell.filter(v => !v.hasPrevious());
    }
    setStart(x, y) {
        const S_X = Cast_1.int(x), S_Y = Cast_1.int(y);
        const WIDTH = this.maze.getWidth(), HEIGHT = this.maze.getHeight();
        if (S_X < 0 || S_Y < 0) {
            throw new Error('Index out of bounds');
        }
        if (S_X >= WIDTH || S_Y >= HEIGHT) {
            throw new Error('Index out of bounds');
        }
        this.start = this.maze.getCell(x, y);
    }
    getStart() {
        return this.start;
    }
    getCurrent() {
        return this.current;
    }
}
exports.MazePather = MazePather;

},{"../datastruct/Cast":4,"../datastruct/Queue":7,"../util/Random":15}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Maze_1 = require("./Maze");
const MazePather_1 = require("./MazePather");
const List_1 = require("../datastruct/List");
const Queue_1 = require("../datastruct/Queue");
const Cast_1 = require("../datastruct/Cast");
const Random_1 = require("../util/Random");
class MazePatherManager {
    constructor(paths, sizeX, sizeY) {
        this.paths = new Queue_1.Queue();
        let maze = new Maze_1.Maze(Cast_1.int(sizeX), Cast_1.int(sizeY));
        for (let i = 0; i < Cast_1.int(paths); i++) {
            this.paths.put(new MazePather_1.MazePather(maze));
        }
    }
    getPathAmount() {
        return this.paths.length();
    }
    addPather(mp) {
        this.paths.put(mp);
    }
    setStart(maxX, maxY) {
        this.paths.toArray().forEach((v) => {
            const X = Random_1.Random.rangeInt(0, maxX);
            const Y = Random_1.Random.rangeInt(0, maxY);
            v.setStart(X, Y);
        });
    }
    iterate() {
        this.paths.toArray().forEach(v => v.iterate());
    }
    clonePaths() {
        let paths = new List_1.List();
        this.paths.toArray().forEach(v => paths.put(v.cloneQueue()));
        return paths;
    }
    mergePaths() {
        let paths = new Queue_1.Queue();
        let clonedPaths = this.clonePaths();
        let size = clonedPaths.peek(0).length();
        for (let i = 0; i < size; i++) {
            for (let k = 0; k < clonedPaths.length(); k++) {
                paths.put(clonedPaths.peek(k).take());
            }
        }
        return paths;
    }
}
exports.MazePatherManager = MazePatherManager;

},{"../datastruct/Cast":4,"../datastruct/List":6,"../datastruct/Queue":7,"../util/Random":15,"./Maze":10,"./MazePather":12}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cast_1 = require("../datastruct/Cast");
class Point {
    constructor(x, y) {
        this.x = Cast_1.double(x);
        this.y = Cast_1.double(y);
    }
    distance(p) {
        return Math.hypot(this.x - p.x, this.y - p.y);
    }
    setX(x) {
        this.x = Cast_1.double(x);
    }
    setY(y) {
        this.y = Cast_1.double(y);
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}
exports.Point = Point;

},{"../datastruct/Cast":4}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cast_1 = require("../datastruct/Cast");
const Time_1 = require("./Time");
class Random {
    static normal(seed) {
        const NEXT = Random.sine(seed);
        return NEXT - Math.floor(NEXT);
    }
    static nextDouble(max, seed) {
        return Math.floor(Random.normal(seed) * Cast_1.double(max));
    }
    static nextInt(max, seed) {
        return Cast_1.int(Random.nextDouble(max, seed));
    }
    static rangeDouble(min, max, seed) {
        const NORMAL = Random.normal(seed);
        const MIN = Cast_1.double(min);
        const MAX = Cast_1.double(max);
        return NORMAL * (MAX - MIN) + MIN;
    }
    static rangeInt(min, max, seed) {
        return Cast_1.int(Random.rangeDouble(min, max, seed));
    }
    static sine(seed) {
        if (seed === undefined) {
            seed = Time_1.time() + Random.increment++;
        }
        return Math.sin(Cast_1.double(seed)) * Random.SINE_MULTIPLIER;
    }
}
Random.SINE_MULTIPLIER = 100000;
Random.increment = 0;
exports.Random = Random;

},{"../datastruct/Cast":4,"./Time":16}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Time {
    constructor() {
        this.start = Time.time();
        this.currentFrame = 0;
    }
    static time() {
        return window.performance.now();
    }
    static timeSinceUnixEpoch() {
        return window.performance.timing.navigationStart + Time.time();
    }
    deltaFrame() {
        return this.frameEnd - this.frameStart;
    }
    deltaPhysics() {
        return this.physicsEnd - this.physicsStart;
    }
    deltaDraw() {
        return this.drawEnd - this.drawStart;
    }
    setFrameStart() {
        this.frameStart = Time.time();
    }
    setFrameEnd() {
        this.frameEnd = Time.time();
    }
    setPhysicsStart() {
        this.physicsStart = Time.time();
    }
    setPhysicsEnd() {
        this.physicsEnd = Time.time();
    }
    setDrawStart() {
        this.drawStart = Time.time();
    }
    setDrawEnd() {
        this.drawEnd = Time.time();
    }
    getCurrentFrame() {
        return this.currentFrame;
    }
    iterateCurrentFrame() {
        this.currentFrame++;
    }
}
exports.Time = Time;
function time() {
    return Time.time();
}
exports.time = time;

},{}]},{},[1]);
