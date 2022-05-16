import type { ImplicitFormExact1, ImplicitFormExact2 } from '../implicit-form-types.js';
import { toPowerBasis2Exact } from '../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js';
import { getImplicitForm1ExactPb } from './get-implicit-form1-exact.js';

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
import { 
    expansionProduct, scaleExpansion2, 
    eDiff, eNegativeOf, eMultBy2, eSign, 
} from "big-float-ts";
import { eSign as _eSign } from 'big-float-ts';

const sce = scaleExpansion2;
const em2 = eMultBy2;
const edif = eDiff;
const epr = expansionProduct;
const eno = eNegativeOf;


/**
 * Returns the exact implicit form of the given quadratic bezier curve
 * or `undefined` if the curve degenerates to a point.
 * 
 * * returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * * returned coefficients are given *exactly* as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) expansions
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps 
 * 
 * @doc mdx
 */
function getImplicitForm2Exact(
        ps: number[][]): {
            vₓₓ: number[]; vₓᵧ: number[]; vᵧᵧ: number[];
            vₓ: number[]; vᵧ: number[]; v: number[];
        } | { 
            vₓ: number[]; vᵧ: number[]; v: number[];
        } | undefined {

    return getImplicitForm2ExactPb(
        toPowerBasis2Exact(ps)
    );
}


/**
 * The power basis version of [[getImplicitForm2Exact]].
 * 
 * @param pspb the power basis representation of a quadratic bezier curve that 
 * can be found via [[toPowerBasis2Exact]]
 * 
 * @internal
 */
 function getImplicitForm2ExactPb(
        pspb: [
                [number[], number[], number[]], 
                [number[], number[], number[]]
            ]): ImplicitFormExact2 | ImplicitFormExact1 | undefined {

    const [[a2,a1,[a0]], [b2,b1,[b0]]] = pspb;

    if (eSign(a2) === 0 && eSign(b2) === 0) {
        // the input bezier curve is in fact not quadratic but has order < 2
        return getImplicitForm1ExactPb([[a1,[a0]], [b1,[b0]]]);
    }

    const a2b1 = epr(a2,b1);
    const a1b2 = epr(a1,b2);
    const a2b0 = sce(b0,a2);
    const a0b2 = sce(a0,b2);
    const a1b0 = sce(b0,a1);
    const a0b1 = sce(a0,b1);
    const a2a2 = epr(a2,a2);
    const a2b2 = epr(a2,b2);
    const b2b2 = epr(b2,b2);

    const q1 = edif(a2b1,a1b2);
    const q2 = edif(a2b0,a0b2);
    const q3 = edif(a1b0,a0b1);

    // -a1*q1*y - a2**2*y**2 + 2*a2*b2*x*y + 2*a2*q2*y + b1*q1*x - b2**2*x**2 - 2*b2*q2*x + q1*q3 - q2**2

    // b2**2*x**2
    // -b2**2 *x**2
    const vₓₓ = eno(b2b2);

    // -2*a2*b2*x*y
    // 2*a2*b2 *x*y
    const vₓᵧ = em2(a2b2);

    // a2**2*y**2
    // -a2**2 *y**2 
    const vᵧᵧ = eno(a2a2);

    // -2*a0*b2**2 + a1*b1*b2 + 2*a2*b0*b2 - a2*b1**2
    // (b1*q1 + -2*b2*q2) *x
    //const vₓ = b1*q1 - 2*b2*q2;
    const w1 = epr(b1,q1);
    const w2 = em2(epr(b2,q2));
    const vₓ = edif(w1,w2);

    // 2*a0*a2*b2 - a1**2*b2 + a1*a2*b1 - 2*a2**2*b0
    // (-a1*q1 + 2*a2*q2) *y
    const w3 = em2(epr(a2,q2));
    const w4 = epr(a1,q1);
    const vᵧ = edif(w3,w4);

    // a0**2*b2**2 - a0*a1*b1*b2 - 2*a0*a2*b0*b2 + a0*a2*b1**2 + a1**2*b0*b2 - a1*a2*b0*b1 + a2**2*b0**2
    // q1*q3 + -q2**2
    const w5 = epr(q1,q3);
    const w6 = epr(q2,q2);
    const v = edif(w5,w6);

    //console.log({ vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v })

    return { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}

export { getImplicitForm2Exact, getImplicitForm2ExactPb }
