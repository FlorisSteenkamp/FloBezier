"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_x_1 = require("../../../to-power-basis/get-x");
const get_y_1 = require("../../../to-power-basis/get-y");
const flo_numerical_1 = require("flo-numerical");
const get_implicit_form1_1 = require("../../../implicit-form/exact/get-implicit-form1");
function getCoeffs1x2Exact(ps1, ps2) {
    let { vₓ, vᵧ, v } = get_implicit_form1_1.getImplicitForm1Exact(ps1);
    let [c2, c1, c0] = get_x_1.getXExact(ps2);
    let [d2, d1, d0] = get_y_1.getYExact(ps2);
    // a2*v_x + b2*v_y
    let v2 = flo_numerical_1.calculate([
        [c2, vₓ], [d2, vᵧ]
    ]);
    // a1*v_x + b1*v_y
    let v1 = flo_numerical_1.calculate([
        [c1, vₓ], [d1, vᵧ]
    ]);
    // a0*v_x + b0*v_y + v_0
    let v0 = flo_numerical_1.calculate([
        [c0, vₓ], [d0, vᵧ], [v]
    ]);
    return [v2, v1, v0];
}
exports.getCoeffs1x2Exact = getCoeffs1x2Exact;
//# sourceMappingURL=get-coefficients-1x2.js.map