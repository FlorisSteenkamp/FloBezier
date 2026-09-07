import { eDiff, eMult, eSign, scaleExpansion2 } from 'big-float-ts';
import { calcExactCubeRoot } from "./calc-exact-cube-root.js";
/** @internal */
function getTransform3(xyA, xyB) {
    // Both `_xyB[0][0]` and `_xyB[1][0]` can't be zero else we would have had
    // a lower order bezier curve. Also, if `_xyB[0][0]` is zero 
    // then `_xyA[0][0]` will also be zero (and same with the y coordinate)
    const coord = eSign(xyA[0][0]) === 0 ? 1 : 0;
    const xyA_ = xyA[coord];
    const xyB_ = xyB[coord];
    return getTransformedTs3(xyA_, xyB_);
}
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
function getTransformedTs3(A, B) {
    const [p3, p2] = A;
    const [r3, r2] = B;
    // The (over-determined) set of equations used to solve `c` and `d`
    // (1)   r3 = p3*ccc
    // (2)   r2 = 3*cc*p3*d + cc*p2
    // (3)   r1 = 3*c*p3*dd + 2*c*p2*d + c*p1
    // (4)   r0 = p3*ddd + p2*dd + p1*d + p0
    //-------------------------
    // Calculate `c` *exactly*
    //-------------------------
    const C = calcExactCubeRoot([r3, p3]);
    //-------------------------
    // Calculate `d` *exactly*
    //-------------------------
    // (2)   3*cc*p3*d + cc*p2 = r2
    //  =>   d = (r2/cc - p2)/(3*p3)
    const NN = eSquare(C[0]);
    return [
        eDiff(eMult(r2, eSquare(C[1])), eMult(p2, NN)),
        eMult(scaleExpansion2(3, p3), NN)
    ];
}
/** @internal */
function eSquare(v) {
    return eMult(v, v);
}
export { getTransform3 };
//# sourceMappingURL=get-transform-3.js.map