import { allRootsCertified, bGcdInt, eGcdInt, refineK1, RootIntervalExp } from "flo-poly";
import { bitLength, eCompare, eCompress, eDiff, eDiv, eEstimate, eMult, eMultBy2, eNegativeOf, eSign, eToDd, exponent, scaleExpansion } from 'big-float-ts';
import { expect } from "chai";
import { ddNegativeOf } from "double-double";

const { POSITIVE_INFINITY: inf, EPSILON: eps } = Number;
const { abs, sqrt, sign } = Math;


function sum(values: bigint[]) {
    let total = 0n;
    for (let i=0; i<values.length; i++) {
        total += values[i];
    }

    return total;
}


/**
 * Returns the square root of a bigint.
 *
 * * see https://stackoverflow.com/a/53684036/2010061
 *
 * @internal
 */
function bSqrt(v: bigint): bigint {
    if (v < 0n) {
        throw new Error('square root of negative numbers is not supported');
    }

    if (v < 2n) {
        return v;
    }

    return newtonIteration(v, 1n);

    function newtonIteration(n: bigint, x0: bigint): bigint {
        const x1 = ((n / x0) + x0) >> 1n;
        if (x0 === x1 || x0 === (x1 - 1n)) {
            return x0;
        }

        return newtonIteration(n, x1);
    }
}


/**
 * Returns the result of scaling the given array of floats by the *same* power 
 * of two such that all floats become bigints.
 * 
 * * both upscaling and downscaling can occur, e.g. `8` will be scaled to `1`
 * 
 * @param as an array of double precision floating point numbers
 * 
 * @internal
 */
 function scaleFloatsToBigints(as: number[]): { bs: bigint[], e: number } {
    let e = -1024;
    for (let i=0; i<as.length; i++) {
        const a = as[i];
        if (a === 0) { continue; }
        const scalePower = -exponent(a) + bitLength(a) - 1;
        if (scalePower > e) {
            e = scalePower;
        }
    }


    // check for the trivial case
    if (e === 0) { 
        return { bs: as.map(a => BigInt(a)), e };
    }

    if (e > 0) {
        return { 
            bs: as.map(a => {
                if (a === 0) { 
                    return 0n; 
                }
                const scalePower = -exponent(a) + bitLength(a) - 1;
                // we first scale `a` to an integer without overflow and then
                // convert it to a bigint before multiplying
                return BigInt(a*2**scalePower) * 2n**BigInt(e-scalePower);
            }), 
            e
        };
    }

    // overflow / underflow cannot occur
    return { bs: as.map(a => BigInt(a*2**e)), e };
}


const maxSafe = BigInt(2**53);
/**
 * Returns the Shewchuk expansion of the given bigint.
 * 
 * * it is assumed that the given bigint doesn't cause floating point overflow
 * 
 * @internal
 */
function bigintToExpansion(b: bigint): number[] {
    if (b === 0n) { return [0]; }
    const e: number[] = [];
    let i = 0;
    let q = b;
    while (q !== 0n) {
        q = b / maxSafe;
        const r = b % maxSafe;
        e.push(Number(r)*2**(i*53));
        b = q;
        i++;
    }

    return eCompress(e);
}


//(function a() {
//    const a = 2n**1000n + 1n;
//    const e = bigintToExpansion(a);
//    const s = sum(e.map(BigInt));
//    expect(a).to.eql(s);
//})();


/**
 * 
 * @param A A coordinate (x or y) of a bezier curve in power basis
 * @param B A coordinate (x or y) of another bezier curve in power basis
 */
