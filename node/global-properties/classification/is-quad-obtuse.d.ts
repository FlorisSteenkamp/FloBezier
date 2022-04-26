/**
 * Returns `true` if the given quadratic bezier is obtuse, `false` otherwise (i.e.
 * `false` if acute).
 *
 * Obtuse here is defined as follows: let the quad form a triangle through its
 * control points P0, P1, P2 where P0 and P2 are the endpoints. If both interior
 * angles ∠P0 and ∠P2 are <= 90 degrees then the quad is considered acute,
 * otherwise it is considered obtuse.
 *
 * @doc mdx
 */
declare function isQuadObtuse(ps: number[][]): boolean;
export { isQuadObtuse };
