/**
 * Returns an arc approximation using the given unit circle bezier curve
 * pieces (each spanning an angle of `step` radians, starting from the x-axis
 * and going anti-clockwise). The result is returned as an array of bezier
 * curves.
 *
 * * see [[generateArcFromCubics]] and [[generateArcFromQuads]]
 *
 * @param circle the unit circle pieces
 * @param step the angle (in radians) spanned by each piece
 * @param c arc circle center
 * @param p1 arc goes from this point
 * @param p2 to a point on a line from c to this point
 *
 * @internal
 */
declare function generateArc(circle: number[][][], step: number, c: number[], p1: number[], p2: number[]): number[][][];
export { generateArc };
