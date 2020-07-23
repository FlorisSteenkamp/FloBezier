"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs1x1Exact = void 0;
const get_x_1 = require("../../../to-power-basis/get-x");
const get_y_1 = require("../../../to-power-basis/get-y");
const get_implicit_form1_1 = require("../../../implicit-form/exact/get-implicit-form1");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eCalculate } = big_float_ts_1.operators;
function getCoeffs1x1Exact(ps1, ps2) {
    let { vₓ, vᵧ, v } = get_implicit_form1_1.getImplicitForm1Exact(ps1);
    let [c1, c0] = get_x_1.getXExact(ps2);
    let [d1, d0] = get_y_1.getYExact(ps2);
    // a1*v_x + b1*v_y
    let v1 = eCalculate([
        [c1, vₓ], [d1, vᵧ]
    ]);
    // a0*v_x + b0*v_y + v_0
    let v0 = eCalculate([
        [c0, vₓ], [d0, vᵧ], [v]
    ]);
    return [v1, v0];
}
exports.getCoeffs1x1Exact = getCoeffs1x1Exact;
//# sourceMappingURL=get-coefficients-1x1.js.map