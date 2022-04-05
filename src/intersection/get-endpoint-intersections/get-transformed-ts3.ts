import { allRootsCertified, bGcdInt, eGcdInt, refineK1, RootIntervalExp } from "flo-poly";
import { ddDiffDd, ddDivDd, ddMultBy2, ddMultByNeg2, ddMultDd, ddNegativeOf } from "double-double";
import { bitLength, eDiff, eDiv, eEstimate, eNegativeOf, eSign, eToDd, exponent, scaleExpansion } from 'big-float-ts';

const { POSITIVE_INFINITY: inf, EPSILON: eps } = Number;
const { abs, sqrt } = Math;


/**
 * Given two algebraically identical bezier curves (but with possibly different
 * endpoints) return the transformation parameters (the `c` and `d` in
 * `t = cx + d`) for transforming the second curve into the first so that it has 
 * exactly the same control points but such that the parameter `t` values run 
 * from `t0` to `t1` where `t0` and `t1` can be obtained via `t0 = -d/c` 
 * and `t1 = (1 - d)/c` (or in reverse: `t0_ = d` and `t1_ = c + d`).
 * 
 * * **precondition**: the given pair of bezier curves must be algebraically
 * identical, e.g. `ps = [[1,1],[2,2],[3,2],[3,-1]]` 
 * and `ps_ = [[-1,-21],[-3.25,-29.25],[-6.625,-40.3125],[-11.546875,-55.03125]]`
 * 
 * * **precondition**: the given pair of bezier curves are in lowest possible
 * order
 * 
 * @internal
 */
function getLinearTransformation3(
        A: number[][],
        B: number[][]): { c: number[], d: number[] } {

    const [p0,p1/*,p2,p3*/] = A;
    const [r0,r1/*,r2,r3*/] = B;

    // The (over-determined) set of equations used to solve `c` and `d`
    // (1)   r0 = p0*ccc
    // (2)   r1 = 3*cc*p0*d + cc*p1
    // (3)   r2 = 3*c*p0*dd + 2*c*p1*d + c*p2
    // (4)   r3 = p0*ddd + p1*dd + p2*d + p3

    //------------------------
    // Calculate `c`
    //------------------------

    // polyC = p0*c**3 - r0 => c**3 = r0/p0
    const polyCExact = [p0,[0],[0],eNegativeOf(r0)];
    const polyCDd = [
        eToDd(p0), 
        [0,0], [0,0], 
        ddNegativeOf(eToDd(r0))
    ];
    const polyCError = [
        abs(eEstimate(eDiff(polyCExact[0],polyCDd[0]))),
        0, 0,
        abs(eEstimate(eDiff(polyCExact[3],polyCDd[3])))
    ];

    // Only one real root is possible.
    const _c = allRootsCertified(
        polyCDd, -inf, +inf, polyCError, 
        () => polyCExact, false
    )[0];

    // TODO - the below can simply be replaced by `const a = refineK1(_a,paE)[0].tS` once
    // flo-poly has been updated
    const c = _c.tE === _c.tS 
        ? [0,_c.tS] 
        : refineK1(_c,polyCExact)[0].tS;

    // const cccDd = ddMultDd(ddMultDd(c,c),c);
    // const cccDd2 = eToDd(eDiv(r0,p0,2));
    const cccDd = ddDivDd(eToDd(r0),eToDd(p0));

    //------------------------
    // Calculate `d`
    //------------------------

    // 3*cc*p0*d + cc*p1 = r1 =>
    // d = (r1 - cc*p1)/(3*cc*p0) =>
    // d = (c*r1 - ccc*p1)/(3*ccc*p0)

    // Only one real root is possible.
    const N = ddDiffDd(
        ddMultDd(eToDd(r1),c),
        ddMultDd(eToDd(p1),cccDd)
    );
    const D = eToDd(scaleExpansion(r0,3));
    // const polyBDd = [D,N];

    // TODO - for the moment (before flo-poly update) change the below to a
    // simple division calculation taking care of special cases
    // const _d = allRootsCertified(polyBDd, -inf, +inf)[0];

    // TODO - the below can simply be replaced by `const b = refineK1(_b,pbDd)[0].tS` once
    // flo-poly has been updated
    ///const d = _d.tE === _d.tS 
    ///    ? [0,_d.tS] 
    ///    : refineK1(_d,polyBDd)[0].tS;

    const d = ddDivDd(eToDd(N), eToDd(D));

    return { c, d };
}


export { getLinearTransformation3 }
