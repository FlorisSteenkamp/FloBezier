/**
 * Returns the exact implicit form of the given quadratic bezier.
 * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps
 */
declare function getImplicitForm2Exact(ps: number[][]): {
    vₓₓ: number[];
    vₓᵧ: number[];
    vᵧᵧ: number[];
    vₓ: number[];
    vᵧ: number[];
    v: number[];
};
export { getImplicitForm2Exact };
