"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const get_dx_1 = require("../to-power-basis/get-dx");
const index_1 = require("../index");
const get_dy_1 = require("../to-power-basis/get-dy");
const ds_1 = require("../local-properties-at-t/ds");
/**
 * Find the maximum change in curve length (s) due to a change in the parameter
 * (t)., i.e. max(ds/dt) for t ∈ [0,1]
 */
function maxDs(ps) {
    // max(ds/dt) occurs at a point where d²s/dt² = 0, i.e. x'x'' + y'y'' = 0
    let dx = get_dx_1.getDx(ps);
    let ddx = index_1.getDdx(ps);
    let dy = get_dy_1.getDy(ps);
    let ddy = index_1.getDdy(ps);
    let x1x2 = flo_poly_1.multiply(dx, ddx);
    let y1y2 = flo_poly_1.multiply(dy, ddy);
    let f = flo_poly_1.multiply(x1x2, y1y2);
    let roots = flo_poly_1.allRoots(f, 0, 1);
    roots.push(0, 1);
    let t = undefined;
    let max = Number.NEGATIVE_INFINITY;
    let evalDs = ds_1.ds(ps);
    for (let root of roots) {
        let ds_ = evalDs(root);
        if (ds_ > max) {
            max = ds_;
            t = root;
        }
    }
    return { ds: max, t };
}
exports.maxDs = maxDs;
//# sourceMappingURL=max-ds.js.map