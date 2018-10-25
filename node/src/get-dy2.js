"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const flo_memoize_1 = require("flo-memoize");
const get_y2_1 = require("./get-y2");
const memoize = flo_memoize_1.default.m1;
/**
 * Returns the derivative of the power basis representation of the bezier's
 * y-coordinates. This function is memoized on its points parameter by object
 * reference.
 * @param ps - A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 * @returns The differentiated power basis polynomial from highest
 * power to lowest, e.g. at^2 + bt + c is returned as [a,b,c]
 */
let getDy2 = memoize((ps) => flo_poly_1.default.differentiate(get_y2_1.getY2(ps)));
exports.getDy2 = getDy2;
//# sourceMappingURL=get-dy2.js.map