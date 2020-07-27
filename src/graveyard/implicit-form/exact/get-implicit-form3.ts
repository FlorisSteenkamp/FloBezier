
import { getXExact } from '../../../to-power-basis/get-x';
import { getYExact } from '../../../to-power-basis/get-y';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { eProduct, eNegativeOf, eCalculate } = bigFloatOperators;


/**
 * Returns the exact implicit form of the given cubic bezier.
 * Taken from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps 
 */
function getImplicitForm3Exact(ps: number[][]) {
    // The implicit form is given by:
    // vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0

    let [a3, a2, a1, a0] = getXExact(ps);
    let [b3, b2, b1, b0] = getYExact(ps);

    // let vₓₓₓ = b3*b3*b3;
    let vₓₓₓ = eProduct([b3,b3,b3]);
    // let vₓₓᵧ = -3*a3*b3*b3;
    let vₓₓᵧ = eProduct([[-3],a3,b3,b3]);
    // let vₓᵧᵧ = 3*b3*a3*a3;
    let vₓᵧᵧ = eProduct([[3],b3,a3,a3]);
    // let vᵧᵧᵧ = -a3*a3*a3;
    let vᵧᵧᵧ = eNegativeOf(eProduct([a3,a3,a3]));

    // let vₓₓ = -3*a3*b1*b2*b3 + a1*b2*b3*b3 - a2*b3*b2*b2 + 2*a2*b1*b3*b3 + 
    //           3*a3*b0*b3*b3 + a3*b2*b2*b2 - 3*a0*b3*b3*b3;
    let vₓₓ = eCalculate([
        [[-3],a3,b1,b2,b3], [a1,b2,b3,b3],     [[-1],a2,b3,b2,b2], 
        [[2],a2,b1,b3,b3],  [[3],a3,b0,b3,b3], [a3,b2,b2,b2], 
        [[-3],a0,b3,b3,b3]
    ]);
    
    // let vₓᵧ = a1*a3*b2*b3 - a2*a3*b1*b3 - 6*b0*b3*a3*a3 - 3*a1*a2*b3*b3 - 
    //           2*a2*a3*b2*b2 + 2*b2*b3*a2*a2 + 3*b1*b2*a3*a3 + 6*a0*a3*b3*b3;
    let vₓᵧ = eCalculate([
        [a1,a3,b2,b3],      [[-1],a2,a3,b1,b3], [[-6],b0,b3,a3,a3], 
        [[-3],a1,a2,b3,b3], [[-2],a2,a3,b2,b2], [[2],b2,b3,a2,a2],
        [[3],b1,b2,a3,a3],  [[6],a0,a3,b3,b3]
    ]);

    // let vᵧᵧ = 3*a1*a2*a3*b3 + a3*b2*a2*a2 - a2*b1*a3*a3 - 3*a0*b3*a3*a3 - 
    //           2*a1*b2*a3*a3 - b3*a2*a2*a2 + 3*b0*a3*a3*a3;
    let vᵧᵧ = eCalculate([
        [[3],a1,a2,a3,b3],  [a3,b2,a2,a2],      [[-1],a2,b1,a3,a3], 
        [[-3],a0,b3,a3,a3], [[-2],a1,b2,a3,a3], [[-1],b3,a2,a2,a2],
        [[3],b0,a3,a3,a3]
    ]);

    // let vₓ = a2*a3*b0*b1*b3 - a1*a2*b1*b2*b3 - a1*a3*b0*b2*b3 + 
    //          6*a0*a3*b1*b2*b3 + b1*a1*a1*b3*b3 + b3*a2*a2*b1*b1 + 
    //          3*b3*a3*a3*b0*b0 + a1*a3*b1*b2*b2 - a2*a3*b2*b1*b1 - 
    //          6*a0*a3*b0*b3*b3 - 4*a0*a2*b1*b3*b3 - 3*b0*b1*b2*a3*a3 -
    //          2*a0*a1*b2*b3*b3 - 2*a1*a3*b3*b1*b1 - 2*b0*b2*b3*a2*a2 + 
    //          2*a0*a2*b3*b2*b2 + 2*a2*a3*b0*b2*b2 + 3*a1*a2*b0*b3*b3 + 
    //          a3*a3*b1*b1*b1 + 3*a0*a0*b3*b3*b3 - 2*a0*a3*b2*b2*b2;
    let vₓ = eCalculate([
        [a2,a3,b0,b1,b3],      [[-1],a1,a2,b1,b2,b3], [[-1],a1,a3,b0,b2,b3],
        [[6],a0,a3,b1,b2,b3],  [b1,a1,a1,b3,b3],      [b3,a2,a2,b1,b1],
        [[3],b3,a3,a3,b0,b0],  [a1,a3,b1,b2,b2],      [[-1],a2,a3,b2,b1,b1],
        [[-6],a0,a3,b0,b3,b3], [[-4],a0,a2,b1,b3,b3], [[-3],b0,b1,b2,a3,a3],
        [[-2],a0,a1,b2,b3,b3], [[-2],a1,a3,b3,b1,b1], [[-2],b0,b2,b3,a2,a2],
        [[2],a0,a2,b3,b2,b2],  [[2],a2,a3,b0,b2,b2],  [[3],a1,a2,b0,b3,b3],
        [a3,a3,b1,b1,b1],      [[3],a0,a0,b3,b3,b3],  [[-2],a0,a3,b2,b2,b2]
    ]);

    // let vᵧ = a0*a2*a3*b1*b3 + a1*a2*a3*b1*b2 - a0*a1*a3*b2*b3 - 
    //          6*a1*a2*a3*b0*b3 - a1*a1*a1*b3*b3 - 3*a3*a3*a3*b0*b0 - 
    //          a1*a3*a3*b1*b1 - a3*a1*a1*b2*b2 - 3*a3*a0*a0*b3*b3 + 
    //          a2*b2*b3*a1*a1 - a1*b1*b3*a2*a2 - 3*a0*b1*b2*a3*a3 - 
    //          2*a0*b2*b3*a2*a2 - 2*a3*b0*b2*a2*a2 + 2*a0*a2*a3*b2*b2 + 
    //          2*a2*b0*b1*a3*a3 + 2*a3*b1*b3*a1*a1 + 3*a0*a1*a2*b3*b3 + 
    //          4*a1*b0*b2*a3*a3 + 6*a0*b0*b3*a3*a3 + 2*b0*b3*a2*a2*a2;
    let vᵧ = eCalculate([
        [a0,a2,a3,b1,b3],      [a1,a2,a3,b1,b2],      [[-1],a0,a1,a3,b2,b3],
        [[-6],a1,a2,a3,b0,b3], [[-1],a1,a1,a1,b3,b3], [[-3],a3,a3,a3,b0,b0],
        [[-1],a1,a3,a3,b1,b1], [[-1],a3,a1,a1,b2,b2], [[-3],a3,a0,a0,b3,b3],
        [a2,b2,b3,a1,a1],      [[-1],a1,b1,b3,a2,a2], [[-3],a0,b1,b2,a3,a3],
        [[-2],a0,b2,b3,a2,a2], [[-2],a3,b0,b2,a2,a2], [[2],a0,a2,a3,b2,b2],
        [[2],a2,b0,b1,a3,a3],  [[2],a3,b1,b3,a1,a1],  [[3],a0,a1,a2,b3,b3],
        [[4],a1,b0,b2,a3,a3],  [[6],a0,b0,b3,a3,a3],  [[2],b0,b3,a2,a2,a2]
    ]);


    // let v = a0*a1*a2*b1*b2*b3 + a0*a1*a3*b0*b2*b3 - a0*a2*a3*b0*b1*b3 - 
    //          a1*a2*a3*b0*b1*b2 + b0*a1*a1*a1*b3*b3 - b3*a2*a2*a2*b0*b0 + 
    //          a1*b0*a3*a3*b1*b1 + a1*b2*a0*a0*b3*b3 + a3*b0*a1*a1*b2*b2 + 
    //          a3*b2*a2*a2*b0*b0 - a0*b1*a1*a1*b3*b3 - a0*b3*a2*a2*b1*b1 - 
    //          a2*b1*a3*a3*b0*b0 - a2*b3*a0*a0*b2*b2 - 3*a0*b3*a3*a3*b0*b0 - 
    //          2*a1*b2*a3*a3*b0*b0 + 2*a2*b1*a0*a0*b3*b3 + 3*a3*b0*a0*a0*b3*b3 + 
    //          a0*a2*a3*b2*b1*b1 + a1*b0*b1*b3*a2*a2 - a0*a1*a3*b1*b2*b2 - 
    //          a2*b0*b2*b3*a1*a1 - 3*a0*a1*a2*b0*b3*b3 - 3*a3*b1*b2*b3*a0*a0 - 
    //          2*a0*a2*a3*b0*b2*b2 - 2*a3*b0*b1*b3*a1*a1 + 2*a0*a1*a3*b3*b1*b1 + 
    //          2*a0*b0*b2*b3*a2*a2 + 3*a0*b0*b1*b2*a3*a3 + 3*a1*a2*a3*b3*b0*b0 + 
    //          a3*a3*a3*b0*b0*b0 - a0*a0*a0*b3*b3*b3 + a3*a0*a0*b2*b2*b2 - 
    //          a0*a3*a3*b1*b1*b1;
    let v = eCalculate([ // 34 terms, each with 6 multiplicants
        [a0,a1,a2,b1,b2,b3],      [a0,a1,a3,b0,b2,b3],      [[-1],a0,a2,a3,b0,b1,b3],
        [[-1],a1,a2,a3,b0,b1,b2], [b0,a1,a1,a1,b3,b3],      [[-1],b3,a2,a2,a2,b0,b0],
        [a1,b0,a3,a3,b1,b1],      [a1,b2,a0,a0,b3,b3],      [a3,b0,a1,a1,b2,b2],
        [a3,b2,a2,a2,b0,b0],      [[-1],a0,b1,a1,a1,b3,b3], [[-1],a0,b3,a2,a2,b1,b1],
        [[-1],a2,b1,a3,a3,b0,b0], [[-1],a2,b3,a0,a0,b2,b2], [[-3],a0,b3,a3,a3,b0,b0],
        [[-2],a1,b2,a3,a3,b0,b0], [[2],a2,b1,a0,a0,b3,b3],  [[3],a3,b0,a0,a0,b3,b3],
        [a0,a2,a3,b2,b1,b1],      [a1,b0,b1,b3,a2,a2],      [[-1],a0,a1,a3,b1,b2,b2],
        [[-1],a2,b0,b2,b3,a1,a1], [[-3],a0,a1,a2,b0,b3,b3], [[-3],a3,b1,b2,b3,a0,a0],
        [[-2],a0,a2,a3,b0,b2,b2], [[-2],a3,b0,b1,b3,a1,a1], [[2],a0,a1,a3,b3,b1,b1],
        [[2],a0,b0,b2,b3,a2,a2],  [[3],a0,b0,b1,b2,a3,a3],  [[3],a1,a2,a3,b3,b0,b0],
        [a3,a3,a3,b0,b0,b0],      [[-1],a0,a0,a0,b3,b3,b3], [a3,a0,a0,b2,b2,b2],
        [[-1],a0,a3,a3,b1,b1,b1]
    ]);

    return { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}


export { getImplicitForm3Exact }
