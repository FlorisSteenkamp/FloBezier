/**
 * Returns true if two beziers are in the same K-family, i.e. when their infinte
 * extensions turn them into the same curve. This algorithm is robust if the
 * preconditions are met.
 *
 * It would not be hard to change the algorithm to relax
 * the preconditions to allow any two bezier curves with double-float coordinates
 * but this would slow it down since its run-time complexity is based on the
 * bit-length of the coordinates.
 *
 * Preconditions:
 * * Bezier control points must be grid-aligned
 * * The max bit-length of each bezier's control points PLUS 3 (due to power
 * basis conversion that can add 3 bits) PLUS 1 (due to testing of t values at
 * 1, 2, 4, 8, ...) must be < 53, therefore the max bitlength === 49.
 *
 * @param ps1 A bezier curve
 * @param ps2 Another bezier curve
 */
declare function areBeziersInSameKFamily(ps1: number[][], ps2: number[][]): boolean;
export { areBeziersInSameKFamily };
