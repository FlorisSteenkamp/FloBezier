
import { getImplicitForm1_bitlength45_exact } from "../../../../implicit-form/inp-bitlength45/exact/get-implicit-form1-bitlength45-exact";
import { getXY } from "../../../../to-power-basis/get-xy";
import { twoProduct, ddAddDd } from "double-double";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp = twoProduct;
const qaq = ddAddDd;


function getCoeffs1x1Exact(ps1: number[][], ps2: number[][]) {
    let { vₓ, vᵧ, v } = getImplicitForm1_bitlength45_exact(ps1);

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

    return [v1, v0];
}


export { getCoeffs1x1Exact }
