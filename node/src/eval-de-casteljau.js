"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const de_casteljau_1 = require("./de-casteljau");
function evalDeCasteljau(ps, t) {
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    let evX = de_casteljau_1.deCasteljau([x0, x1, x2, x3]);
    let evY = de_casteljau_1.deCasteljau([y0, y1, y2, y3]);
    function f(t) {
        if (t === 0) {
            return [x0, y0];
        }
        else if (t === 1) {
            return [x3, y3];
        }
        return [evX(t)[1][0], evY(t)[1][0]];
    }
    return t === undefined ? f : f(t);
}
exports.evalDeCasteljau = evalDeCasteljau;

//# sourceMappingURL=eval-de-casteljau.js.map
