import { getImplicitForm1 } from "../../implicit-form/double/get-implicit-form1.js";
import { getImplicitForm2 } from "../../implicit-form/double/get-implicit-form2.js";
import { getImplicitForm3 } from "../../implicit-form/double/get-implicit-form3.js";
/**
 * Returns a polynomial whose roots are the `y` coordinates given the `x`
 * coordinate of the given bezier curve.
 *
 * @param ps
 */
function getCoeffsYFromX(ps, x) {
    if (ps.length === 2) {
        const { vₓ, vᵧ, v } = getImplicitForm1(ps);
        const p0 = vᵧ;
        const p1 = x * vₓ + v;
        return [p0, p1];
    }
    if (ps.length === 3) {
        const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = getImplicitForm2(ps);
        const p0 = vᵧᵧ;
        const p1 = vₓᵧ * x + vᵧ;
        const p2 = (vₓₓ * x + vₓ) * x + v;
        return [p0, p1, p2];
    }
    if (ps.length === 4) {
        const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = getImplicitForm3(ps);
        const p0 = vᵧᵧᵧ;
        const p1 = vₓᵧᵧ * x + vᵧᵧ;
        const p2 = (vₓₓᵧ * x + vₓᵧ) * x + vᵧ;
        const p3 = ((vₓₓₓ * x + vₓₓ) * x + vₓ) * x + v;
        return [p0, p1, p2, p3];
    }
}
export { getCoeffsYFromX };
//# sourceMappingURL=get-coeffs-y-from-x.js.map