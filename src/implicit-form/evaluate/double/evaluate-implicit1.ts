import { ImplicitForm1Coeffs } from "../../implicit-form-types.js";


function evaluateImplicit1(
        cs: ImplicitForm1Coeffs<number>,
        x: number,
        y: number): number {

    const { vₓ, vᵧ, v } = cs;

    return vₓ*x + vᵧ*y + v;
}


export { evaluateImplicit1 }
