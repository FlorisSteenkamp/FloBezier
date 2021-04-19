import { squaredDistanceBetween } from "flo-vector2d";


/**
 * Returns an upper bound for the length of the given order 1, 2 or 3 bezier 
 * curve.
 * 
 * The curve has lenhth 0 iff this bound is zero.
 * 
 * This bound is quite loose as it uses the sum of the straight-line distances
 * between control points as a measure. 
 * @param ps
 * 
 * @doc
 */
function lengthSquaredUpperBound(ps: number[][]): number {
    let totalLength = 0;
    for (let i=0; i<ps.length-1; i++) {
        totalLength += squaredDistanceBetween(ps[i], ps[i+1]);
    }
    
    return totalLength;
}


export { lengthSquaredUpperBound }
