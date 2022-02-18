import { ImplicitForm3Coeffs } from "../../implicit-form-types.js";


function evaluateImplicit3(
        cs: ImplicitForm3Coeffs<number>,
        x: number,
        y: number): number {

    const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = cs;

    return (
        vₓₓₓ*x*x*x + 
        vₓₓᵧ*x*x*y +
        vₓᵧᵧ*x*y*y +
        vᵧᵧᵧ*y*y*y +
        vₓₓ*x*x + 
        vₓᵧ*x*y + 
        vᵧᵧ*y*y +
        vₓ*x + 
        vᵧ*y + 
        v
    );
}


export { evaluateImplicit3 }
