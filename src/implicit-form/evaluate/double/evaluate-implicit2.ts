import { ImplicitForm2Coeffs } from "../../implicit-form-types.js";


/**
 * Evaluates and returns the result of evaluating the given implicit function
 * (a degree 2 bivariate polynomial in `x` and `y`) at the point `[x,y]`.
 * 
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v`, where the `vₓ`, `vₓ`, `v`,
 * etc are constants
 * 
 * @example
 * ```typescript
 * evaluateImplicit2({ vₓₓ: 4, vₓᵧ: 5, vᵧᵧ: 6, vₓ: 1, vᵧ: 2, v: 3 }, 1, 1);  //=> 21
 * ```
 * 
 * @param cs the polynomial to evaluate
 * @param x the `x` variable at which to evaluate
 * @param y the `y` variable at which to evaluate
 * 
 * @doc
 */
function evaluateImplicit2(
        cs: { 
            vₓₓ: number; vₓᵧ: number; vᵧᵧ: number;
            vₓ: number; vᵧ: number; v: number;
        },
        x: number,
        y: number): number {

    const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = cs;

    return vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;
}


export { evaluateImplicit2 }
