const sqrt = Math.sqrt;


/**
 * TODO
 */
function fromImplicitForm2(
        implicitForm: { 
            vₓₓ: number, 
            vₓᵧ: number, 
            vᵧᵧ: number, 
            vₓ: number, 
            vᵧ: number, 
            v: number }) {

    // TODO - we need to check if the discriminant is zero so we can be sure
    // the implicit form is even possible

    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    
    //const [[a2,a1,a0],[b2,b1,b0]] = getXY2(ps);

    const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = implicitForm;

    //const q1 = a2*b1 - a1*b2;
    //const q2 = a2*b0 - a0*b2;

    // vₓₓ = -b2*b2;
    // vₓᵧ = 2*a2*b2;
    // vᵧᵧ = -a2*a2;
    // vₓ = b1*q1 - 2*b2*q2;
    // vᵧ = 2*a2*q2 - a1*q1;
    // v = q1*(a1*b0 - a0*b1) - q2*q2;

    const b2 = sqrt(-vₓₓ);
    const a2 = vₓᵧ/(2*b2);

    // Apply the change of variables t -> (t - s) so that `a1 === 0`. We must
    // have `s === a1'/2a3'` where `a1'` and `a3'` are the old coefficients.

    //const a1 = 0;  // use one (of 2) degrees of freedom
    //const b1 = 0;  // use the other degree of freedom

    return [[a2,a1,a0],[b2,b1,b0]];
}


export { fromImplicitForm2 }
