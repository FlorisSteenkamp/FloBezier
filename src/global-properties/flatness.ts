
import { lengthUpperBound } from "./length/length-upper-bound";
import { distanceBetween } from "flo-vector2d";


/**
 * Returns a flatness measure of the given curve - calculated as the total 
 * distance between consecutive control points divided by the distance between
 * the endpoints.
 * 
 * @param ps An order 1,2 or 3 bezier curve.
 * 
 * @doc
 */
function flatness(ps: number[][]): number {
    return lengthUpperBound(ps) / distanceBetween(ps[0], ps[ps.length-1]);
}


export { flatness }
