import { RootInterval } from "flo-poly";
/**
 * Returns the closest point(s) (and parameter `t` value(s)) on the given
 * bezier curve to the given point.
 *
 * * guaranteed accurate to 4 ulps in `t` value
 *
 * @param ps
 * @param p
 *
 * @doc
 */
declare function closestPointOnBezierCertified(ps: number[][], p: number[]): {
    intervalBox: number[][];
    ri: RootInterval;
    di: number[];
}[];
export { closestPointOnBezierCertified };
