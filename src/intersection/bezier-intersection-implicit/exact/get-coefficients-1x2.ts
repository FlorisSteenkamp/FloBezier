
import { getXExact } from "../../../to-power-basis/get-x";
import { getYExact } from "../../../to-power-basis/get-y";
import { calculate } from "flo-numerical";
import { getImplicitForm1Exact } from "../../../implicit-form/exact/get-implicit-form1";


function getCoeffs1x2Exact(ps1: number[][], ps2: number[][]) {
    let { vₓ, vᵧ, v } = getImplicitForm1Exact(ps1);

    let [c2, c1, c0] = getXExact(ps2);
    let [d2, d1, d0] = getYExact(ps2);


    // a2*v_x + b2*v_y
    let v2 = calculate([
        [c2,vₓ], [d2,vᵧ]
    ]);

    // a1*v_x + b1*v_y
    let v1 = calculate([
        [c1,vₓ], [d1,vᵧ]
    ]);

    // a0*v_x + b0*v_y + v_0
    let v0 = calculate([
        [c0,vₓ], [d0,vᵧ], [v]
    ]);    

    return [v2, v1, v0];
}


export { getCoeffs1x2Exact }
