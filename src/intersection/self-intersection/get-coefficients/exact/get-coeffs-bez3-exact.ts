import { expansionProduct, fastExpansionSum, eDiff } from 'big-float-ts';
import { toPowerBasis3Exact } from "../../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const epr = expansionProduct;
const fes = fastExpansionSum;
const ediff = eDiff;


/**
 * Returns an error-free polynomial in 1 variable whose roots are the parameter 
 * values of the self-intersection points of the given cubic bezier curve.
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) floating point expansions from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps a cubic bezier curve.
 * 
 * @internal
 */
function getCoeffsBez3Exact(ps: number[][]) {
    const [[a3,a2,a1],[b3,b2,b1]] = toPowerBasis3Exact(ps);

    const a2b3 = epr(a2,b3);
    const a3b2 = epr(a3,b2);
    const a3b1 = epr(a3,b1);
    const a1b3 = epr(a1,b3);
    const a2b1 = epr(a2,b1);
    const a1b2 = epr(a1,b2);

    const f4 = ediff(a2b3,a3b2);
    const f5 = ediff(a1b3,a3b1);
    const f6 = ediff(a2b1,a1b2);

    
    //const u2 = -2*a2*a3*b2*b3 + a2*a2*b3*b3 + a3*a3*b2*b2
    const u2 = epr(f4,f4);

    //const u1 = -a1*a3*b2*b3 - a2*a3*b1*b3 + a1*a2*b3*b3 + b1*b2*a3*a3
    const u1 = epr(f4,f5);

    //const u0 = -a1*a2*b2*b3 - a2*a3*b1*b2 - 2*a1*a3*b1*b3 + a1*a1*b3*b3 + a3*a3*b1*b1 + a1*a3*b2*b2 + b1*b3*a2*a2
    const g7 = epr(f4,f6);
    const g9 = epr(f5,f5);
    const u0 = fes(g7,g9);
    
    // Solve: u2*t**2 + u1*t + u0 = 0

    return [u2, u1, u0];
}


export { getCoeffsBez3Exact }
