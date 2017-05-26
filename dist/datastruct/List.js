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
