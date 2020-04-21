/**
 * * precondition: max 47 coefficient bitlength
 * Returns an approximate implicit form of the given cubic bezier and an
 * implicit form coefficientwise error bound of the given cubic bezier.
 * * takes about 155 micro-seconds on a 1st gen i7 and Chrome 79
 * @param coeffsX
 * @param coeffsY
 */
declare function getImplicitForm3Exact_(ps: number[][]): {
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
export { getImplicitForm3Exact_ };
