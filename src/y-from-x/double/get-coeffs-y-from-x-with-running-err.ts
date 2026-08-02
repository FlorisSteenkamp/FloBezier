import { getImplicitForm1WithRunningError } from "../../implicit-form/double/get-implicit-form1-with-running-error.js";
import { getImplicitForm2WithRunningError } from "../../implicit-form/double/get-implicit-form2-with-running-error.js";
import { getImplicitForm3WithRunningError } from "../../implicit-form/double/get-implicit-form3-with-running-error.js";

const { abs } = Math;


/**
 * Returns a polynomial whose roots are the `y` coordinates given the `x`
 * coordinate of the given bezier curve.
 * 
 * @param ps 
 */
function getCoeffsYFromX_WithRunningErr(
        ps: number[][],
        x: number) {

    const _x = abs(x);

    if (ps.length === 2) {
        const {
            coeffs: { vₓ, vᵧ, v },
            errorBound: { vₓ_, vᵧ_, v_ }
        } = getImplicitForm1WithRunningError(ps);

        // p0 = vᵧ
        const p0 = vᵧ;
        const p0_ = vᵧ_;

        // p1 = x*vₓ + v
        const a = x*vₓ;
        const _a = abs(a);
        const a_ = _x*vₓ_ + _a;
        const p1 = a + v;
        const p1_ = a_ + v_ + abs(p1);

        return {
            coeffs: [p0, p1],
            errorBound: [p0_, p1_]
        };
    }

    if (ps.length === 3) {
        const {
            coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
        } = getImplicitForm2WithRunningError(ps);

        // p0 = vᵧᵧ
        const p0 = vᵧᵧ;
        const p0_ = vᵧᵧ_;

        // p1 = vₓᵧ*x + vᵧ
        const a = vₓᵧ*x;
        const _a = abs(a);
        const a_ = _x*vₓᵧ_ + _a;

        const p1 = a + vᵧ;
        const p1_ = a_ + vᵧ_ + abs(p1);

        // p2 = vₓₓ*x*x + vₓ*x + v
        const b = vₓₓ*x;
        const _b = abs(b);
        const b_ = _x*vₓₓ_ + _b;

        const c = b*x;
        const _c = abs(c);
        const c_ = _x*b_ + _c;

        const d = vₓ*x;
        const _d = abs(d);
        const d_ = _x*vₓ_ + _d;

        const e = c + d;
        const e_ = c_ + d_ + abs(e);

        const p2 = e + v;
        const p2_ = e_ + v_ + abs(p2);

        return {
            coeffs: [p0, p1, p2],
            errorBound: [p0_, p1_, p2_]
        };
    }

    if (ps.length === 4) {
        const {
            coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
        } = getImplicitForm3WithRunningError(ps);

        // p0 = vᵧᵧᵧ
        const p0 = vᵧᵧᵧ;
        const p0_ = vᵧᵧᵧ_;

        // p1 = vₓᵧᵧ*x + vᵧᵧ
        const a = vₓᵧᵧ*x;
        const _a = abs(a);
        const a_ = _x*vₓᵧᵧ_ + _a;

        const p1 = a + vᵧᵧ;
        const p1_ = a_ + vᵧᵧ_ + abs(p1);

        // p2 = x*(vₓₓᵧ*x + vₓᵧ) + vᵧ
        const b = vₓₓᵧ*x;
        const _b = abs(b);
        const b_ = _x*vₓₓᵧ_ + _b;

        const c = b + vₓᵧ;
        const c_ = b_ + vₓᵧ_ + abs(c);

        const d = x*c;
        const _d = abs(d);
        const d_ = _x*c_ + _d;

        const p2 = d + vᵧ;
        const p2_ = d_ + vᵧ_ + abs(p2);

        // p3 = x*(x*(vₓₓₓ*x + vₓₓ) + vₓ) + v
        const e = vₓₓₓ*x;
        const _e = abs(e);
        const e_ = _x*vₓₓₓ_ + _e;

        const f = e + vₓₓ;
        const f_ = e_ + vₓₓ_ + abs(f);

        const g = x*f;
        const _g = abs(g);
        const g_ = _x*f_ + _g;

        const h = g + vₓ;
        const h_ = g_ + vₓ_ + abs(h);

        const i = x*h;
        const _i = abs(i);
        const i_ = _x*h_ + _i;

        const p3 = i + v;
        const p3_ = i_ + v_ + abs(p3);

        return {
            coeffs: [p0, p1, p2, p3],
            errorBound: [p0_, p1_, p2_, p3_]
        };
    }
}


export { getCoeffsYFromX_WithRunningErr }
