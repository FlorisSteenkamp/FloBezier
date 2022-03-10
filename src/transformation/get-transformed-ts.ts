import { allRootsCertified, refineK1 } from "flo-poly";
import { ddDiffDd, ddDivDd, ddMultDd, ddNegativeOf } from "double-double";
import { eDiff, eEstimate, eNegativeOf, eSign, eToDd, scaleExpansion } from 'big-float-ts';
import { reduceOrderIfPossible } from "./reduce-order-if-possible.js";
import { getXYExact } from "../to-power-basis/get-xy/exact/get-xy-exact.js";

const inf = Number.POSITIVE_INFINITY;
const { abs } = Math;


/**
 * Given two algebraically identical bezier curves (but with possibly different
 * endpoints) transform the second curve into the first so that it has exactly
 * the same control points but such that the parameter `t` values run 
 * from `t0` to `t1` where `t0` and `t1` are to be determined and returned by
 * this function as `[t0,t1]`.
 * 
 * * **precondition**: the given pair of bezier curves must be algebraically
 * identical, e.g. `ps = [[1,1],[2,2],[3,2],[3,-1]]` 
 * and `ps_ = [[-1,-21],[-3.25,-29.25],[-6.625,-40.3125],[-11.546875,-55.03125]]`
 * 
 * @param ps 
 * @param ps_ 
 */
// TODO - remove this function
function getTransformedTs(
        ps: number[][],
        ps_: number[][],
        orderAlreadyReduced = false): number[][] {

    if (!orderAlreadyReduced) {
        const len = ps.length;
        ps = reduceOrderIfPossible(ps);
        if (len !== ps.length) {
            ps_ = reduceOrderIfPossible(ps_);
        }
    }

    if (ps.length !== ps_.length) {
        throw new Error('The given bezier curves should be algebraically *identical*');
    }

    const xy  = getXYExact(ps);
    const xy_ = getXYExact(ps_);

    {
        const ab = getLinearTransformation(xy_[0], xy[0]);
        if (ab !== undefined) {
            const { a, b } = ab;

            // t0 = -xb/xa;
            // t1 = (1 - xb)/xa;
            const t0 = ddDivDd(ddNegativeOf(b),a);
            const t1 = ddDivDd(ddDiffDd([0,1],b),a);

            return [t0,t1];
        }
    }

    const ab = getLinearTransformation(xy_[1], xy[1])!;
    const { a: yaDd, b: ybDd } = ab;
    const t0 = ddDivDd(ddNegativeOf(ybDd),yaDd);
    const t1 = ddDivDd(ddDiffDd([0,1],ybDd),yaDd);

    return [t0,t1];
}


/**
 * Given two algebraically identical bezier curves (but with possibly different
 * endpoints) return the transformation parameters (the `a` and `b` in
 * `t = ax + b`) for transforming the second curve into the first so that it has 
 * exactly the same control points but such that the parameter `t` values run 
 * from `t0` to `t1` where `t0` and `t1` can be obtained via `t0 = -b/a` 
 * and `t1 = (1 - b)/a` (or in reverse: `t0_ = b` and `t1_ = a + b`).
 * 
 * * **precondition**: the given pair of bezier curves must be algebraically
 * identical, e.g. `ps = [[1,1],[2,2],[3,2],[3,-1]]` 
 * and `ps_ = [[-1,-21],[-3.25,-29.25],[-6.625,-40.3125],[-11.546875,-55.03125]]`
 * 
 * @param psA 
 * @param psB 
 */
// TODO - rename to something better
/*
function getTransformation(
        psA: number[][],
        psB: number[][],
        orderAlreadyReduced = false): { a: number[], b: number[] } {

    if (!orderAlreadyReduced) {
        psA = reduceOrderIfPossible(psA);
        psB = reduceOrderIfPossible(psB);
    }

    if (psA.length !== psB.length) {
        throw new Error('The given bezier curves should be algebraically *identical*');
    }

    const xyA  = getXYExact(psA);
    const xyB = getXYExact(psB);

    const p0 = xyB[0][0];
    const coord = eSign(p0) === 0 ? 1 : 0;

    return getLinearTransformation(xyB[coord], xyA[coord])!;
}
*/


/**
 * x -> ax + b
 * 
 * * **precondition**: must be transformable
 * @param B the input polynomial
 * @param A the required output polynomial
 * 
 * @internal
 */
function getLinearTransformation(
        B: number[][],
        A: number[][]): { a: number[], b: number[] } | undefined {

    const [p0,p1,p2,p3] = B;
    const [r0,r1,r2,r3] = A;

    // The (over-determined) set of equations used to solve `a` and `b`
    // const r0 = p0*aaa;
    // const r1 = 3*aa*p0*b + aa*p1;
    // const r2 = 3* a*p0*bb + a*2*p1*b + a*p2;
    // const r3 = p0*bbb + p1*bb + p2*b + p3;

    // TODO - important - we will have a problem if the found root is less than
    // one since then roots are only found accurate to within an `eps`. Change
    // the flo-poly root algorithm so we have option of accuracy? Maybe it's
    // time to introduce a `options` object as a parameter of the `allRoots`
    // family of algorithms, then we can also allow for additional options.

    // A quick solution in this case is not to use allRootsCertfied but rather
    // do a simple double-double division since the polynomials are linear

    const polyAExact = [p0,[0],[0],eNegativeOf(r0)];
    // pa = p0*a**3 - r0 => a**3 = r0/p0
    const paDd = [eToDd(p0), [0,0], [0,0], ddNegativeOf(eToDd(r0))];
    const aE = [
        abs(eEstimate(eDiff(polyAExact[0],paDd[0]))),
        0, 0,
        abs(eEstimate(eDiff(polyAExact[3],paDd[3])))
    ];

    // Only one real root is possible.
    const _a = allRootsCertified(
        paDd, -inf, +inf, aE, 
        () => polyAExact, false
    )[0];

    // TODO - the below can simply be replaced by `const a = refineK1(_a,paE)[0].tS` once
    // flo-poly has been updated
    const a = _a.tE === _a.tS 
        ? [0,_a.tS] 
        : refineK1(_a,polyAExact)[0].tS;

    const aaaDd = ddMultDd(ddMultDd(a,a),a);

    // Double precision
    // const pb2 = [3*r0, a*aa*p1 - a*r1];
    // const b2 = allRootsCertifiedSimplified(pb2);

    // ax + b = 0 => x = -b/a
    const polyBDd = [
        eToDd(scaleExpansion(r0,3)),
        ddDiffDd(ddMultDd(eToDd(p1),aaaDd), ddMultDd(eToDd(r1),a))
    ];
    // TODO - for the moment (before flo-poly update) change the below to a
    // simple division calculation taking care of special cases
    const _b = allRootsCertified(polyBDd, -inf, +inf)[0];

    // TODO - the below can simply be replaced by `const b = refineK1(_b,pbDd)[0].tS` once
    // flo-poly has been updated
    const b = _b.tE === _b.tS 
        ? [0,_b.tS] 
        : refineK1(_b,polyBDd)[0].tS;

    // One alternative (due to overdetermined set of equations):
    // const pb1 = [p0,p1,p2,p3 - r3];
    // const b1 = allRootsCertifiedSimplified(pb1);
    // const b = mid(b2[0]);

    return { a, b };
}


export { getLinearTransformation, getTransformedTs/*, getTransformation*/ }
