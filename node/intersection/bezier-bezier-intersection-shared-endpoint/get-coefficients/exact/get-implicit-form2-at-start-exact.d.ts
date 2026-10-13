/**
 * Returns the *exact* implicit form of the given quadratic bezier curve
 * *relative to its start point* (see [[getImplicitForm2AtStartDd]] for
 * details).
 *
 * @param ps a quadratic bezier curve, e.g. `[[0,0],[1,1],[2,1]]`
 *
 * @internal
 */
declare function getImplicitForm2AtStartExact(ps: number[][]): {
    vₓₓ: number[];
    vₓᵧ: number[];
    vᵧᵧ: number[];
    vₓ: number[];
    vᵧ: number[];
};
export { getImplicitForm2AtStartExact };
