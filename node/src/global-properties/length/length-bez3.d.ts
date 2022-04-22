/**
 * Returns the curve length in the specified interval.
 *
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval the paramter interval over which the length is to be
 * calculated (often === [0,1]).
 *
 * @internal
 */
declare function lengthBez3(interval: number[], ps: number[][], maxCurviness?: number, gaussOrder?: 4 | 16 | 64): number;
export { lengthBez3 };
