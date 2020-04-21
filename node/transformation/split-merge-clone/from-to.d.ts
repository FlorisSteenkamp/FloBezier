/**
 * Returns a bezier curve that starts and ends at the given t parameters.
 * Uses de Casteljau's algorithm.
 *
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2*2n*max_k(|b_k|)η, where n = 3 (for a cubic), b_k are the control
 * points and η is Number.EPSILON.
 * @param ps A cubic bezier curve
 * @param t1 The t parameter where the resultant bezier should start
 * @param t2 The t parameter where the resultant bezier should end
 */
declare function fromTo(ps: number[][]): (t1: number, t2: number) => number[][];
/**
 * Returns a bezier curve that starts at the given curve and ends at the
 * given t parameter. Uses de Casteljau's algorithm.
 *
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2*2n*max_k(|b_k|)η, where n = 3 (for a cubic), b_k are the control
 * points and η is Number.EPSILON.
 * @param ps - A cubic bezier curve
 * @param t1 - The t parameter where the resultant bezier should start
 * @param t2 - The t parameter where the resultant bezier should end
 */
declare function fromToPrecise(ps: number[][]): (t1: number, t2: number) => number[][];
declare function fromToExact(ps: number[][][]): (t1: number, t2: number) => number[][][];
export { fromTo, fromToPrecise, fromToExact };
