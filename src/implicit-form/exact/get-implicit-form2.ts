
import { getXExact } from '../../to-power-basis/get-x';
import { getYExact } from '../../to-power-basis/get-y';
import { calculateProduct, calculate, expansionProduct } from 'flo-numerical';


/**
 * Returns the exact implicit form of the given quadratic bezier.
 * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps 
 */
function getImplicitForm2Exact(ps: number[][]) {
    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0

    let [a2, a1, a0] = getXExact(ps);
    let [b2, b1, b0] = getYExact(ps);

     
    // b2**2*x**2
    let vₓₓ = expansionProduct(b2,b2);
    // -2*a2*b2*x*y
    let vₓᵧ = calculateProduct([[-2],a2,b2]);
    // a2**2*y**2
    let vᵧᵧ = expansionProduct(a2,a2);
    // -2*a0*b2**2 + a1*b1*b2 + 2*a2*b0*b2 - a2*b1**2
    let vₓ = calculate([
        [[-2],a0,b2,b2], [     a1,b1,b2], 
        [[ 2],a2,b0,b2], [[-1],a2,b1,b1]
    ]);
    // 2*a0*a2*b2 - a1**2*b2 + 
    // a1*a2*b1 - 2*a2**2*b0
    let vᵧ = calculate([
        [[2],a0,a2,b2], [[-1],a1,a1,b2],      
        [    a1,a2,b1], [[-2],a2,a2,b0]
    ]);
    // a0**2*b2**2 - a0*a1*b1*b2 
    // - 2*a0*a2*b0*b2 + a0*a2*b1**2 + 
    // a1**2*b0*b2 - a1*a2*b0*b1 + 
    // a2**2*b0**2
    let v = calculate([ 
        [     a0,a0,b2,b2], [[-1],a0,a1,b1,b2],
        [[-2],a0,a2,b0,b2], [     a0,a2,b1,b1], 
        [     a1,a1,b0,b2], [[-1],a1,a2,b0,b1],
        [     a2,a2,b0,b0],
    ]);


    return { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}


export { getImplicitForm2Exact }
