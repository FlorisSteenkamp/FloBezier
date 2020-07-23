"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs2x2Exact = void 0;
const get_x_1 = require("../../../to-power-basis/get-x");
const get_y_1 = require("../../../to-power-basis/get-y");
const get_implicit_form2_1 = require("../../../implicit-form/exact/get-implicit-form2");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eCalculate } = big_float_ts_1.operators;
function getCoeffs2x2Exact(ps1, ps2) {
    let { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = get_implicit_form2_1.getImplicitForm2Exact(ps1);
    let [c2, c1, c0] = get_x_1.getXExact(ps2);
    let [d2, d1, d0] = get_y_1.getYExact(ps2);
    // a2**2*v_xx + a2*b2*v_xy + b2**2*v_yy
    let v4 = eCalculate([
        [c2, c2, vₓₓ], [c2, d2, vₓᵧ], [d2, d2, vᵧᵧ]
    ]);
    // 2*a1*a2*v_xx + a1*b2*v_xy + a2*b1*v_xy + 2*b1*b2*v_yy
    let v3 = eCalculate([
        [[2], c1, c2, vₓₓ], [c1, d2, vₓᵧ],
        [c2, d1, vₓᵧ], [[2], d1, d2, vᵧᵧ]
    ]);
    // 2*a0*a2*v_xx + a0*b2*v_xy + a1**2*v_xx + 
    // a1*b1*v_xy + a2*b0*v_xy + a2*v_x + 
    // 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    let v2 = eCalculate([
        [[2], c0, c2, vₓₓ], [c0, d2, vₓᵧ], [c1, c1, vₓₓ],
        [c1, d1, vₓᵧ], [c2, d0, vₓᵧ], [c2, vₓ],
        [[2], d0, d2, vᵧᵧ], [d1, d1, vᵧᵧ], [d2, vᵧ]
    ]);
    // 2*a0*a1*v_xx + a0*b1*v_xy + a1*b0*v_xy + 
    // a1*v_x + 2*b0*b1*v_yy + b1*v_y
    let v1 = eCalculate([
        [[2], c0, c1, vₓₓ], [c0, d1, vₓᵧ], [c1, d0, vₓᵧ],
        [c1, vₓ], [[2], d0, d1, vᵧᵧ], [d1, vᵧ]
    ]);
    // a0**2*v_xx + a0*b0*v_xy + a0*v_x + 
    // b0**2*v_yy + b0*v_y + v_0
    let v0 = eCalculate([
        [c0, c0, vₓₓ], [c0, d0, vₓᵧ], [c0, vₓ],
        [d0, d0, vᵧᵧ], [d0, vᵧ], [v]
    ]);
    return [v4, v3, v2, v1, v0];
}
exports.getCoeffs2x2Exact = getCoeffs2x2Exact;
//# sourceMappingURL=get-coefficients-2x2.js.map