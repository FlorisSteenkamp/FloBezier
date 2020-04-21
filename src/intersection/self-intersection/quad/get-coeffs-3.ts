
import { γγ3 } from "../../../error-analysis/error-analysis";
import { twoProduct, qMultQuad, qAddQuad, qMultByNeg2, qNegativeOf, qDiffQuad } from "flo-numerical";
import { getXY } from "../../../to-power-basis/get-xy";


const abs = Math.abs;
const tp  = twoProduct;
const qmq = qMultQuad;
const qaq = qAddQuad;
const qdq = qDiffQuad;


/** 
 * Get self-intersection coefficients
 * * **precondition**: max bit-aligned bitlength: 47
 */
function getCoeffs3Quad(ps: number[][]) {
    let [[a3,a2,a1],[b3,b2,b1]] = getXY(ps);  // exact if max bit-aligned bitlength <= 49

    let a2b3 = tp(a2,b3);  // => error free
    let a3b2 = tp(a3,b2);  // => error free
    let a3b1 = tp(a3,b1);  // => error free
    let a1b3 = tp(a1,b3);  // => error free
    let a2b1 = tp(a2,b1);  // => error free
    let a1b2 = tp(a1,b2);  // => error free

    let f4 = qdq(a2b3,a3b2);  // 48-bit aligned => error free
    let f5 = qdq(a1b3,a3b1);  // 48-bit aligned => error free
    let f6 = qdq(a2b1,a1b2);  // 48-bit aligned => error free

    // Note: a variable prepended with and underscore is an absolute value,
    // postpended with an underscore denotes an absolute error (before 
    // multiplication by the round-off unit u**2).

    //let u2 = -2*a2*a3*b2*b3 + a2*a2*b3*b3 + a3*a3*b2*b2
    //let u2 = a2b3*(-2*a3b2 + a2b3) + a3b2*a3b2
    //let u2 = (a2b3 - a3b2)*(a2b3 - a3b2)
    let u2 = qmq(f4,f4);
    let u2_ = 2*abs(u2[1]);


    //let u1 = -a1*a3*b2*b3 - a2*a3*b1*b3 + a1*a2*b3*b3 + b1*b2*a3*a3
    //let u1 = a1*b3*-a3*b2 + a1*b3*a2*b3 + a3*b1*-a2*b3 + a3*b1*a3*b2
    //let u1 = a1b3*(a2b3 - a3b2) - a3b1*(a2b3 - a3b2)
    //let u1 = a1b3*f4 - a3b1*f4 = f4*(a1b3 - a3b1);
    let u1 = qmq(f4,f5);
    // 2* in line below since we're using an error of 6γγ for quad multiplication 
    // - other operations (plus, minus, etc.) have 3γγ.    
    let u1_ = 2*abs(u1[1]);


    //let u0 = -a1*a2*b2*b3 - a2*a3*b1*b2 - 2*a1*a3*b1*b3 + a1*a1*b3*b3 + a3*a3*b1*b1 + a1*a3*b2*b2 + b1*b3*a2*a2
    //let u0 = 
    //       a2b3*(a2b1 - a1b2) - a3b2*(a2b1 - a1b2) +
    //       a1b3*(-2*a3b1 + a1b3) + a3b1*a3b1;
    //let u0 = 
    //       f6*f4 + 
    //       (a1b3 - a3b1)*(a1b3 - a3b1);
    //let u0 = f6*f4 + f5*f5;
    let g7 = qmq(f6,f4);
    let g7_ = 2*abs(g7[1]);
    let g9 = qmq(f5,f5);
    let g9_ = 2*abs(g9[1]);
    let u0 = qaq(g7,g9);
    let u0_ = g7_ + g9_ + abs(u0[1]);


    // Solve: u2*t**2 + u1*t + u0 = 0
    return {
        coeffs:   [u2, u1, u0],
        errBound: [u2_, u1_, u0_].map(c => γγ3*c)
    };
}


export { getCoeffs3Quad }


