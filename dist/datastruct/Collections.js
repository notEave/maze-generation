"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collections {
    static reverse(coll) {
        let arr = coll.toArray();
        coll.clear();
        coll.putAll(arr.reverse());
    }
}
exports.Collections = Collections;
