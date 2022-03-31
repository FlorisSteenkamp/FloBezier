import { allRootsCertified, refineK1, RootIntervalExp } from "flo-poly";
import { ddDiffDd, ddDivDd, ddMultBy2, ddMultByNeg2, ddMultDd, ddNegativeOf } from "double-double";
import { eDiff, eDiv, eEstimate, eNegativeOf, eSign, eToDd, scaleExpansion } from 'big-float-ts';

const { POSITIVE_INFINITY: inf, EPSILON: eps } = Number;
const { abs } = Math;


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
 *//*
function getLinearTransformation(
        A: number[][],
        B: number[][]): { c: number[], d: number[] } {

    if (B.length === 4) {
        return getLinearTransformation3(A,B);
    }

    if (B.length === 3) {
        return getLinearTransformation2(A,B);
    }

    // TODO - add case of A.length === 2 as well

    throw new Error('We shouldn\'t get to here'); // TODO - remove in future
}
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


function getLinearTransformation2(
        A: number[][],
        B: number[][]): {
            ca: number[],
            d2: number[],
            cb: number[],
            d1: number[],
            signD2: number,
            signD1: number,
            signParity: number } {

    const [p2,p1,p0] = A;
    const [r2,r1,r0] = B;

    // The (over-determined) set of equations used to solve `c` and `d`
    // (1)   r2 = cc*p2
    // (2)   r1 = c*p1 + 2*c*d*p2
    // (3)   r0 = dd*p2 + d*p1 + p0

    //------------------------
    // Calculate `c` using (1)
    //------------------------

    // polyC = p2*c*c - r2 => cc = r2/p2
    const polyCExact = [p2,[0],eNegativeOf(r2)];
    const polyCDd = [eToDd(p2), [0,0], ddNegativeOf(eToDd(r2))];
    const polyCError = [
        abs(eEstimate(eDiff(polyCExact[0],polyCDd[0]))),
        0,
        abs(eEstimate(eDiff(polyCExact[2],polyCDd[2])))
    ];
    const _cs = allRootsCertified(
        polyCDd, -inf, +inf, polyCError, 
        () => polyCExact, false
    );
    // TODO - consider case of double root
    const [c1,c2] = _cs.map(v => {
        // TODO - the below can simply be replaced by `const a = refineK1(_a,paE)[0].tS` once
        // flo-poly has been updated
        return v.tE === v.tS ? [0,v.tS] : refineK1(v,polyCExact)[0].tS;
    });

    //------------------------
    // Calculate `d` using (3)
    //------------------------

    // (3)   r0 = dd*p2 + d*p1 + p0
    const P0minR0 = eDiff(p0,r0);
    const polyDExact = [p2,p1,P0minR0];
    const polyDDd = polyDExact.map(eToDd);
    const polyDError = [
        abs(eEstimate(eDiff(polyDExact[0],polyDDd[0]))),
        abs(eEstimate(eDiff(polyDExact[1],polyDDd[1]))),
        abs(eEstimate(eDiff(polyDExact[2],polyDDd[2])))
    ];
    const _ds = allRootsCertified(
        polyDDd, -inf, +inf, polyDError, 
        () => polyDExact, false
    );
    // TODO - consider case of double root
    const ds: RootIntervalExp[][] = _ds.map(v => {
        // TODO - the below can simply be replaced by `return refineK1(v,polyDExact)` once
        // flo-poly has been updated
        return v.tE === v.tS 
            ? [{ multiplicity: 1, tS: [0,v.tS], tE: [0,v.tE] }]
            : refineK1(v,polyDExact);
    });
    
    const ds_: number[][] = [];
    for (let d of ds) {
        for (let d_ of d) {
            if (d_.multiplicity === 1) {
                ds_.push(d_.tS);
            } else if (d_.multiplicity === 2) {
                ds_.push(d_.tS, d_.tS);
            }
        }
    }
    const [d1,d2] = ds_;

    // dd*p2 + d*p1 + (p0 - r0) = 0
    // d = (-p1 +- sqrt(p1**2 - 4*p2*(p0 - r0)))/(2*p2)

    //------------------------
    // Calculate sign of `d`
    //------------------------
    const signP1 = eSign(p1);
    const signP2 = eSign(p2);
    const signP0minR0 = eSign(P0minR0);

    const [signN1,signN2] = [-1,+1].map(_s => {
        const s = _s * signP2;
        return (
              signP1 === 0
            ? eSign(P0minR0) === 0 ? 0 : +1
            : s*signP1 < 0
            ? s
            : signP2*signP0minR0 > 0
            ? -s
            : signP0minR0 === 0 ? 0 : s
        );
    });

    const signD1 = signN1 * signP2;
    const signD2 = signN2 * signP2;

    // If r1 is negative (positive) then c*r must be negative (positive)
    // TODO - consider case where r1 is zero
    return eSign(r1) > 0
        ? { ca:c2, d2,    cb:c1, d1,    signD2, signD1, signParity: +1 }
        : { ca:c1, d2,    cb:c2, d1,    signD2, signD1, signParity: -1 };
}


export { getLinearTransformation2, getLinearTransformation3 }
