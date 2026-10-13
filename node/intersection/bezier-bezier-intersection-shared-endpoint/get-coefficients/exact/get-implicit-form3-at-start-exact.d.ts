/**
 * Returns the *exact* implicit form of the given cubic bezier curve *relative
 * to its start point* (see [[getImplicitForm3AtStartDd]] for details).
 *
 * @param ps a cubic bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @internal
 */
declare function getImplicitForm3AtStartExact(ps: number[][]): {
    vₓₓₓ: number[];
    vₓₓᵧ: number[];
    vₓᵧᵧ: number[];
    vᵧᵧᵧ: number[];
    vₓₓ: number[];
    vₓᵧ: number[];
    vᵧᵧ: number[];
    vₓ: number[];
    vᵧ: number[];
};
export { getImplicitForm3AtStartExact };
