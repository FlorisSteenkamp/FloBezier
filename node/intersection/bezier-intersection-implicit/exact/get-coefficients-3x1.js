"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_x_1 = require("../../../to-power-basis/get-x");
const get_y_1 = require("../../../to-power-basis/get-y");
const flo_numerical_1 = require("flo-numerical");
const get_implicit_form3_1 = require("../../../implicit-form/exact/get-implicit-form3");
function getCoeffs3x1Exact(ps1, ps2) {
    let { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = get_implicit_form3_1.getImplicitForm3Exact(ps1);
    let [c1, c0] = get_x_1.getXExact(ps2);
    let [d1, d0] = get_y_1.getYExact(ps2);
    // a1**3*v_xxx + a1**2*b1*v_xxy + a1*b1**2*v_xyy + b1**3*v_yyy
    let v3 = flo_numerical_1.calculate([
        [c1, c1, c1, vₓₓₓ], [c1, c1, d1, vₓₓᵧ],
        [c1, d1, d1, vₓᵧᵧ], [d1, d1, d1, vᵧᵧᵧ]
    ]);
    // 3*a0*a1**2*v_xxx + 2*a0*a1*b1*v_xxy + a0*b1**2*v_xyy + a1**2*b0*v_xxy + a1**2*v_xx + 2*a1*b0*b1*v_xyy + a1*b1*v_xy + 3*b0*b1**2*v_yyy + b1**2*v_yy
    let v2 = flo_numerical_1.calculate([
        [[3], c0, c1, c1, vₓₓₓ], [[2], c0, c1, d1, vₓₓᵧ], [c0, d1, d1, vₓᵧᵧ],
        [c1, c1, d0, vₓₓᵧ], [c1, c1, vₓₓ], [[2], c1, d0, d1, vₓᵧᵧ],
        [c1, d1, vₓᵧ], [[3], d0, d1, d1, vᵧᵧᵧ], [d1, d1, vᵧᵧ]
    ]);
    // 3*a0**2*a1*v_xxx + a0**2*b1*v_xxy + 2*a0*a1*b0*v_xxy + 2*a0*a1*v_xx + 2*a0*b0*b1*v_xyy + a0*b1*v_xy + a1*b0**2*v_xyy + a1*b0*v_xy + a1*v_x + 3*b0**2*b1*v_yyy + 2*b0*b1*v_yy + b1*v_y
    let v1 = flo_numerical_1.calculate([
        [[3], c0, c0, c1, vₓₓₓ], [c0, c0, d1, vₓₓᵧ], [[2], c0, c1, d0, vₓₓᵧ],
        [[2], c0, c1, vₓₓ], [[2], c0, d0, d1, vₓᵧᵧ], [c0, d1, vₓᵧ],
        [c1, d0, d0, vₓᵧᵧ], [c1, d0, vₓᵧ], [c1, vₓ],
        [[3], d0, d0, d1, vᵧᵧᵧ], [[2], d0, d1, vᵧᵧ], [d1, vᵧ]
    ]);
    // a0**3*v_xxx + a0**2*b0*v_xxy + a0**2*v_xx + a0*b0**2*v_xyy + a0*b0*v_xy + a0*v_x + b0**3*v_yyy + b0**2*v_yy + b0*v_y + v_0
    let v0 = flo_numerical_1.calculate([
        [c0, c0, c0, vₓₓₓ],
        [d0, d0, d0, vᵧᵧᵧ],
        [c0, c0, d0, vₓₓᵧ],
        [c0, d0, d0, vₓᵧᵧ],
        [c0, c0, vₓₓ],
        [d0, d0, vᵧᵧ],
        [c0, d0, vₓᵧ],
        [c0, vₓ],
        [d0, vᵧ],
        [v],
    ]);
    return [v3, v2, v1, v0];
}
exports.getCoeffs3x1Exact = getCoeffs3x1Exact;
//# sourceMappingURL=get-coefficients-3x1.js.map