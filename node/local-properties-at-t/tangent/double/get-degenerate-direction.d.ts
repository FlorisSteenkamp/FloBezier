/**
 * Returns the direction the given curve leaves the point at `t` in (or arrives
 * in if `t === 1`) given that the tangent vanishes at `t`; returns `[0,0]` if
 * all control points coincide.
 *
 * * uses double precision calculations internally
 *
 * @param ps a quadratic or cubic bezier curve given by its ordered control
 * points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the tangent vanishes
 *
 * @internal
 */
declare function getDegenerateDirection(ps: number[][], t: number): number[];
/** @internal */
declare function pointsCoincide(p: number[], q: number[]): boolean;
export { getDegenerateDirection, pointsCoincide };
