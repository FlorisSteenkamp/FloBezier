/**
 * Returns the resulting bezier curve when rounding each control point
 * coordinate (given as Shewchuk expansions) of the given bezier to double
 * precision.
 *
 * @param ps
 */
declare function toEstimation(ps: number[][][]): number[][];
export { toEstimation };
