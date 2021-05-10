/**
 * * **precondition** max bit-aligned bitlength === 47
 * * returned parameter values are guaranteed accurate to within 4 ulps
 *
 * @param circle
 * @param ps
 *
 * @doc
 */
declare function circleBezierIntersectionPrecise(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): {
    t: number;
    p: number[];
}[];
export { circleBezierIntersectionPrecise };
