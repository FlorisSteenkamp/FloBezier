import type { ImplicitFormExact1, ImplicitFormExact2, ImplicitFormExact3 } from '../implicit-form-types.js';
import { toPowerBasis3Exact } from '../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js';

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
import { 
    expansionProduct, fastExpansionSum, scaleExpansion2, 
    eDiff, eNegativeOf, eMultBy2, eDivBy2
} from "big-float-ts";
import { eSign as _eSign } from 'big-float-ts';
import { getImplicitForm2ExactPb } from './get-implicit-form2-exact.js';

const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const edif = eDiff;
const eno = eNegativeOf;
const em2 = eMultBy2;
const ed2 = eDivBy2;
const eSign = _eSign;


/**
 * Returns the exact implicit form of the given cubic bezier curve
 * or `undefined` if the curve degenerates to a point.
 * 
 * * returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * * returned coefficients are given *exactly* as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) expansions
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps
 * 
 * @doc
 */
function getImplicitForm3Exact(
        ps: number[][]): ImplicitFormExact3 | ImplicitFormExact2 | ImplicitFormExact1 | undefined {

    // Takes about 155 micro-seconds on a 3rd gen i7 and Chrome 79.
    return getImplicitForm3ExactPb(
        toPowerBasis3Exact(ps)
    );
}


/**
 * The power basis version of [[getImplicitForm3Exact]].
 * 
 * @param pspb the power basis representation of a cubic bezier curve that can
 * be found via [[toPowerBasis3Exact]]
 * 
 * @internal
 */
function getImplicitForm3ExactPb(
        pspb: [
                [number[], number[], number[], number[]], 
                [number[], number[], number[], number[]]
            ]): ImplicitFormExact3 | ImplicitFormExact2 | ImplicitFormExact1 | undefined {

    const [[a3,a2,a1,[a0]], [b3,b2,b1,[b0]]] = pspb;

    if (eSign(a3) === 0 && eSign(b3) === 0) {
        // the input bezier curve is in fact not cubic but has order < 3
        return getImplicitForm2ExactPb([[a2,a1,[a0]], [b2,b1,[b0]]]);
    }

    const a3b1 = epr(a3,b1);
    const a1b3 = epr(a1,b3);
    const a3b2 = epr(a3,b2);
    const a2b2 = epr(a2,b2);
    const a2b3 = epr(a2,b3);
    const a3a3 = epr(a3,a3);
    const b2b2 = epr(b2,b2);
    const b3b3 = epr(b3,b3);
    const a1a3 = epr(a1,a3);
    const a2a2 = epr(a2,a2);
    const b1b3 = epr(b1,b3);
    const b2b3 = epr(b2,b3);
    const a2a3 = epr(a2,a3);
    const a3b3 = epr(a3,b3);
    const a3b0 = sce(b0,a3);
    const a0b3 = sce(a0,b3);
    const a2b0 = sce(b0,a2);
    const a0b2 = sce(a0,b2);
    const a2b1 = epr(a2,b1);
    const a1b2 = epr(a1,b2);
    const a1b0 = sce(b0,a1);
    const a0b1 = sce(a0,b1);

    const q1 = edif(a3b0,a0b3);
    const q2 = edif(a3b1,a1b3);
    const q3 = edif(a3b2,a2b3);
    const q4 = edif(a2b0,a0b2);
    const q5 = edif(a2b1,a1b2);
    const q6 = edif(a1b0,a0b1);
    const t1 = edif(b1b3,b2b2);
    const t2 = edif(a1a3,a2a2);
    const p1 = fes(a2b3,a3b2);
    const p2 = fes(a1b3,a3b1);
    const tq2 = em2(q2);  // error free

    const q1q1  = epr(q1,q1);
    const q1q2  = epr(q1,q2);
    const q1q3  = epr(q1,q3);
    const q1q5  = epr(q1,q5);
    const q2q2  = epr(q2,q2);
    const tq2q4 = epr(tq2,q4);
    const q3q4  = epr(q3,q4);
    const q3q5  = epr(q3,q5);
    const q3q6  = epr(q3,q6);


    const vₓₓₓ = epr(eno(b3),b3b3);
    const vₓₓᵧ = epr(sce(3,a3),b3b3);
    const vₓᵧᵧ = epr(sce(-3,b3),a3a3);
    const vᵧᵧᵧ = epr(a3,a3a3);

    const u1 = edif(sce(-3,q1), q5);

    //const vₓₓ = (u1*b3b3 + q3*(b1b3 - b2b2)) + tq2*b2b3;
    const w1 = epr(u1,b3b3);
    const w2 = epr(q3,t1);
    const w3 = fes(w1,w2);
    const w4 = epr(tq2,b2b3);
    const vₓₓ = fes(w3,w4);


    //const vᵧᵧ = (u1*a3a3 + q3*t2) + tq2*a2a3;
    const w5 = epr(u1,a3a3);
    const w6 = epr(q3,t2);
    const w7 = fes(w5,w6);
    const w8 = epr(tq2,a2a3);
    const vᵧᵧ = fes(w7,w8);
    

    //const vₓᵧ = 2*(q3*(a2b2 - p2/2) - (u1*a3b3 + q2*p1));
    const wa = edif(a2b2,ed2(p2));
    const wb = epr(u1,a3b3);
    const wc = epr(q2,p1);
    const wd = fes(wb,wc);
    const wq = epr(q3,wa);
    const vₓᵧ = em2(edif(wq,wd));


    //const s1 = (-3*q1q1 - 2*q1q5) + (tq2q4 + q3q6);
    const wr = sce(-3,q1q1);
    const we = edif(wr,em2(q1q5));
    const wf = fes(tq2q4,q3q6);
    const s1 = fes(we,wf);


    //const s2 = 2*(q1q2 - q3q4);
    const s2 = em2(edif(q1q2,q3q4));


    //const s3 = q1q3 - q2q2 + q3q5;
    const wl = edif(q1q3,q2q2);
    const s3 = fes(wl,q3q5);


    //const vₓ = b3*s1 + (b2*s2 + b1*s3);
    const wm = epr(b3,s1); 
    const ws = epr(b2,s2);
    const wt = epr(b1,s3);
    const wn = fes(ws,wt);
    const vₓ = fes(wm,wn);


    //const vᵧ = -a3*s1 - (a2*s2 + a1*s3);
    const wo = epr(a3,s1);
    const wu = epr(a2,s2);
    const wv = epr(a1,s3);
    const wp = fes(wu,wv);
    const vᵧ = eno(fes(wo,wp));


    const v3 = edif(tq2q4,q1q1);
    const v1 = edif(v3,q1q5);
    const v4 = epr(s3,q6);
    const v5 = epr(q3q4,q4);
    const v2 = edif(v4,v5);
    const v6 = epr(q1,v1);
    
    //const v = q1*(tq2q4 - q1q1 - q1q5) + s3*q6 - q3q4*q4;
    const v = fes(v6,v2);

    return { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}


export { getImplicitForm3Exact, getImplicitForm3ExactPb }
