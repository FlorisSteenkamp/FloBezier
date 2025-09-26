import { evaluateExact, isPointOnBezierExtension } from "../../../src/index.js";


/**
 * Returns true if the infinte extensions of two bezier curves (by extending the
 * `t` parameter value from `-∞` to `+∞`) are identical (when they are seen as 
 * point sets), e.g. `[[1,1],[2,2]]` and `[[3,3],[4,4]]` would be considered 
 * identical.
 * 
 * * **note**: if the two bezier curves are not in general position then there
 * are many examples wherein they can have an infinite number of intersections
 * yet not be identical in the sense of this function, e.g. `[[1,1],[2,2]]` and
 * `[[1.5,1.5],[3,3],[0,0]]`
 *
 * * **precondition:** underflow / overflow 
 *
 * @param ps1 a bezier curve
 * @param ps2 another bezier curve
 * 
 * @doc
 */
 function areIntersectionsInfinte(
        ps1: number[][], 
        ps2: number[][]) {

    // Get `(ps1.length * ps2.length) + 1` points on the first bezier or its 
    // extension. This number is chosen because there are a maximum of 
    // `(ps1.length * ps2.length)` intersections between two bezier curves
    // (in general position) according to Bezout's Theorem. Thus if say 10 (for 
    // 2 cubics) unique points on one curve are also on the other then they 
    // are algebraically identical (provided they are in general position).


    const len = (ps1.length-1)*(ps2.length-1) + 1;
    const mid = Math.ceil(len/2);
    for (let i=1; i<len+1; i++) {
        // Make each parametric `t`-value an integer power of two to keep the 
        // bitlength a minimum (1 in this case).
        // For 2 cubics for example we will have `t` values of:
        // `[0.0625, 0.125, 0.25, 0.5, 1, 2, 4, 8, 16, 32]`
        const t = 2**(i-mid);
        const p = evaluateExact(ps1, t);
        const onExtension = isPointOnBezierExtension(ps2, p);
        if (!onExtension) {
            // ignore coverage
            return false; 
        }
    }

    return true;
}


export { areIntersectionsInfinte }
