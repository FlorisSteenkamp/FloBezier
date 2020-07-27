
import { getImplicitForm1_bitlength45_double } from "../../../../implicit-form/inp-bitlength45/double/get-implicit-form1-bitlength45-double";
import { γ } from "../../../../error-analysis/error-analysis";
import { getXY } from "../../../../to-power-basis/get-xy";


const abs = Math.abs;
const γ1 = γ(1);


function getCoeffs1x1(ps1: number[][], ps2: number[][]) {
    let { 
        coeffs: { vₓ, vᵧ, v },
        errorBound: { v_ } // vₓ_, vᵧ_ === 0
    } = getImplicitForm1_bitlength45_double(ps1);

    let [[c1,c0],[d1,d0]] = getXY(ps2);


    // a1*v_x + b1*v_y
    //let v1 = c1*vₓ + d1*vᵧ;
    let p1 = c1*vₓ;
    let p1_ = abs(p1);  // vₓ_ === 0
    let p2 = d1*vᵧ;
    let p2_ = abs(p2);  // vᵧ_ === 0
    let v1 = p1 + p2;
    let v1_ = p1_ + p2_ + abs(v1);

    // v0 = a0*v_x + b0*v_y + v_0
    //let v0 = c0*vₓ + d0*vᵧ + v;
    let p3 = c0*vₓ;
    let p3_ = abs(p3);  // vₓ_ === 0
    let p4 = d0*vᵧ;
    let p4_ = abs(p4);  // vᵧ_ === 0
    let p5 = p3 + p4;
    let p5_ = p3_ + p4_ + abs(p5);
    let v0 = p5 + v;
    let v0_ = p5_ + v_ + abs(v0);    


    return {
        coeffs:   [v1, v0],
        errBound: [v1_, v0_].map(c => γ1*c)
    };
}


export { getCoeffs1x1 }
