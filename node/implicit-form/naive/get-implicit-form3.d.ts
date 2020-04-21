/**
 * Returns an approximate implicit form of the given cubic bezier and a
 * coefficientwise error bound.
 * * the error bound needs to be multiplied by γ === nu/(1-nu), where
 * u === Number.EPSILON / 2
 * * the coordinates of the given bezier must be 47-bit aligned
 * * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * * takes about 1.2 micro-seconds on a 1st gen i7 and Chrome 79
 * @param ps
 */
declare function getImplicitForm3(ps: number[][]): {
    coeffs: {
        vₓₓₓ: number;
        vₓₓᵧ: number;
        vₓᵧᵧ: number;
        vᵧᵧᵧ: number;
        vₓₓ: number;
        vₓᵧ: number;
        vᵧᵧ: number;
        vₓ: number;
        vᵧ: number;
        v: number;
    };
    errorBound: {
        vₓₓₓ_: number;
        vₓₓᵧ_: number;
        vₓᵧᵧ_: number;
        vᵧᵧᵧ_: number;
        vₓₓ_: number;
        vₓᵧ_: number;
        vᵧᵧ_: number;
        vₓ_: number;
        vᵧ_: number;
        v_: number;
    };
};
export { getImplicitForm3 };
