/**
 * Returns `true` if the given cubic bezier is obtuse, `false` otherwise (i.e.
 * `false` if acute).
 *
 * Obtuse here is defined as follows: let the cubic form triangles through its
 * control points P0, P1, P3 where P0 and P3 are the endpoints. If both interior
 * angles ∠P0 and ∠P2 are <= 90 degrees then the cubic is considered acute,
 * otherwise it is considered obtuse. The same should be true for P0, P2, P3.
 */
declare function isCubicObtuse(ps: number[][]): boolean;
export { isCubicObtuse };
