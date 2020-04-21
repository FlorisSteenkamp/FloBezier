
import { getXExact } from "../../../to-power-basis/get-x";
import { getYExact } from "../../../to-power-basis/get-y";
import { calculate } from "flo-numerical";
import { getImplicitForm3Exact } from "../../../implicit-form/exact/get-implicit-form3";


/**
 * @param ps1 
 * @param ps2 
 */
function getCoeffs3x3Exact(ps1: number[][], ps2: number[][]) {
    let { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
        getImplicitForm3Exact(ps1);

    let [c3, c2, c1, c0] = getXExact(ps2);
    let [d3, d2, d1, d0] = getYExact(ps2);


    let v9 = calculate([
        [c3,d3,d3,vₓᵧᵧ], 
        [d3,c3,c3,vₓₓᵧ], 
        [c3,c3,c3,vₓₓₓ], 
        [d3,d3,d3,vᵧᵧᵧ]
    ]);

    let v8 = calculate([
        [[2],c2,c3,d3,vₓₓᵧ], 
        [[2],c3,d2,d3,vₓᵧᵧ], 
        [    c2,d3,d3,vₓᵧᵧ],
        [    d2,c3,c3,vₓₓᵧ],     
        [[3],c2,c3,c3,vₓₓₓ], 
        [[3],d2,d3,d3,vᵧᵧᵧ]
    ]);

    let v7 = calculate([
        [[2],c1,c3,d3,vₓₓᵧ], 
        [[2],c2,c3,d2,vₓₓᵧ], 
        [[2],c2,d2,d3,vₓᵧᵧ],
        [[2],c3,d1,d3,vₓᵧᵧ], 
        [    d3,d3,c1,vₓᵧᵧ], 
        [    d2,d2,c3,vₓᵧᵧ],
        [    c3,c3,d1,vₓₓᵧ], 
        [    c2,c2,d3,vₓₓᵧ], 
        [[3],c1,c3,c3,vₓₓₓ],
        [[3],c3,c2,c2,vₓₓₓ], 
        [[3],d1,d3,d3,vᵧᵧᵧ], 
        [[3],d3,d2,d2,vᵧᵧᵧ]
    ]);

    let v6 = calculate([
        [[2],c0,c3,d3,vₓₓᵧ], 
        [[2],c1,c2,d3,vₓₓᵧ],
        [[2],c1,c3,d2,vₓₓᵧ], 
        [[2],c1,d2,d3,vₓᵧᵧ], 
        [[2],c2,c3,d1,vₓₓᵧ],
        [[2],c2,d1,d3,vₓᵧᵧ], 
        [[2],c3,d0,d3,vₓᵧᵧ], 
        [[2],c3,d1,d2,vₓᵧᵧ],
        [[6],c1,c2,c3,vₓₓₓ], 
        [[6],d1,d2,d3,vᵧᵧᵧ], 
        [    c0,d3,d3,vₓᵧᵧ], 
        [    c2,d2,d2,vₓᵧᵧ],
        [    d0,c3,c3,vₓₓᵧ], 
        [    d2,c2,c2,vₓₓᵧ], 
        [[3],c0,c3,c3,vₓₓₓ],
        [[3],d0,d3,d3,vᵧᵧᵧ], 
        [    c2,c2,c2,vₓₓₓ], 
        [    d2,d2,d2,vᵧᵧᵧ],
        [c3,c3,vₓₓ],
        [d3,d3,vᵧᵧ], 
        [c3,d3,vₓᵧ]
    ]);

    let v5 = calculate([
        [[2],c0,c2,d3,vₓₓᵧ], 
        [[2],c0,c3,d2,vₓₓᵧ], 
        [[2],c0,d2,d3,vₓᵧᵧ],
        [[2],c1,c2,d2,vₓₓᵧ], 
        [[2],c1,c3,d1,vₓₓᵧ], 
        [[2],c1,d1,d3,vₓᵧᵧ],
        [[2],c2,c3,d0,vₓₓᵧ], 
        [[2],c2,d0,d3,vₓᵧᵧ], 
        [[2],c2,d1,d2,vₓᵧᵧ],
        [[2],c3,d0,d2,vₓᵧᵧ], 
        [[6],c0,c2,c3,vₓₓₓ], 
        [[6],d0,d2,d3,vᵧᵧᵧ],
        [    c1,d2,d2,vₓᵧᵧ], 
        [    c3,d1,d1,vₓᵧᵧ], 
        [    d1,c2,c2,vₓₓᵧ],
        [    d3,c1,c1,vₓₓᵧ], 
        [[3],c1,c2,c2,vₓₓₓ], 
        [[3],c3,c1,c1,vₓₓₓ],
        [[3],d1,d2,d2,vᵧᵧᵧ], 
        [[3],d3,d1,d1,vᵧᵧᵧ],
        [    c2,d3,vₓᵧ], 
        [    c3,d2,vₓᵧ], 
        [[2],c2,c3,vₓₓ], 
        [[2],d2,d3,vᵧᵧ]
    ]);

    let v4 = calculate([
        [[2],c0,c1,d3,vₓₓᵧ], 
        [[2],c0,c2,d2,vₓₓᵧ],
        [[2],c0,c3,d1,vₓₓᵧ], 
        [[2],c0,d1,d3,vₓᵧᵧ], 
        [[2],c1,c2,d1,vₓₓᵧ],
        [[2],c1,c3,d0,vₓₓᵧ], 
        [[2],c1,d0,d3,vₓᵧᵧ], 
        [[2],c1,d1,d2,vₓᵧᵧ],
        [[2],c2,d0,d2,vₓᵧᵧ], 
        [[2],c3,d0,d1,vₓᵧᵧ], 
        [[6],c0,c1,c3,vₓₓₓ],
        [[6],d0,d1,d3,vᵧᵧᵧ], 
        [    c0,d2,d2,vₓᵧᵧ],
        [    c2,d1,d1,vₓᵧᵧ], 
        [    d0,c2,c2,vₓₓᵧ], 
        [    d2,c1,c1,vₓₓᵧ],
        [[3],c0,c2,c2,vₓₓₓ], 
        [[3],c2,c1,c1,vₓₓₓ], 
        [[3],d0,d2,d2,vᵧᵧᵧ],
        [[3],d2,d1,d1,vᵧᵧᵧ],
        [    c2,c2,vₓₓ], 
        [    d2,d2,vᵧᵧ], 
        [    c1,d3,vₓᵧ], 
        [    c2,d2,vₓᵧ], 
        [    c3,d1,vₓᵧ], 
        [[2],c1,c3,vₓₓ],
        [[2],d1,d3,vᵧᵧ]
    ]);

    let v3 = calculate([
        [[2],c0,c1,d2,vₓₓᵧ], 
        [[2],c0,c2,d1,vₓₓᵧ],
        [[2],c0,c3,d0,vₓₓᵧ], 
        [[2],c0,d0,d3,vₓᵧᵧ], 
        [[2],c0,d1,d2,vₓᵧᵧ],
        [[2],c1,c2,d0,vₓₓᵧ], 
        [[2],c1,d0,d2,vₓᵧᵧ], 
        [[2],c2,d0,d1,vₓᵧᵧ],
        [[6],c0,c1,c2,vₓₓₓ], 
        [[6],d0,d1,d2,vᵧᵧᵧ], 
        [    c1,d1,d1,vₓᵧᵧ],
        [    c3,d0,d0,vₓᵧᵧ], 
        [    d1,c1,c1,vₓₓᵧ], 
        [    d3,c0,c0,vₓₓᵧ],
        [[3],c3,c0,c0,vₓₓₓ], 
        [[3],d3,d0,d0,vᵧᵧᵧ], 
        [    c1,c1,c1,vₓₓₓ],
        [    d1,d1,d1,vᵧᵧᵧ],
        [    c0,d3,vₓᵧ], 
        [    c1,d2,vₓᵧ], 
        [    c2,d1,vₓᵧ],
        [    c3,d0,vₓᵧ], 
        [[2],c0,c3,vₓₓ], 
        [[2],c1,c2,vₓₓ], 
        [[2],d0,d3,vᵧᵧ],
        [[2],d1,d2,vᵧᵧ], 
        [c3,vₓ], 
        [d3,vᵧ], 
    ]);

    let v2 = calculate([
        [[2],c0,c1 ,d1,vₓₓᵧ],
        [[2],c0,c2,d0,vₓₓᵧ], 
        [[2],c0,d0,d2,vₓᵧᵧ], 
        [[2],c1,d0,d1,vₓᵧᵧ],
        [    c0,d1,d1,vₓᵧᵧ], 
        [    c2,d0,d0,vₓᵧᵧ],
        [    d0,c1,c1,vₓₓᵧ], 
        [    d2,c0,c0,vₓₓᵧ], 
        [[3],c0,c1,c1,vₓₓₓ],
        [[3],c2,c0,c0,vₓₓₓ], 
        [[3],d0,d1,d1,vᵧᵧᵧ], 
        [[3],d2,d0,d0,vᵧᵧᵧ],
        [    c0,d2,vₓᵧ], 
        [    c1,d1,vₓᵧ], 
        [    c2,d0,vₓᵧ], 
        [[2],c0,c2,vₓₓ], 
        [[2],d0,d2,vᵧᵧ],
        [    c1,c1,vₓₓ], 
        [    d1,d1,vᵧᵧ], 
        [c2,vₓ], 
        [d2,vᵧ]
    ]);

    let v1 = calculate([
        [[2],c0,c1,d0,vₓₓᵧ], 
        [[2],c0,d0,d1,vₓᵧᵧ],
        [    c1,d0,d0,vₓᵧᵧ], 
        [    d1,c0,c0,vₓₓᵧ], 
        [[3],c1,c0,c0,vₓₓₓ],
        [[3],d1,d0,d0,vᵧᵧᵧ],
        [    c0,d1,vₓᵧ], 
        [    c1,d0,vₓᵧ], 
        [[2],c0,c1,vₓₓ],
        [[2],d0,d1,vᵧᵧ], 
        [c1,vₓ], 
        [d1,vᵧ], 
    ]);

    let v0 = calculate([
        [c0,d0,d0,vₓᵧᵧ], 
        [d0,c0,c0,vₓₓᵧ],
        [c0,c0,c0,vₓₓₓ], 
        [d0,d0,d0,vᵧᵧᵧ],
        [c0,d0,vₓᵧ], 
        [c0,c0,vₓₓ],
        [d0,d0,vᵧᵧ], 
        [c0,vₓ], 
        [d0,vᵧ], 
        [v]
    ]);    

    return [v9, v8, v7, v6, v5, v4, v3, v2, v1, v0];
}


export { getCoeffs3x3Exact }
