"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Curry the given arity two function.
 * @param f - A function
 */
function curry2(f) {
    function g(t, u) {
        return u === undefined
            ? (u) => f(t, u)
            : f(t, u);
    }
    return g;
}
exports.default = curry2;
//# sourceMappingURL=curry2.js.map