import type { ImplicitForm1Coeffs } from '../../../../implicit-form/implicit-form-types.js';


function getImplicitCoeffsBez1Bez1(
    implicitForm1: ImplicitForm1Coeffs<number>,
    implicitForm2: ImplicitForm1Coeffs<number>) {

    const { vₓ, vᵧ, v } = implicitForm1;
    const { vₓ: wₓ, vᵧ: wᵧ, v: w } = implicitForm2;

    const x1 = -vₓ*wᵧ + vᵧ*wₓ;
    const x0 = -v*wᵧ + vᵧ*w;
    const y1 = vₓ*wᵧ - vᵧ*wₓ;
    const y0 = -v*wₓ + vₓ*w;

    return [
        [x1,x0],
        [y1,y0]
    ];
}


export { getImplicitCoeffsBez1Bez1 }
