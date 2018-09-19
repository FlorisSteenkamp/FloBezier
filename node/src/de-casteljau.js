"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deCasteljau(cs, t) {
    // See https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm
    function f(t) {
        if (t === 0) {
            return [[cs[0], cs[0], cs[0], cs[0]], cs];
        }
        if (t === 1) {
            return [cs, [cs[3], cs[3], cs[3], cs[3]]];
        }
        let t_ = 1 - t;
        // j === 0, ..., n (with n === 3 -> cubic bezier)
        let b00 = cs[0]; // i === 0 
        let b10 = cs[1]; // i === 1 
        let b20 = cs[2]; // i === 2 
        let b30 = cs[3]; // i === 3 
        // j === 1
        let b01 = (b00 * t_) + (b10 * t); // i === 0
        let b11 = (b10 * t_) + (b20 * t); // i === 1
        let b21 = (b20 * t_) + (b30 * t); // i === 2
        // j === 2
        let b02 = (b01 * t_) + (b11 * t); // i === 0
        let b12 = (b11 * t_) + (b21 * t); // i === 1
        // j === 3
        let b03 = (b02 * t_) + (b12 * t); // i === 0
        return [[b00, b01, b02, b03], [b03, b12, b21, b30]];
    }
    return t === undefined ? f : f(t); // Curry
}
exports.deCasteljau = deCasteljau;

//# sourceMappingURL=de-casteljau.js.map
