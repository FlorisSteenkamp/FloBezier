"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tangent_1 = require("./tangent");
function normal(ps, t) {
    const tanPs = tangent_1.tangent(ps);
    function f(t) {
        let v = tanPs(t);
        return [v[1], -v[0]];
    }
    // Curry
    return t === undefined ? f : f(t);
}
exports.normal = normal;
//# sourceMappingURL=normal.js.map