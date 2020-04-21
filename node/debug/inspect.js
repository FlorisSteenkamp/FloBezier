"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./log");
/**
 * Debug inspection function returning the same value it is fed.
 * @param v any value
 * @param f a function called with the given value
 */
function inspect(v, f) {
    if (f) {
        f(v);
    }
    else {
        log_1.log(v);
    }
    return v;
}
exports.inspect = inspect;
//# sourceMappingURL=inspect.js.map