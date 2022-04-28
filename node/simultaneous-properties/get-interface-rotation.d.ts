/**
 * Returns the rotation angle (-𝜋 <= θ <= 𝜋 *guaranteed*) from some vector to
 * another vector considering them to both start at the same point.
 *
 * If one of the vectors is the zero vector then `0` is returned.
 *
 * It can also be imagined that the 2nd vector starts where the 1st one ends.
 *
 * Intermediate calculations are done in double precision in a numerically
 * stable manner.
 *
 * @param a the first 2d vector given as `[x,y]` where `x` and `y` are the
 * coordinates, e.g. `[2,3]`
 * @param b the second 2d vector
 */
declare function getInterfaceRotation(a: number[], b: number[]): number;
export { getInterfaceRotation };
