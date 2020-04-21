/**
 * Returns an approximate implicit form of the given quadratic bezier and a
 * coefficientwise error bound.
 * * the error bound needs to be multiplied by γ === nu/(1-nu), where
 * u === Number.EPSILON / 2
 * * the coordinates of the given bezier must be 47-bit aligned
 * * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps
 */
declare function getImplicitForm2(ps: number[][]): {
    coeffs: {
        vₓₓ: number;
        vₓᵧ: number;
        vᵧᵧ: number;
        vₓ: number;
        vᵧ: number;
        v: number;
    };
    errorBound: {
        vₓₓ_: number;
        vₓᵧ_: number;
        vᵧᵧ_: number;
        vₓ_: number;
        vᵧ_: number;
        v_: number;
    };
};
export { getImplicitForm2 };
