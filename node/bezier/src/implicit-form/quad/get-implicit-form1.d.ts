/**
 * Returns the quad precision implicit form of the given linear bezier.
 * * precondition: the input coefficients must be 48-bit-aligned
 * * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps
 */
declare function getImplicitForm1Quad(ps: number[][]): {
    coeffs: {
        vₓ: number;
        vᵧ: number;
        v: number[];
    };
    errorBound: {};
};
export { getImplicitForm1Quad };
