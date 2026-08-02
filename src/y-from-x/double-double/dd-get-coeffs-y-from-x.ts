import { ddAddDd, ddMultDouble2 } from "double-double";
import { getImplicitForm1Dd } from "../../implicit-form/double-double/get-implicit-form1-dd.js";
import { getImplicitForm2Dd } from "../../implicit-form/double-double/get-implicit-form2-dd.js";
import { getImplicitForm3Dd } from "../../implicit-form/double-double/get-implicit-form3-dd.js";

const qmd = ddMultDouble2;
const qaq = ddAddDd;


/**
 * Returns a polynomial whose roots are the `y` coordinates given the `x`
 * coordinate of the given bezier curve.
 * 
 * @param ps 
 */
function ddGetCoeffsYFromX(
        ps: number[][],
        x: number) {

    if (ps.length === 2) {
        const { vₓ, vᵧ, v } = getImplicitForm1Dd(ps);

        const p0 = vᵧ;

        // p1 = x*vₓ + v
        const a = qmd(x, vₓ);
        const p1 = qaq(a, v);

        return [p0, p1];
    }

    if (ps.length === 3) {
        const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = getImplicitForm2Dd(ps);

        const p0 = vᵧᵧ;

        // p1 = vₓᵧ*x + vᵧ
        const a = qmd(x, vₓᵧ);
        const p1 = qaq(a, vᵧ);

        // p2 = (vₓₓ*x + vₓ)*x + v
        const b = qmd(x, vₓₓ);
        const c = qaq(b, vₓ);
        const d = qmd(x, c);
        const p2 = qaq(d, v);

        return [p0, p1, p2];
    }

    if (ps.length === 4) {
        const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } =
            getImplicitForm3Dd(ps);

        const p0 = vᵧᵧᵧ;

        // p1 = vₓᵧᵧ*x + vᵧᵧ
        const a = qmd(x, vₓᵧᵧ);
        const p1 = qaq(a, vᵧᵧ);

        // p2 = (vₓₓᵧ*x + vₓᵧ)*x + vᵧ
        const b = qmd(x, vₓₓᵧ);
        const c = qaq(b, vₓᵧ);
        const d = qmd(x, c);
        const p2 = qaq(d, vᵧ);

        // p3 = ((vₓₓₓ*x + vₓₓ)*x + vₓ)*x + v
        const e = qmd(x, vₓₓₓ);
        const f = qaq(e, vₓₓ);
        const g = qmd(x, f);
        const h = qaq(g, vₓ);
        const i = qmd(x, h);
        const p3 = qaq(i, v);

        return [p0, p1, p2, p3];
    }
}


export { ddGetCoeffsYFromX }
