import { ImplicitForm2Coeffs } from "../../implicit-form-types.js";


function evaluateImplicit2(
        cs: ImplicitForm2Coeffs<number>,
        x: number,
        y: number): number {

    const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = cs;

    return vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;
}


export { evaluateImplicit2 }
