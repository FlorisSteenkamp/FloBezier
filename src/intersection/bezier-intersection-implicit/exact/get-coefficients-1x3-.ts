
import { getImplicitForm1Exact_ } from "../../../implicit-form/exact/get-implicit-form1-";
import { twoProduct, qAddQuad } from "flo-numerical";
import { getXY } from "../../../to-power-basis/get-xy";


function getCoeffs1x3Exact_(ps1: number[][], ps2: number[][]) {
    let { vₓ, vᵧ, v } = getImplicitForm1Exact_(ps1);

    let [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY(ps2);

    
    // a3*v_x + b3*v_y
    //let v3 = c3*vₓ + d3*vᵧ;
    let p1 = twoProduct(c3,vₓ);   // vₓ is a double => error free
    let p2 = twoProduct(d3,vᵧ);   // vᵧ is a double => error free
    let v3 = qAddQuad(p1,p2);  // 48-bit aligned => error free

    // a2*v_x + b2*v_y
    //let v2 = c2*vₓ + d2*vᵧ;
    let p3 = twoProduct(c2,vₓ);   // vₓ is a double => error free
    let p4 = twoProduct(d2,vᵧ);   // vᵧ is a double => error free
    let v2 = qAddQuad(p3,p4);  // 48-bit aligned => error free

    // a1*v_x + b1*v_y
    //let v1 = c1*vₓ + d1*vᵧ;
    let p5 = twoProduct(c1,vₓ);   // vₓ is a double => error free
    let p6 = twoProduct(d1,vᵧ);   // vᵧ is a double => error free
    let v1 = qAddQuad(p5,p6);  // 48-bit aligned => error free

    // a0*v_x + b0*v_y + v_0
    //let v0 = c0*vₓ + d0*vᵧ + v;
    let p7 = twoProduct(c0,vₓ);   // vₓ is a double => error free
    let p8 = twoProduct(d0,vᵧ);   // vᵧ is a double => error free
    let p9 = qAddQuad(p7,p8);  // 48-bit aligned => error free
    let v0 = qAddQuad(p9,v);   // 48-bit aligned => error free


    return [v3, v2, v1, v0];
}


export { getCoeffs1x3Exact_ }
