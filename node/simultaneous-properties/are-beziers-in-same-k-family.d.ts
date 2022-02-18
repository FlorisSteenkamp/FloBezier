/**
 * Returns true if two beziers are in the same K-family, i.e. when their infinte
 * extensions are the same curve (when seen as point sets).
 *
 * * **precondition:** neither given bezier curve may have *all* its control
 * points the same point (i.e. neither bezier curve may effectively be a point)
 * * **precondition:** underflow / overflow
 *
 * @param ps1 A bezier curve
 * @param ps2 Another bezier curve
 *
 * @doc
 */
declare function areBeziersInSameKFamily(ps1: number[][], ps2: number[][]): boolean;
export { areBeziersInSameKFamily };
