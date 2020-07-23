
import { getXExact } from "../../../to-power-basis/get-x";
import { getYExact } from "../../../to-power-basis/get-y";
import { getImplicitForm3Exact } from "../../../implicit-form/exact/get-implicit-form3";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { eCalculate } = bigFloatOperators;


function getCoeffs3x2Exact(ps1: number[][], ps2: number[][]) {
    let { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
        getImplicitForm3Exact(ps1);

    let [c2, c1, c0] = getXExact(ps2);
    let [d2, d1, d0] = getYExact(ps2);
    // max bitlengths (assuming coefficients is at 14 bitlength):
    // a2, b2: 16
    // a1, b1: 16
    // a0, b0: 14

   
    // a2**3*v_xxx + a2**2*b2*v_xxy + a2*b2**2*v_xyy + b2**3*v_yyy
    let v6 = eCalculate([
        [c2,c2,c2,vₓₓₓ], [c2,c2,d2,vₓₓᵧ], 
        [c2,d2,d2,vₓᵧᵧ], [d2,d2,d2,vᵧᵧᵧ]
    ]);

    // 3*a1*a2**2*v_xxx + 2*a1*a2*b2*v_xxy + a1*b2**2*v_xyy + 
    // a2**2*b1*v_xxy + 2*a2*b1*b2*v_xyy + 3*b1*b2**2*v_yyy
    let v5 = eCalculate([
        [[3],c1,c2,c2,vₓₓₓ], [[2],c1,c2,d2,vₓₓᵧ], 
        [    c1,d2,d2,vₓᵧᵧ], [    c2,c2,d1,vₓₓᵧ],
        [[2],c2,d1,d2,vₓᵧᵧ], [[3],d1,d2,d2,vᵧᵧᵧ]
    ]);

    // 3*a0*a2**2*v_xxx + 2*a0*a2*b2*v_xxy + a0*b2**2*v_xyy + 
    // 3*a1**2*a2*v_xxx + a1**2*b2*v_xxy + 2*a1*a2*b1*v_xxy + 
    // 2*a1*b1*b2*v_xyy + a2**2*b0*v_xxy + a2**2*v_xx + 
    // 2*a2*b0*b2*v_xyy + a2*b1**2*v_xyy + a2*b2*v_xy + 
    // 3*b0*b2**2*v_yyy + 3*b1**2*b2*v_yyy + b2**2*v_yy
    let v4 = eCalculate([
        [[3],c0,c2,c2,vₓₓₓ], [[2],c0,c2,d2,vₓₓᵧ], [    c0,d2,d2,vₓᵧᵧ],
        [[3],c1,c1,c2,vₓₓₓ], [    c1,c1,d2,vₓₓᵧ], [[2],c1,c2,d1,vₓₓᵧ],
        [[2],c1,d1,d2,vₓᵧᵧ], [    c2,c2,d0,vₓₓᵧ], [    c2,c2,   vₓₓ ],
        [[2],c2,d0,d2,vₓᵧᵧ], [    c2,d1,d1,vₓᵧᵧ], [    c2,d2,   vₓᵧ ],
        [[3],d0,d2,d2,vᵧᵧᵧ], [[3],d1,d1,d2,vᵧᵧᵧ], [    d2,d2,   vᵧᵧ ]
    ]);

    // 6*a0*a1*a2*v_xxx + 2*a0*a1*b2*v_xxy + 2*a0*a2*b1*v_xxy + 
    // 2*a0*b1*b2*v_xyy + a1**3*v_xxx + a1**2*b1*v_xxy + 
    // 2*a1*a2*b0*v_xxy + 2*a1*a2*v_xx + 2*a1*b0*b2*v_xyy + 
    // a1*b1**2*v_xyy + a1*b2*v_xy + 2*a2*b0*b1*v_xyy + 
    // a2*b1*v_xy + 6*b0*b1*b2*v_yyy + b1**3*v_yyy + 
    // 2*b1*b2*v_yy
    let v3 = eCalculate([
        [[6],c0,c1,c2,vₓₓₓ], [[2],c0,c1,d2,vₓₓᵧ], [[2],c0,c2,d1,vₓₓᵧ],
        [[2],c0,d1,d2,vₓᵧᵧ], [    c1,c1,c1,vₓₓₓ], [    c1,c1,d1,vₓₓᵧ],
        [[2],c1,c2,d0,vₓₓᵧ], [[2],c1,c2,   vₓₓ],  [[2],c1,d0,d2,vₓᵧᵧ],
        [    c1,d1,d1,vₓᵧᵧ], [    c1,d2,   vₓᵧ],  [[2],c2,d0,d1,vₓᵧᵧ],
        [    c2,d1,   vₓᵧ ], [[6],d0,d1,d2,vᵧᵧᵧ], [    d1,d1,d1,vᵧᵧᵧ],
        [[2],d1,d2,   vᵧᵧ ]
    ]);

    // 3*a0**2*a2*v_xxx + a0**2*b2*v_xxy + 3*a0*a1**2*v_xxx + 2*a0*a1*b1*v_xxy + 2*a0*a2*b0*v_xxy + 
    // 2*a0*a2*v_xx + 2*a0*b0*b2*v_xyy + a0*b1**2*v_xyy + a0*b2*v_xy + a1**2*b0*v_xxy + a1**2*v_xx + 
    // 2*a1*b0*b1*v_xyy + a1*b1*v_xy + a2*b0**2*v_xyy + a2*b0*v_xy + a2*v_x + 3*b0**2*b2*v_yyy + 
    // 3*b0*b1**2*v_yyy + 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    let v2 = eCalculate([
        [[3],c0,c0,c2,vₓₓₓ], [    c0,c0,d2,vₓₓᵧ], [[3],c0,c1,c1, vₓₓₓ], 
        [[2],c0,c1,d1,vₓₓᵧ], [[2],c0,c2,d0,vₓₓᵧ], [[2],c0,c2,    vₓₓ ], 
        [[2],c0,d0,d2,vₓᵧᵧ], [    c0,d1,d1,vₓᵧᵧ], [    c0,d2,    vₓᵧ ], 
        [    c1,c1,d0,vₓₓᵧ], [    c1,c1,   vₓₓ ], [[2],c1,d0,d1, vₓᵧᵧ], 
        [    c1,d1,   vₓᵧ],  [    c2,d0,d0,vₓᵧᵧ], [    c2,d0,    vₓᵧ ], 
        [    c2,      vₓ ],  [[3],d0,d0,d2,vᵧᵧᵧ], [[3],d0,d1,d1, vᵧᵧᵧ],
        [[2],d0,d2,   vᵧᵧ],  [    d1,d1,   vᵧᵧ ], [    d2,       vᵧ  ]
    ]);

    // 3*a0**2*a1*v_xxx + a0**2*b1*v_xxy + 2*a0*a1*b0*v_xxy + 2*a0*a1*v_xx + 2*a0*b0*b1*v_xyy + 
    // a0*b1*v_xy + a1*b0**2*v_xyy + a1*b0*v_xy + a1*v_x + 3*b0**2*b1*v_yyy + 2*b0*b1*v_yy + b1*v_y
    let v1 = eCalculate([
        [[3],c0,c0,c1,vₓₓₓ], [    c0,c0,d1,vₓₓᵧ], [[2],c0,c1,d0,vₓₓᵧ], 
        [[2],c0,c1,   vₓₓ ], [[2],c0,d0,d1,vₓᵧᵧ], [    c0,d1,   vₓᵧ ], 
        [    c1,d0,d0,vₓᵧᵧ], [    c1,d0,   vₓᵧ ], [    c1,      vₓ  ], 
        [[3],d0,d0,d1,vᵧᵧᵧ], [[2],d0,d1,   vᵧᵧ ], [    d1,      vᵧ  ]
    ]);

    // a0**3*v_xxx + a0**2*b0*v_xxy + a0**2*v_xx + a0*b0**2*v_xyy + a0*b0*v_xy + a0*v_x + 
    // b0**3*v_yyy + b0**2*v_yy + b0*v_y + v_0
    let v0 = eCalculate([
        [c0,c0,c0,vₓₓₓ], [c0,c0,d0,vₓₓᵧ], [c0,c0,vₓₓ], 
        [c0,d0,d0,vₓᵧᵧ], [c0,d0,   vₓᵧ],  [c0,   vₓ], 
        [d0,d0,d0,vᵧᵧᵧ], [d0,d0,   vᵧᵧ],  [d0,   vᵧ], 
        [v]
    ]);    

    return [v6, v5, v4, v3, v2, v1, v0];
}


export { getCoeffs3x2Exact }
