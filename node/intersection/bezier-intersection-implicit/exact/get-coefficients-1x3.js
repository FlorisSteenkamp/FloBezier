"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs1x3Exact = void 0;
const get_x_1 = require("../../../to-power-basis/get-x");
const get_y_1 = require("../../../to-power-basis/get-y");
const get_implicit_form1_1 = require("../../../implicit-form/exact/get-implicit-form1");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eCalculate } = big_float_ts_1.operators;
function getCoeffs1x3Exact(ps1, ps2) {
    let { vₓ, vᵧ, v } = get_implicit_form1_1.getImplicitForm1Exact(ps1);
    let [c3, c2, c1, c0] = get_x_1.getXExact(ps2);
    let [d3, d2, d1, d0] = get_y_1.getYExact(ps2);
    // a3*v_x + b3*v_y
    let v3 = eCalculate([
        [c3, vₓ], [d3, vᵧ]
    ]);
    // a2*v_x + b2*v_y
    let v2 = eCalculate([
        [c2, vₓ], [d2, vᵧ]
    ]);
    // a1*v_x + b1*v_y
    let v1 = eCalculate([
        [c1, vₓ], [d1, vᵧ]
    ]);
    // a0*v_x + b0*v_y + v_0
    let v0 = eCalculate([
        [c0, vₓ], [d0, vᵧ], [v]
    ]);
    return [v3, v2, v1, v0];
}
exports.getCoeffs1x3Exact = getCoeffs1x3Exact;
//# sourceMappingURL=get-coefficients-1x3.js.map