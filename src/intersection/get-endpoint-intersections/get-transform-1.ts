import { eDiff, eSign } from 'big-float-ts';


function getTransform1(
        _xyA: number[][][],
        _xyB: number[][][]): number[][] {

    // Both `_xyB[0][0]` and `_xyB[1][0]` can't be zero else we would have had
    // a lower order bezier curve. Also, if `_xyB[0][0]` is zero 
    // then `_xyA[0][0]` will also be zero (and same with the y coordinate)
    const coord = eSign(_xyA[0][0]) === 0 ? 1 : 0;
    const xyA = _xyA[coord];
    const xyB = _xyB[coord];

    return getTransformedTs1(xyA,xyB);
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
function getTransformedTs1(
        A: number[][],
        B: number[][]): number[][] {

    const [p1,p0] = A;
    const [  ,r0] = B;

    // The (over-determined) set of equations used to solve `c` and `d`
    // (1)   r1 = c*p1       => c = r1/p1
    // (2)   r0 = d*p1 + p0  => d = (r0 - p0)/p1

    //---------------
    // Calculate `d`
    //---------------
    // (1)   d = (r0 - p0)/p1

    // the *exact* `d` is given as the rational number `N/D`
    // where `N` and `D` are Shewchuk expansions
    return [eDiff(r0,p0),p1];
}


export { getTransform1 }
