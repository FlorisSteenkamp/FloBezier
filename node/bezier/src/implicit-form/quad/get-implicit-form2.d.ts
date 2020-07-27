/**
 * Returns an approximate (quad precision) implicit form of the given quadratic
 * bezier and a coefficientwise error bound.
 * * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * * precondition: the input coefficients must be 47-bit-aligned
 * @param ps
 */
declare function getImplicitForm2Quad(ps: number[][]): {
    coeffs: {
        vₓₓ: number[];
        vₓᵧ: number[];
        vᵧᵧ: number[];
        vₓ: number[];
        vᵧ: number[];
        v: number[];
    };
    errorBound: {
        vₓ_: number;
        vᵧ_: number;
        v_: number;
    };
};
export { getImplicitForm2Quad };
