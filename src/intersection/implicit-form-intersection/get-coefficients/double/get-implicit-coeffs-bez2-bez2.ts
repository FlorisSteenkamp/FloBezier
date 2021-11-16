import type { ImplicitForm2Coeffs } from '../../../../implicit-form/implicit-form-types.js';


function getImplicitCoeffsBez2Bez2(
    implicitForm1: ImplicitForm2Coeffs<number>,
    implicitForm2: ImplicitForm2Coeffs<number>) {

    const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = implicitForm1;
    const { vₓₓ: wₓₓ, vₓᵧ: wₓᵧ, vᵧᵧ: wᵧᵧ, vₓ: wₓ, vᵧ: wᵧ, v: w } = implicitForm2;


    // Find roots of: x4*x**4 + x3*x**3 + x2*x**2 + x1*x + x0
    const x4 =
        vₓₓ**2*wᵧᵧ**2 + -vₓₓ*vₓᵧ*wₓᵧ*wᵧᵧ + -2*vₓₓ*vᵧᵧ*wₓₓ*wᵧᵧ + vₓₓ*vᵧᵧ*wₓᵧ**2 + 
        vₓᵧ**2*wₓₓ*wᵧᵧ + -vₓᵧ*vᵧᵧ*wₓₓ*wₓᵧ + vᵧᵧ**2*wₓₓ**2;
        
    const x3 =
        2*vₓ*vₓₓ*wᵧᵧ**2 + -vₓ*vₓᵧ*wₓᵧ*wᵧᵧ + -2*vₓ*vᵧᵧ*wₓₓ*wᵧᵧ + vₓ*vᵧᵧ*wₓᵧ**2 + 
        -vₓₓ*vₓᵧ*wᵧ*wᵧᵧ + -vₓₓ*vᵧ*wₓᵧ*wᵧᵧ + -2*vₓₓ*vᵧᵧ*wₓ*wᵧᵧ + 
        2*vₓₓ*vᵧᵧ*wₓᵧ*wᵧ + vₓᵧ**2*wₓ*wᵧᵧ + 2*vₓᵧ*vᵧ*wₓₓ*wᵧᵧ + 
        -vₓᵧ*vᵧᵧ*wₓ*wₓᵧ + -vₓᵧ*vᵧᵧ*wₓₓ*wᵧ + -vᵧ*vᵧᵧ*wₓₓ*wₓᵧ + 
        2*vᵧᵧ**2*wₓ*wₓₓ;
            
    const x2 =
        2*v*vₓₓ*wᵧᵧ**2 + -v*vₓᵧ*wₓᵧ*wᵧᵧ + 
        -2*v*vᵧᵧ*wₓₓ*wᵧᵧ + v*vᵧᵧ*wₓᵧ**2 + vₓ**2*wᵧᵧ**2 + -vₓ*vₓᵧ*wᵧ*wᵧᵧ + 
        -vₓ*vᵧ*wₓᵧ*wᵧᵧ + -2*vₓ*vᵧᵧ*wₓ*wᵧᵧ + 2*vₓ*vᵧᵧ*wₓᵧ*wᵧ + 
        -vₓₓ*vᵧ*wᵧ*wᵧᵧ + -2*vₓₓ*vᵧᵧ*w*wᵧᵧ + vₓₓ*vᵧᵧ*wᵧ**2 + vₓᵧ**2*w*wᵧᵧ + 
        2*vₓᵧ*vᵧ*wₓ*wᵧᵧ + -vₓᵧ*vᵧᵧ*w*wₓᵧ + -vₓᵧ*vᵧᵧ*wₓ*wᵧ + vᵧ**2*wₓₓ*wᵧᵧ + 
        -vᵧ*vᵧᵧ*wₓ*wₓᵧ + -vᵧ*vᵧᵧ*wₓₓ*wᵧ + 2*vᵧᵧ**2*w*wₓₓ + vᵧᵧ**2*wₓ**2;
        
        
    // 2*v*vₓ*wᵧᵧ**2 + -v*vₓᵧ*wᵧ*wᵧᵧ + -v*vᵧ*wₓᵧ*wᵧᵧ + -2*v*vᵧᵧ*wₓ*wᵧᵧ + 
    // 2*v*vᵧᵧ*wₓᵧ*wᵧ + -vₓ*vᵧ*wᵧ*wᵧᵧ + -2*vₓ*vᵧᵧ*w*wᵧᵧ + vₓ*vᵧᵧ*wᵧ**2 + 
    // 2*vₓᵧ*vᵧ*w*wᵧᵧ + -vₓᵧ*vᵧᵧ*w*wᵧ + vᵧ**2*wₓ*wᵧᵧ + -vᵧ*vᵧᵧ*w*wₓᵧ + 
    // -vᵧ*vᵧᵧ*wₓ*wᵧ + 2*vᵧᵧ**2*w*wₓ;
    const x1 = 
        v*(2*vₓ*wᵧᵧ**2 - vₓᵧ*wᵧ*wᵧᵧ - vᵧ*wₓᵧ*wᵧᵧ - 2*vᵧᵧ*wₓ*wᵧᵧ + 2*vᵧᵧ*wₓᵧ*wᵧ) + 
        w*(-2*vₓ*vᵧᵧ*wᵧᵧ + 2*vₓᵧ*vᵧ*wᵧᵧ + -vₓᵧ*vᵧᵧ*wᵧ + -vᵧ*vᵧᵧ*wₓᵧ + 2*vᵧᵧ**2*wₓ) +
        -vₓ*vᵧ*wᵧ*wᵧᵧ + 
        vₓ*vᵧᵧ*wᵧ**2 + 
        vᵧ**2*wₓ*wᵧᵧ + 
        -vᵧ*vᵧᵧ*wₓ*wᵧ;
        
            

    // v**2*wᵧᵧ**2 + -v*vᵧ*wᵧ*wᵧᵧ + 
    // -2*v*vᵧᵧ*w*wᵧᵧ + v*vᵧᵧ*wᵧ**2 + vᵧ**2*w*wᵧᵧ + 
    // -vᵧ*vᵧᵧ*w*wᵧ + vᵧᵧ**2*w**2;
    const x0 =
        v*(wᵧᵧ*(v*wᵧᵧ - vᵧ*wᵧ + -2*vᵧᵧ*w) + vᵧᵧ*wᵧ*wᵧ) + 
        w*(vᵧ**2*wᵧᵧ - vᵧ*vᵧᵧ*wᵧ + vᵧᵧ**2*w);


    // Find roots of: y4*y**4 + y3*y**3 + y2*y**2 + y1*y + y0
    const y4 = 
        vₓₓ**2*wᵧᵧ**2 + -vₓₓ*vₓᵧ*wₓᵧ*wᵧᵧ + -2*vₓₓ*vᵧᵧ*wₓₓ*wᵧᵧ + vₓₓ*vᵧᵧ*wₓᵧ**2 + 
        vₓᵧ**2*wₓₓ*wᵧᵧ + -vₓᵧ*vᵧᵧ*wₓₓ*wₓᵧ + vᵧᵧ**2*wₓₓ**2;

    const y3 = 
        -vₓ*vₓₓ*wₓᵧ*wᵧᵧ + 2*vₓ*vₓᵧ*wₓₓ*wᵧᵧ + -vₓ*vᵧᵧ*wₓₓ*wₓᵧ + 2*vₓₓ**2*wᵧ*wᵧᵧ + 
        -vₓₓ*vₓᵧ*wₓ*wᵧᵧ + -vₓₓ*vₓᵧ*wₓᵧ*wᵧ + -2*vₓₓ*vᵧ*wₓₓ*wᵧᵧ + vₓₓ*vᵧ*wₓᵧ**2 + 
        2*vₓₓ*vᵧᵧ*wₓ*wₓᵧ + -2*vₓₓ*vᵧᵧ*wₓₓ*wᵧ + vₓᵧ**2*wₓₓ*wᵧ + -vₓᵧ*vᵧ*wₓₓ*wₓᵧ + 
        -vₓᵧ*vᵧᵧ*wₓ*wₓₓ + 2*vᵧ*vᵧᵧ*wₓₓ**2;

    const y2 = 
        -2*v*vₓₓ*wₓₓ*wᵧᵧ + v*vₓₓ*wₓᵧ**2 + -v*vₓᵧ*wₓₓ*wₓᵧ + 2*v*vᵧᵧ*wₓₓ**2 + 
        vₓ**2*wₓₓ*wᵧᵧ + -vₓ*vₓₓ*wₓ*wᵧᵧ + -vₓ*vₓₓ*wₓᵧ*wᵧ + 2*vₓ*vₓᵧ*wₓₓ*wᵧ + 
        -vₓ*vᵧ*wₓₓ*wₓᵧ + -vₓ*vᵧᵧ*wₓ*wₓₓ + 2*vₓₓ**2*w*wᵧᵧ + vₓₓ**2*wᵧ**2 + 
        -vₓₓ*vₓᵧ*w*wₓᵧ + -vₓₓ*vₓᵧ*wₓ*wᵧ + 2*vₓₓ*vᵧ*wₓ*wₓᵧ + 
        -2*vₓₓ*vᵧ*wₓₓ*wᵧ + -2*vₓₓ*vᵧᵧ*w*wₓₓ + vₓₓ*vᵧᵧ*wₓ**2 + 
        vₓᵧ**2*w*wₓₓ + -vₓᵧ*vᵧ*wₓ*wₓₓ + vᵧ**2*wₓₓ**2;

    const y1 = 
        -v*vₓ*wₓₓ*wₓᵧ + 2*v*vₓₓ*wₓ*wₓᵧ + -2*v*vₓₓ*wₓₓ*wᵧ + 
        -v*vₓᵧ*wₓ*wₓₓ + 2*v*vᵧ*wₓₓ**2 + vₓ**2*wₓₓ*wᵧ + 
        -vₓ*vₓₓ*w*wₓᵧ + -vₓ*vₓₓ*wₓ*wᵧ + 2*vₓ*vₓᵧ*w*wₓₓ + 
        -vₓ*vᵧ*wₓ*wₓₓ + 2*vₓₓ**2*w*wᵧ + -vₓₓ*vₓᵧ*w*wₓ + 
        -2*vₓₓ*vᵧ*w*wₓₓ + vₓₓ*vᵧ*wₓ**2;

    const y0 = 
        v**2*wₓₓ**2 + -v*vₓ*wₓ*wₓₓ + -2*v*vₓₓ*w*wₓₓ + vₓ**2*w*wₓₓ + 
        v*vₓₓ*wₓ**2 + -vₓ*vₓₓ*w*wₓ + vₓₓ**2*w**2;

    return [
        [x4,x3,x2,x1,x0],
        [y4,y3,y2,y1,y0]
    ];
}


export { getImplicitCoeffsBez2Bez2 }