function getLinearTransformation2(
        A: number[][],
        B: number[][])/*: {
            ca: number[],
            D2: { d: number[], sgnD: number }
            cb: number[],
            D1: { d: number[], sgnD: number }
            sgnCA: number
        }*/ {

    const [p2,p1,p0] = A;
    const [r2,r1,r0] = B;

    // The (over-determined) set of equations used to solve `c` and `d`
    // (1)   r2 = cc*p2
    // (2)   r1 = c*p1 + 2*c*d*p2
    // (3)   r0 = dd*p2 + d*p1 + p0

    // Note that since `r2,r1,r0,p2,p1,p0` are rational we must have 
    // (non-trivially) that `c` is rational and thus `d` also rational.

    //-----------------------------------
    // Calculate `c` *exactly* using (1)
    //-----------------------------------

    const { bs: _r2, e: re } = scaleFloatsToBigints(r2);
    const { bs: _p2, e: pe } = scaleFloatsToBigints(p2);

    const r2_ = sum(_r2);
    const p2_ = sum(_p2);

    const e = pe - re;  // `e` is guaranteed to be even

    const gcd = bGcdInt(r2_,p2_);

    let NN = r2_/gcd;
    let DD = p2_/gcd;
    NN = NN < 0n ? -NN : NN;
    DD = DD < 0n ? -DD : DD;
    
    const _N = bSqrt(NN);
    const _D = bSqrt(DD);

    const N = bigintToExpansion(_N);
    const D = bigintToExpansion(_D);
    /** 
     * the *exact* positive root given as the rational number `[N,D] -> N/D` 
     * where `N` and `D` are Shewchuk expansions
     */
    // const c = (Number(_N)/Number(_D)) * 2**(e/2);
    const C2 = [N,scaleExpansion(D, 2**(-e/2))];
    const C1 = [eNegativeOf(C2[0]),C2[1]];

    /*
    // polyC = p2*c*c - r2 => cc = r2/p2
    const polyCExact = [p2,[0],eNegativeOf(r2)];
    const polyCDd = [eToDd(p2), [0,0], ddNegativeOf(eToDd(r2))];
    const polyCError = [
        abs(eEstimate(eDiff(polyCExact[0],polyCDd[0]))),
        0,
        abs(eEstimate(eDiff(polyCExact[2],polyCDd[2])))
    ];
    const _cs = allRootsCertified(
        polyCDd, -inf, +inf, polyCError, 
        () => polyCExact, false
    );
    // TODO - consider case of double root
    const [c1,c2] = _cs.map(v => {
        // TODO - the below can simply be replaced by `const a = refineK1(_a,paE)[0].tS` once
        // flo-poly has been updated
        return v.tE === v.tS ? [0,v.tS] : refineK1(v,polyCExact)[0].tS;
    });
    */

    //eDiv(C2[0],C2[1],5);//?
    //eCompare(c2,eDiv(C2[0],C2[1],5));//?
    //expect(abs(eEstimate(eDiff(
    //    c2,
    //    eDiv(C2[0],C2[1],5)
    //)))).to.be.lessThan(2**-98);

    /*
    //-------------------------
    // Calculate `d` using (3)
    //-------------------------

    // (3)   r0 = dd*p2 + d*p1 + p0
    const P0minR0 = eDiff(p0,r0);
    const polyDExact = [p2,p1,P0minR0];
    const polyDDd = polyDExact.map(eToDd);
    const polyDError = [
        abs(eEstimate(eDiff(polyDExact[0],polyDDd[0]))),
        abs(eEstimate(eDiff(polyDExact[1],polyDDd[1]))),
        abs(eEstimate(eDiff(polyDExact[2],polyDDd[2])))
    ];
    const _ds = allRootsCertified(
        polyDDd, -inf, +inf, polyDError, 
        () => polyDExact, false
    );
    // TODO - consider case of double root
    const ds: RootIntervalExp[][] = _ds.map(v => {
        // TODO - the below can simply be replaced by `return refineK1(v,polyDExact)` once
        // flo-poly has been updated
        return v.tE === v.tS 
            ? [{ multiplicity: 1, tS: [0,v.tS], tE: [0,v.tE] }]
            : refineK1(v,polyDExact);
    });
    
    const ds_: number[][] = [];
    for (let d of ds) {
        for (let d_ of d) {
            if (d_.multiplicity === 1) {
                ds_.push(d_.tS);
            } else if (d_.multiplicity === 2) {
                ds_.push(d_.tS, d_.tS);
            }
        }
    }
    const [d1,d2] = ds_;

    // dd*p2 + d*p1 + (p0 - r0) = 0
    // d = (-p1 +- sqrt(p1**2 - 4*p2*(p0 - r0)))/(2*p2)

    //------------------------
    // Calculate sign of `d`
    //------------------------
    const signP1 = eSign(p1);
    const signP2 = eSign(p2);
    const signP0minR0 = eSign(P0minR0);

    const [signN1,signN2] = [-1,+1].map(_s => {
        const s = _s * signP2;
        return (
              signP1 === 0
            ? eSign(P0minR0) === 0 ? 0 : +1
            : s*signP1 < 0
            ? s
            : signP2*signP0minR0 > 0
            ? -s
            : signP0minR0 === 0 ? 0 : s
        );
    });

    const sgnD1 = signN1 * signP2;
    const sgnD2 = signN2 * signP2;

    const D1 = { d: d1, sgnD: sgnD1 };
    const D2 = { d: d2, sgnD: sgnD2 };
    //-------------------------
    */


    //-----------------------------------
    // Calculate `d` *exactly* using (2)
    //-----------------------------------
    // (2)   r1 = c*p1 + 2*c*d*p2  =>
    //       r1 = c*(p1 + 2*d*p2)  =>
    // dA = (r1/c - p1)/(2*p2)
    //    = r1/(c*2*p2) - c*p1/(c*2*p2)
    //    = (r1 - c*p1)/(c*2*p2)
    //    = (r1 - N*p1/D)/(N*2*p2/D)
    //    = (D*r1 - N*p1)/(N*2*p2)
    // dB = (r1/(-c) - p1)/(2*p2)
    //    = r1/(-c*2*p2) - c*p1/(c*2*p2)
    //    = (-r1 - c*p1)/(c*2*p2)
    //    = (-r1 - N*p1/D)/(N*2*p2/D)
    //    = (-r1*D - N*p1)/(N*2*p2)

    const _DA = eCompress(eDiv(
        eDiff(
            eMult(r1,C2[1]),
            eMult(p1,C2[0]),
        ),
        eMult(C2[0],eMultBy2(p2)), 
        5
    ));

    const _DB = eCompress(eDiv(
        eDiff(
            eMult(r1,eNegativeOf(C2[1])),
            eMult(p1,C2[0]),
        ),
        eMult(C2[0],eMultBy2(p2)), 
        5
    ));

    const [DA,DB] = [_DA,_DB].sort(eCompare);

    //expect(abs(eEstimate(eDiff(d1,DA)))).to.be.lessThan(2**-97);
    //expect(abs(eEstimate(eDiff(d2,DB)))).to.be.lessThan(2**-97);
    //expect(sign(eSign(DA))).to.equal(sign(sgnD1));
    //expect(sign(eSign(DB))).to.equal(sign(sgnD2));

    const $D1 = { d: DA, sgnD: eSign(DA) };
    const $D2 = { d: DB, sgnD: eSign(DB) };

    // If r1 is negative (positive) then c*r must be negative (positive)
    // TODO - consider case where r1 is zero
    //return eSign(r1) > 0
    //    ? { ca:c2, D2,   cb:c1, D1,   sgnCA: +1 }
    //    : { ca:c1, D2,   cb:c2, D1,   sgnCA: -1 };

    // return eSign(r1) > 0
    // ? { D2, D1 }
    // : { D2, D1 };

    //D1;//?
    //$D1;//?
    //D2;//?
    //$D2;//?

    // return { D2, D1 };
    return { D2: $D2, D1: $D1 };
}


export { getLinearTransformation2 }
