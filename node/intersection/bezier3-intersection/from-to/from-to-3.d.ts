/**
 * Returns a bezier curve that starts and ends at the given t parameters
 * including an error bound (that needs to be multiplied by `11u`, where
 * `u === Number.EPSILON/2`).
 *
 * * precondition 1: exact tS, tE, ps
 * * precondition 2: tS, tE ∈ [0,1]
 * * precondition 3: `Number.EPSILON | tS` and `Number.EPSILON | tE`
 * * precondition 4: tE > tS
 *
 * @param ps a cubic bezier curve
 * @param tS the t parameter where the resultant bezier should start
 * @param tE the t parameter where the resultant bezier should end
 */
declare function fromTo3(ps: number[][], tS: number, tE: number): {
    ps: number[][];
    _ps: number[][];
};
export { fromTo3 };
