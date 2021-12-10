/**
 * Returns the *smallest* double (call it `v`) such that:
 * * `v >= _v_ === (tE - tS)/(1 - tS)` AND
 * * such that `eps/2 | v` (where `eps/2 === Number.EPSILON`)
 *
 * * this function is for demonstration and testing purposes and was inlined to
 * save a function call
 *
 * Preconditions:
 *  1. exact `tS`, `tE`
 *  2. `tS, tE ∈ (0,1)`
 *  3. `Number.EPSILON/2 | tS` (and `Number.EPSILON/2 | tE`)
 *  4. `tE > tS`
 *
 * @internal
 */
declare function getV(tS: number, tE: number): number;
export { getV };
