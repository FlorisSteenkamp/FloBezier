"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const flo_memoize_1 = require("flo-memoize");
const get_x2_1 = require("./get-x2");
/**
 * Returns the derivative of the power basis representation of the bezier's
 * x-coordinates. This function is memoized on its points parameter by object
 * reference.
 * @param ps - A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 */
let getDx2 = flo_memoize_1.memoize((ps) => flo_poly_1.default.differentiate(get_x2_1.getX2(ps)));
exports.getDx2 = getDx2;
//# sourceMappingURL=get-dx2.js.map