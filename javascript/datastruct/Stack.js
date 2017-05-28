"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = require("./Collection");
class Stack extends Collection_1.Collection {
    constructor() {
        super();
    }
    peek() {
        return this.collection[this.collection.length - 1];
    }
    pop() {
        const value = this.peek();
        this.collection.pop();
        return value;
    }
}
exports.Stack = Stack;
