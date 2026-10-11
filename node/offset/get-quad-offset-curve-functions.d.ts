/**
 * Returns the `x` and `y` coordinate functions (of the parameter `t`) of the
 * offset curve (at a distance `D` in the normal direction) of the given
 * quadratic bezier curve.
 *
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,0]]`
 * @param D distance of offset curve (can be negative)
 *
 * @internal
 */
declare function getQuadOffsetCurveFunctions(ps: number[][], D: number): {
    X: (t: number) => number;
    Y: (t: number) => number;
};
export { getQuadOffsetCurveFunctions };
