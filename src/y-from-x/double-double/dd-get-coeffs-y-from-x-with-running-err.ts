import { ddAddDd, ddMultDouble2 } from "double-double";
import { ddGetImplicitForm1_WithRunningError } from "../../implicit-form/double-double/get-implicit-form1-dd-with-running-error.js";
import { ddGetImplicitForm2_WithRunningError } from "../../implicit-form/double-double/get-implicit-form2-dd-with-running-error.js";
import { ddGetImplicitForm3_WithRunningError } from "../../implicit-form/double-double/get-implicit-form3-dd-with-running-error.js";

const qmd = ddMultDouble2;
const qaq = ddAddDd;

const { abs } = Math;


/**
 * Returns a polynomial whose roots are the `y` coordinates given the `x`
 * coordinate of the given bezier curve.
 * 
 * @param ps 
 */
function ddGetCoeffsYFromX_WithRunningErr(
        ps: number[][],
        x: number) {

    const _x = abs(x);

    if (ps.length === 2) {
        const {
            coeffs: { vₓ, vᵧ, v },
            errorBound: { v_ }  // vₓ and vᵧ are exact 
        } = ddGetImplicitForm1_WithRunningError(ps);

        const $vₓ = vₓ[1];
        const $v = v[1];

        // p0 = vᵧ
        const p0 = vᵧ;
        const p0_ = 0;  // vᵧ is exact

        // p1 = x*vₓ + v
        const a = qmd(x, vₓ);
        const $a = a[1];
        const a_ = abs(x*$vₓ);  // vₓ is exact (vₓ_ === 0)

        const p1 = qaq(a, v);
        const p1_ = a_ + v_ + abs($a + $v);

        return {
            coeffs: [p0, p1],
            errorBound: [p0_, p1_]
        };
    }

    if (ps.length === 3) {
        const {
            coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
        } = ddGetImplicitForm2_WithRunningError(ps);

        const $vₓₓ = vₓₓ[1];
        const $vₓᵧ = vₓᵧ[1];
        const $vₓ = vₓ[1];
        const $vᵧ = vᵧ[1];
        const $v = v[1];

        // p0 = vᵧᵧ
        const p0 = vᵧᵧ;
        const p0_ = vᵧᵧ_;

        // p1 = vₓᵧ*x + vᵧ
        const a = qmd(x, vₓᵧ);
        const $a = a[1];
        const a_ = _x*vₓᵧ_ + abs(x*$vₓᵧ);

        const p1 = qaq(a, vᵧ);
        const p1_ = a_ + vᵧ_ + abs($a + $vᵧ);

        // p2 = (vₓₓ*x + vₓ)*x + v
        const b = qmd(x, vₓₓ);
        const $b = b[1];
        const b_ = _x*vₓₓ_ + abs(x*$vₓₓ);

        const c = qaq(b, vₓ);
        const $c = c[1];
        const c_ = b_ + vₓ_ + abs($b + $vₓ);

        const d = qmd(x, c);
        const $d = d[1];
        const d_ = _x*c_ + abs(x*$c);

        const p2 = qaq(d, v);
        const p2_ = d_ + v_ + abs($d + $v);

        return {
            coeffs: [p0, p1, p2],
            errorBound: [p0_, p1_, p2_]
        };
    }

    if (ps.length === 4) {
        const {
            coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
        } = ddGetImplicitForm3_WithRunningError(ps);

        const $vₓₓₓ = vₓₓₓ[1];
        const $vₓₓᵧ = vₓₓᵧ[1];
        const $vₓᵧᵧ = vₓᵧᵧ[1];
        const $vₓₓ = vₓₓ[1];
        const $vₓᵧ = vₓᵧ[1];
        const $vᵧᵧ = vᵧᵧ[1];
        const $vₓ = vₓ[1];
        const $vᵧ = vᵧ[1];
        const $v = v[1];

        // p0 = vᵧᵧᵧ
        const p0 = vᵧᵧᵧ;
        const p0_ = vᵧᵧᵧ_;

        // p1 = vₓᵧᵧ*x + vᵧᵧ
        const a = qmd(x, vₓᵧᵧ);
        const $a = a[1];
        const a_ = _x*vₓᵧᵧ_ + abs(x*$vₓᵧᵧ);

        const p1 = qaq(a, vᵧᵧ);
        const p1_ = a_ + vᵧᵧ_ + abs($a + $vᵧᵧ);

        // p2 = (vₓₓᵧ*x + vₓᵧ)*x + vᵧ
        const b = qmd(x, vₓₓᵧ);
        const $b = b[1];
        const b_ = _x*vₓₓᵧ_ + abs(x*$vₓₓᵧ);

        const c = qaq(b, vₓᵧ);
        const $c = c[1];
        const c_ = b_ + vₓᵧ_ + abs($b + $vₓᵧ);

        const d = qmd(x, c);
        const $d = d[1];
        const d_ = _x*c_ + abs(x*$c);

        const p2 = qaq(d, vᵧ);
        const p2_ = d_ + vᵧ_ + abs($d + $vᵧ);

        // p3 = ((vₓₓₓ*x + vₓₓ)*x + vₓ)*x + v
        const e = qmd(x, vₓₓₓ);
        const $e = e[1];
        const e_ = _x*vₓₓₓ_ + abs(x*$vₓₓₓ);

        const f = qaq(e, vₓₓ);
        const $f = f[1];
        const f_ = e_ + vₓₓ_ + abs($e + $vₓₓ);

        const g = qmd(x, f);
        const $g = g[1];
        const g_ = _x*f_ + abs(x*$f);

        const h = qaq(g, vₓ);
        const $h = h[1];
        const h_ = g_ + vₓ_ + abs($g + $vₓ);

        const i = qmd(x, h);
        const $i = i[1];
        const i_ = _x*h_ + abs(x*$h);

        const p3 = qaq(i, v);
        const p3_ = i_ + v_ + abs($i + $v);

        return {
            coeffs: [p0, p1, p2, p3],
            errorBound: [p0_, p1_, p2_, p3_]
        };
    }
}


export { ddGetCoeffsYFromX_WithRunningErr }
