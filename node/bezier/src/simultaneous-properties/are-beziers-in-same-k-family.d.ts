/**
 * * TODO - bitlength calculation below is wrong due to evaluation.
 *
 * Returns true if two beziers are in the same K-family, i.e. when their infinte
 * extensions turn them into the same curve. This algorithm is robust if the
 * preconditions are met.
 * * probably better to use the bezierBezierIntersection function and see if it
 * returns undefined which is the case iff the two beziers are in the same
 * k-family.
 * * **Precondition**: bezier control points must be grid-aligned
 * * **Precondition**: max bit-length of each bezier's control points PLUS 4
 * (due to power basis conversion that can add 4 bits) PLUS 1 (due to testing of
 * t values at 1, 2, 4, 8, ...) must be < 53, therefore the max bitlength === 48.
 *
 * @param ps1 A bezier curve
 * @param ps2 Another bezier curve
 */
declare function areBeziersInSameKFamily(ps1: number[][], ps2: number[][]): boolean;
export { areBeziersInSameKFamily };
