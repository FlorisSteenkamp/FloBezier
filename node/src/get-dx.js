"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const flo_memoize_1 = require("flo-memoize");
const get_x_1 = require("./get-x");
/**
 * Returns the derivative of the power basis representation of the bezier's
 * x-coordinates. This function is memoized on its points parameter by object
 * reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
let getDx = flo_memoize_1.memoize((ps) => flo_poly_1.default.differentiate(get_x_1.getX(ps)));
exports.getDx = getDx;
//# sourceMappingURL=get-dx.js.map