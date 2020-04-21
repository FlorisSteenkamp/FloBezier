
import { γ1 } from "../../../error-analysis/error-analysis";
import { getXY } from "../../../to-power-basis/get-xy";


const abs = Math.abs;


/** 
 * Get self-intersection coefficients
 * * **precondition**: max bit-aligned bitlength: 47
 */
function getCoeffs3(ps: number[][]) {
    let [[a3,a2,a1],[b3,b2,b1]] = getXY(ps);  // exact if max bit-aligned bitlength <= 49

    let a2b3 = a2*b3;
    let a3b2 = a3*b2;
    let a3b1 = a3*b1;
    let a1b3 = a1*b3;
    let a2b1 = a2*b1;
    let a1b2 = a1*b2;

    // Note: a variable prepended with and underscore is an absolute value,
    // postpended with an underscore denotes an absolute error (before 
    // multiplication by the round-off unit u) - both underscores present means
    // it is both an absolute value and a round-off error.
    let _a2b3_ = abs(a2b3);
    let _a3b2_ = abs(a3b2);
    let _a3b1_ = abs(a3b1);
    let _a1b3_ = abs(a1b3);
    let _a2b1_ = abs(a2b1);
    let _a1b2_ = abs(a1b2);

    let f4 = a2b3 - a3b2;
    let _f4 = abs(f4);
    let f4_ = _a2b3_ + _a3b2_ + _f4;
    let f5 = a1b3 - a3b1;
    let _f5 = abs(f5);
    let f5_ = _a1b3_ + _a3b1_ + _f5;
    let f6 = a2b1 - a1b2;
    let _f6 = abs(f6);
    let f6_ = _a2b1_ + _a1b2_ + _f6;

    
    //let u2 = -2*a2*a3*b2*b3 + a2*a2*b3*b3 + a3*a3*b2*b2
    //let u2 = a2b3*(-2*a3b2 + a2b3) + a3b2*a3b2
    //let u2 = (a2b3 - a3b2)*(a2b3 - a3b2)
    let u2 = f4*f4;
    let u2_ = 2*f4_*_f4 + abs(u2);

    
    //let u1 = -a1*a3*b2*b3 - a2*a3*b1*b3 + a1*a2*b3*b3 + b1*b2*a3*a3
    //let u1 = a1*b3*-a3*b2 + a1*b3*a2*b3 + a3*b1*-a2*b3 + a3*b1*a3*b2
    //let u1 = a1b3*(a2b3 - a3b2) - a3b1*(a2b3 - a3b2)
    //let u1 = a1b3*f4 - a3b1*f4 = f4*(a1b3 - a3b1);
    let u1 = f4*f5;
    let u1_ = f4_*_f5 + _f4*f5_ + abs(u1);
         

    //let u0 = -a1*a2*b2*b3 - a2*a3*b1*b2 - 2*a1*a3*b1*b3 + a1*a1*b3*b3 + a3*a3*b1*b1 + a1*a3*b2*b2 + b1*b3*a2*a2
    //let u0 = 
    //       a2b3*(a2b1 - a1b2) - a3b2*(a2b1 - a1b2) +
    //       a1b3*(-2*a3b1 + a1b3) + a3b1*a3b1;
    //let u0 = 
    //       f6*f4 + 
    //       (a1b3 - a3b1)*(a1b3 - a3b1);
    //let u0 = f6*f4 + f5*f5;
    let g7 = f6*f4;
    let g7_ = f6_*_f4 + _f6*f4_ + abs(g7);
    let g9 = f5*f5;
    let g9_ = 2*_f5*f5_ + abs(g9);
    let u0 = g7 + g9;
    let u0_ = g7_ + g9_ + abs(u0);


    // Solve: u2*t**2 + u1*t + u0 = 0
    return {
        coeffs:   [u2, u1, u0],
        errBound: [u2_, u1_, u0_].map(c => γ1*c)
    };
}


export { getCoeffs3 }


