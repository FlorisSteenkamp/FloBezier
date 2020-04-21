/**
 * Returns the exact implicit form of the given cubic bezier.
 * Taken from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps
 */
declare function getImplicitForm3Exact(ps: number[][]): {
    vₓₓₓ: number[];
    vₓₓᵧ: number[];
    vₓᵧᵧ: number[];
    vᵧᵧᵧ: number[];
    vₓₓ: number[];
    vₓᵧ: number[];
    vᵧᵧ: number[];
    vₓ: number[];
    vᵧ: number[];
    v: number[];
};
export { getImplicitForm3Exact };
