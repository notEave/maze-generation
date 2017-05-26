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
