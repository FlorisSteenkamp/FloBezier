
import { getXExact } from "../../../to-power-basis/get-x";
import { getYExact } from "../../../to-power-basis/get-y";
import { getImplicitForm1Exact } from "../../../implicit-form/exact/get-implicit-form1";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { eCalculate } = bigFloatOperators;


function getCoeffs1x3Exact(ps1: number[][], ps2: number[][]) {
    let { vₓ, vᵧ, v } = getImplicitForm1Exact(ps1);

    let [c3, c2, c1, c0] = getXExact(ps2);
    let [d3, d2, d1, d0] = getYExact(ps2);

    
    // a3*v_x + b3*v_y
    let v3 = eCalculate([
        [c3,vₓ], [d3,vᵧ]
    ]);

    // a2*v_x + b2*v_y
    let v2 = eCalculate([
        [c2,vₓ], [d2,vᵧ]
    ]);

    // a1*v_x + b1*v_y
    let v1 = eCalculate([
        [c1,vₓ], [d1,vᵧ]
    ]);

    // a0*v_x + b0*v_y + v_0
    let v0 = eCalculate([
        [c0,vₓ], [d0,vᵧ], [v]
    ]);    

    return [v3, v2, v1, v0];
}


export { getCoeffs1x3Exact }
