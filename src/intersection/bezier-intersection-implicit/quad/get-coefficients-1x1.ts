
import { twoProduct, qAddQuad } from "flo-numerical";
import { getImplicitForm1Quad } from "../../../implicit-form/quad/get-implicit-form1";
import { getXY } from "../../../to-power-basis/get-xy";


const tp  = twoProduct;
const qaq = qAddQuad;


// TODO - better docs
function getCoeffs1x1Quad(ps1: number[][], ps2: number[][]) {
    let {
        coeffs: { vₓ, vᵧ, v }  // vₓ, vᵧ, v:  48-bit aligned => error free
    } = getImplicitForm1Quad(ps1);

    let [[c1,c0],[d1,d0]] = getXY(ps2);

    //let v1 = c1*vₓ + d1*vᵧ;
    let p1 = tp(c1,vₓ);   // vₓ is a double => error free
    let p2 = tp(d1,vᵧ);   // vᵧ is a double => error free
    let v1 = qaq(p1,p2);  // 48-bit aligned => error free

    //let v0 = c0*vₓ + d0*vᵧ + v_0;
    let p3 = tp(c0,vₓ);   // vₓ is a double => error free
    let p4 = tp(d0,vᵧ);   // vᵧ is a double => error free
    let p5 = qaq(p3,p4);  // 48-bit aligned => error free
    let v0 = qaq(p5,v);   // 48-bit aligned => error free 


    return {
        coeffs:   [v1, v0],
        errBound: [0, 0]  // 48-bit aligned => completely error free
    };
}


export { getCoeffs1x1Quad }
