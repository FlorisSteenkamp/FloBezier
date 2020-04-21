/**
 * Returns the t parameter value of the point closest to the given point of the
 * given bezier curve.
 * * **don't use**: This function has numeric stability issues when the cubic is very close to
 * a line, e.g. 0 0 1 1 2 2 3 3.00000000000001. The same problem would occur by
 * following the example by Tom Sederberg, to quote: "If P1, P2, and P3 are
 * not collinear", and it turns out sometimes they *are* collinear. Use closestPointOnBezierPrecise
 * or closestPointOnBezier instead
 * @param ps
 * @param p
 */
declare function inversion(ps: number[][], p: number[][]): number;
/**
 * Returns the t parameter value of the point closest to the given point of the
 * given line.
 * * The bit-aligned bitlength of the control point coordinates of the line and
 * the given point must <= 52
 * * the result is accurate to within 1 ULP
 * @param ps an order 1 bezier curve
 * @param p a point
 */
declare function inversion1_BL52_1ULP(ps: number[][], p: number[]): number;
export { inversion, inversion1_BL52_1ULP };
