import { eMult, eAdd, eMultDouble2 } from 'big-float-ts';
import { eGetImplicitForm1 } from "../../implicit-form/expansion/e-get-implicit-form1.js";
import { eGetImplicitForm2 } from "../../implicit-form/expansion/e-get-implicit-form2.js";
import { eGetImplicitForm3 } from "../../implicit-form/expansion/e-get-implicit-form3.js";
const emd = eMultDouble2;
const eme = eMult;
const eae = eAdd;
/**
 * Returns a polynomial whose roots are the `y` coordinates given the `x`
 * coordinate of the given bezier curve.
 *
 * @param ps
 */
function eGetCoeffsYFromX(ps, x) {
    if (ps.length === 2) {
        const { vₓ, vᵧ, v } = eGetImplicitForm1(ps);
        const p0 = vᵧ;
        const p1 = eae(emd(x, vₓ), v);
        return [p0, p1];
    }
    if (ps.length === 3) {
        const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = eGetImplicitForm2(ps);
        const p0 = vᵧᵧ;
        const p1 = eae(emd(x, vₓᵧ), vᵧ);
        const p2 = eae(emd(x, eae(emd(x, vₓₓ), vₓ)), v);
        return [p0, p1, p2];
    }
    if (ps.length === 4) {
        const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = eGetImplicitForm3(ps);
        const p0 = vᵧᵧᵧ;
        const p1 = eae(emd(x, vₓᵧᵧ), vᵧᵧ);
        const p2 = eae(emd(x, eae(emd(x, vₓₓᵧ), vₓᵧ)), vᵧ);
        const p3 = eae(emd(x, eae(emd(x, eae(emd(x, vₓₓₓ), vₓₓ)), vₓ)), v);
        return [p0, p1, p2, p3];
    }
}
export { eGetCoeffsYFromX };
//# sourceMappingURL=get-coeffs-y-from-x.js.map