import { eDiff, eMult, eMultBy2, eNegativeOf } from 'big-float-ts';
import { erCompare } from './er-compare.js';
import { calcExactSquareRoot } from './calc-exact-square-root.js';
/** @internal */
function getTransform2(xyA, xyB) {
    const [D1x, D2x] = getTransformedTs2(xyA[0], xyB[0]);
    const [D1y, D2y] = getTransformedTs2(xyA[1], xyB[1]);
    if (erCompare(D1x, D1y) === 0 ||
        erCompare(D1x, D2y) === 0) {
        return D1x;
    }
    if (erCompare(D2x, D1y) === 0 ||
        erCompare(D2x, D2y) === 0) {
        return D2x;
    }
    throw new Error('An unexpected error occured.');
}
/**
 * @param A A coordinate (x or y) of a bezier curve in power basis
 * @param B A coordinate (x or y) of another bezier curve in power basis
 *
 * @internal
 */
function getTransformedTs2(A, B) {
    const [p2, p1] = A;
    const [r2, r1] = B;
    // The (over-determined) set of equations used to solve `c` and `d`
    // (1)   r2 = cc*p2
    // (2)   r1 = c*p1 + 2*c*d*p2
    // (3)   r0 = dd*p2 + d*p1 + p0
    // Note that since `r2,r1,r0,p2,p1,p0` are rational we must have 
    // (non-trivially) that `c` is rational and thus `d` also rational.
    //-----------------------------------
    // Calculate `c` *exactly* using (1)
    //-----------------------------------
    // the *exact* positive root `c` is given as the rational number `N/D` 
    // where `N` and `D` are [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) expansions
    const [N, D] = calcExactSquareRoot([r2, p2]);
    //-----------------------------------
    // Calculate `d` *exactly* using (2)
    //-----------------------------------
    // (2)   r1 = c*p1 + 2*c*d*p2  =>
    //       r1 = c*(p1 + 2*d*p2)  =>
    // dA = (r1/c - p1)/(2*p2)
    //    = r1/(c*2*p2) - c*p1/(c*2*p2)
    //    = (r1 - c*p1)/(c*2*p2)
    //    = (r1 - N*p1/D)/(N*2*p2/D)
    //    = (D*r1 - N*p1)/(N*2*p2)
    // dB = (r1/(-c) - p1)/(2*p2)
    //    = r1/(-c*2*p2) - c*p1/(c*2*p2)
    //    = (-r1 - c*p1)/(c*2*p2)
    //    = (-r1 - N*p1/D)/(N*2*p2/D)
    //    = (-r1*D - N*p1)/(N*2*p2)
    return [
        [eDiff(eMult(r1, D), eMult(p1, N)), eMult(N, eMultBy2(p2))],
        [eDiff(eMult(r1, eNegativeOf(D)), eMult(p1, N)), eMult(N, eMultBy2(p2))]
    ].sort(erCompare);
}
export { getTransform2 };
//# sourceMappingURL=get-transform-2.js.map