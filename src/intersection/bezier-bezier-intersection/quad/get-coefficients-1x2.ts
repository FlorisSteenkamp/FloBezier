
import { twoProduct, ddAddDd } from "double-double";
import { getImplicitForm1Quad } from "../../../implicit-form/quad/get-implicit-form1";
import { getXY } from "../../../to-power-basis/get-xy";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp  = twoProduct;
const qaq = ddAddDd;


// TODO - better docs
function getCoeffs1x2Quad(ps1: number[][], ps2: number[][]) {
    let {
        coeffs: { vₓ, vᵧ, v }  // vₓ, vᵧ, v:  48-bit aligned => error free
    } = getImplicitForm1Quad(ps1);

    let [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);

    // a2*v_x + b2*v_y
    //let v2 = c2*vₓ + d2*vᵧ;
    let p1 = tp(c2,vₓ);   // vₓ is a double => error free
    let p2 = tp(d2,vᵧ);   // vᵧ is a double => error free
    let v2 = qaq(p1,p2);  // 48-bit aligned => error free

    // a1*v_x + b1*v_y
    //let v1 = c1*vₓ + d1*vᵧ;
    let p3 = tp(c1,vₓ);   // vₓ is a double => error free
    let p4 = tp(d1,vᵧ);   // vᵧ is a double => error free
    let v1 = qaq(p3,p4);  // 48-bit aligned => error free

    // a0*v_x + b0*v_y + v_0
    //let v0 = c0*vₓ + d0*vᵧ + v;
    let p5 = tp(c0,vₓ);   // vₓ is a double => error free
    let p6 = tp(d0,vᵧ);   // vᵧ is a double => error free
    let p7 = qaq(p5,p6);  // 48-bit aligned => error free
    let v0 = qaq(p7,v);   // 48-bit aligned => error free


    return {
        coeffs:   [v2, v1, v0],
        errBound: [0, 0, 0]  // 48-bit aligned => completely error free
    };
}


export { getCoeffs1x2Quad }
