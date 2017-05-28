"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collection {
    constructor() {
        this.collection = [];
    }
    put(value) {
        this.collection.push(value);
    }
    peek() {
        throw new Error('Unsupported functionality');
    }
    pop() {
        throw new Error('Unsupported functionality');
    }
}
exports.Collection = Collection;
