import { eAdd, eMultDouble2 } from 'big-float-ts';
import { eGetImplicitForm1 } from "../../implicit-form/expansion/e-get-implicit-form1.js";
import { eGetImplicitForm2 } from "../../implicit-form/expansion/e-get-implicit-form2.js";
import { eGetImplicitForm3 } from "../../implicit-form/expansion/e-get-implicit-form3.js";
const emd = eMultDouble2;
const eae = eAdd;
/**
 * Returns a polynomial whose roots are the `y` coordinates given the `x`
 * coordinate of the given bezier curve.
 *
 * * the coefficients are returned *exactly* as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * expansions
 * * if the given curve is degenerate (i.e. its order is really lower than
 * suggested by the number of control points, e.g. a cubic that is really a
 * quadratic) the higher order coefficients of the returned polynomial will
 * simply be zero
 * * if the given curve degenerates to a point the zero polynomial (all
 * coefficients zero) is returned
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param x the `x` coordinate
 */
function eGetCoeffsYFromX(ps, x) {
    if (ps.length === 2) {
        const { vₓ, vᵧ, v } = padImplicitForm1(eGetImplicitForm1(ps));
        const p0 = vᵧ;
        const p1 = eae(emd(x, vₓ), v);
        return [p0, p1];
    }
    if (ps.length === 3) {
        const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = padImplicitForm2(eGetImplicitForm2(ps));
        const p0 = vᵧᵧ;
        const p1 = eae(emd(x, vₓᵧ), vᵧ);
        const p2 = eae(emd(x, eae(emd(x, vₓₓ), vₓ)), v);
        return [p0, p1, p2];
    }
    if (ps.length === 4) {
        const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = padImplicitForm3(eGetImplicitForm3(ps));
        const p0 = vᵧᵧᵧ;
        const p1 = eae(emd(x, vₓᵧᵧ), vᵧᵧ);
        const p2 = eae(emd(x, eae(emd(x, vₓₓᵧ), vₓᵧ)), vᵧ);
        const p3 = eae(emd(x, eae(emd(x, eae(emd(x, vₓₓₓ), vₓₓ)), vₓ)), v);
        return [p0, p1, p2, p3];
    }
    throw new Error('The given bezier curve must be of order 1, 2 or 3.');
}
/**
 * Returns the given exact implicit form with any missing (degenerate)
 * coefficients set to zero so that it has the shape of an order 1 implicit
 * form.
 *
 * @internal
 */
function padImplicitForm1(form) {
    if (form === undefined) {
        // the curve degenerates to a point
        return { vₓ: [0], vᵧ: [0], v: [0] };
    }
    return form;
}
/**
 * Returns the given exact implicit form with any missing (degenerate)
 * coefficients set to zero so that it has the shape of an order 2 implicit
 * form.
 *
 * @internal
 */
function padImplicitForm2(form) {
    const form1 = padImplicitForm1(form);
    if (!('vₓₓ' in form1)) {
        return { vₓₓ: [0], vₓᵧ: [0], vᵧᵧ: [0], ...form1 };
    }
    return form1;
}
/**
 * Returns the given exact implicit form with any missing (degenerate)
 * coefficients set to zero so that it has the shape of an order 3 implicit
 * form.
 *
 * @internal
 */
function padImplicitForm3(form) {
    const form2 = padImplicitForm2(form);
    if (!('vₓₓₓ' in form2)) {
        return { vₓₓₓ: [0], vₓₓᵧ: [0], vₓᵧᵧ: [0], vᵧᵧᵧ: [0], ...form2 };
    }
    return form2;
}
export { eGetCoeffsYFromX };
//# sourceMappingURL=e-get-coeffs-y-from-x.js.map