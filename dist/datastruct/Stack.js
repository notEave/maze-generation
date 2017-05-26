"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = require("./Collection");
class Stack extends Collection_1.Collection {
    constructor() {
        super();
    }
    peek() {
        return super.last();
    }
    take() {
        const value = this.peek();
        this.collection.pop();
        return value;
    }
    clone() {
        const collection = new Stack();
        super.toArray().forEach(v => collection.put(v));
        return collection;
    }
}
exports.Stack = Stack;
