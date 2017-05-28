"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor() {
        this.collection = [];
    }
    put(value) {
        this.collection.push(value);
    }
    peek() {
        return this.collection[0];
    }
    pop() {
        let v = this.peek();
        this.collection.shift();
        return v;
    }
    length() {
        return this.collection.length;
    }
    clone() {
        let collection = new Queue();
        this.toArray().forEach(v => collection.put(v));
        return collection;
    }
    toArray() {
        return this.collection.slice();
    }
}
exports.Queue = Queue;
