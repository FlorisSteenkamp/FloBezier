
import { getXExact } from "../../../to-power-basis/get-x";
import { getYExact } from "../../../to-power-basis/get-y";
import { getImplicitForm2Exact } from "../../../implicit-form/exact/get-implicit-form2";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { eCalculate } = bigFloatOperators;


function getCoeffs2x1Exact(ps1: number[][], ps2: number[][]) {
    let { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
        getImplicitForm2Exact(ps1);

    let [c1, c0] = getXExact(ps2);
    let [d1, d0] = getYExact(ps2);


    // a1**2*v_xx + a1*b1*v_xy + b1**2*v_yy
    let v2 = eCalculate([
        [c1,c1,vₓₓ], [c1,d1,vₓᵧ], [d1,d1,vᵧᵧ]
    ]);

    // 2*a0*a1*v_xx + a0*b1*v_xy + a1*b0*v_xy + a1*v_x + 2*b0*b1*v_yy + b1*v_y
    let v1 = eCalculate([
        [[2],c0,c1,vₓₓ], [c0,d1,vₓᵧ], [c1,d0,vₓᵧ], 
        [c1,vₓ], [[2],d0,d1,vᵧᵧ], [d1,vᵧ]
    ]);

    // a0**2*v_xx + a0*b0*v_xy + a0*v_x + b0**2*v_yy + b0*v_y + v_0
    let v0 = eCalculate([
        [c0,c0,vₓₓ], [c0,d0,vₓᵧ], [c0,vₓ], 
        [d0,d0,vᵧᵧ], [d0,vᵧ], [v]
    ]);    

    return [v2, v1, v0];
}


export { getCoeffs2x1Exact }
