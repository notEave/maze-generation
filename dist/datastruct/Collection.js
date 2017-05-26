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
