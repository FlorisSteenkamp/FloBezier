"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const flo_memoize_1 = require("flo-memoize");
const get_y_1 = require("./get-y");
/**
 * Returns the derivative of the power basis representation of the bezier's
 * y-coordinates. This function is memoized on its points parameter by object
 * reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The differentiated power basis polynomial from highest
 * power to lowest, e.g. at^2 + bt + c is returned as [a,b,c]
 */
let getDy = flo_memoize_1.memoize((ps) => flo_poly_1.default.differentiate(get_y_1.getY(ps)));
exports.getDy = getDy;
//# sourceMappingURL=get-dy.js.map