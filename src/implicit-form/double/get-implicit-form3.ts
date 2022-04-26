import { toPowerBasis3 } from '../../to-power-basis/to-power-basis/double/to-power-basis.js';


/**
 * Returns the implicit form of the given cubic bezier curve.
 * 
 * * returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * * takes about 1.2 micro-seconds on a 3rd gen i7 and Chrome 79
 * 
 * @param ps a cubic bezier curve given as an array of its control points, 
 * e.g. `[[1,2],[3,4],[5,7],[0,0]]`
 * 
 * @doc mdx
 */
function getImplicitForm3(ps: number[][]) {
    // The implicit form is given by:
    // vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0

    const [[a3,a2,a1,a0],[b3,b2,b1,b0]] = toPowerBasis3(ps);

    const a3b1 = a3*b1;
    const a1b3 = a1*b3;
    const a3b2 = a3*b2;
    const a2b3 = a2*b3;
    const a3a3 = a3*a3;
    const b3b3 = b3*b3;

    const q1 = a3*b0 - a0*b3;
    const q2 = a3b1 - a1b3;
    const q3 = a3b2 - a2b3; 
    const q4 = a2*b0 - a0*b2;
    const q5 = a2*b1 - a1*b2;
    const q6 = a1*b0 - a0*b1;
    const tq2 = 2*q2;

    const q1q1 = q1*q1;
    const q1q5 = q1*q5;
    const tq2q4 = tq2*q4;
    const q3q4 = q3*q4;

    const u1 = -3*q1 - q5;

    const vₓₓₓ = -b3*b3b3;
    const vₓₓᵧ =  3*a3*b3b3;
    const vₓᵧᵧ = -3*b3*a3a3;
    const vᵧᵧᵧ =  a3*a3a3;
    const vₓₓ = (u1*b3b3 + q3*(b1*b3 - b2*b2)) + tq2*b2*b3;
    const vᵧᵧ = (u1*a3a3 + q3*(a1*a3 - a2*a2)) + tq2*a2*a3;
    const vₓᵧ = 2*(q3*(a2*b2 - (a1b3 + a3b1)/2) - (u1*a3*b3 + q2*(a2b3 + a3b2)));
    
    const s1 = (-3*q1q1 - 2*q1q5) + (tq2q4 + q3*q6);
    const s2 = 2*(q1*q2 - q3q4);
    const s3 = q1*q3 - q2*q2 + q3*q5;

    const vₓ = b3*s1 + (b2*s2 + b1*s3);
    const vᵧ = -a3*s1 - (a2*s2 + a1*s3);
    const v = (q1*((tq2q4 - q1q1) - q1q5)) + (s3*q6 - q3q4*q4);
        
    return { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}


export { getImplicitForm3 }
