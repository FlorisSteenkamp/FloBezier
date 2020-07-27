/**
 * Returns the implicit form of the given linear bezier and a coefficientwise
 * error bound.
 *
 * * the error bound returned needs first be multiplied by γ === nu/(1-nu),
 * where u === Number.EPSILON / 2 before use
 * * Adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 */
declare function getImplicitForm1(ps: number[][]): {
    coeffs: {
        vₓ: number;
        vᵧ: number;
        v: number;
    };
    errorBound: {
        v_: number;
    };
};
export { getImplicitForm1 };
