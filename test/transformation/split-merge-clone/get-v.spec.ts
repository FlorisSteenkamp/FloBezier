import { parseDoubleDetailed } from 'double-double';
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { getV } from '../../../src/index.js';
import { rand01 } from '../../helpers/random-on-grid.js';


const eps = Number.EPSILON;
const u = eps/2;
const random = Math.random;
const round = Math.round;
const uDivides = (n: number) => (n/u) - round(n/u) === 0;
const epsDivides = (n: number) => (n/eps) - round(n/eps) === 0;


function test(tS: number, tE: number) {
    const v1 = getV(tS,tE);
    const v2 = ((tE - tS)/(1 - tS));  // naive calculation

    assert(
        v1 >= v2, 
        `v1 < v2 - wrong!\nv1: ${v1}, v2: ${v2}, tS: ${tS}, tE: ${tE}`
    );
    assert(uDivides(v1), 'eps/2 ∤ v1 - wrong!');
}


function testAdd1Ulp(v: number) {
    const v_ = add1Upl(v);

    //---- test directly
    const lastBitV  = parseDoubleDetailed(v ).significand[51];
    const lastBitV_ = parseDoubleDetailed(v_).significand[51];
    assert(lastBitV !== lastBitV_);  

    //---- test same thing in a different way as a double-check
    const ulp = v_ - v;
    const lower = v * 2**-53;
    const upper = v * 2**-52;
    assert(lower <= ulp && upper >= ulp);
}


describe('getV', function() {
    it('it should add 1 ulp to a number as a pretest',
    function() {
        for (let i=0; i<25; i++) {
            testAdd1Ulp(2**-i);
        }
        
        for (let i=0; i<25; i++) {
            const v = rand01(i);
            testAdd1Ulp(v);
        }
    });

	it('it should calculate the correct value',
	function() {
        {
            expect(getV(0.875,1)).to.eql(1);
            expect(getV(0,0)).to.eql(0);
            expect(getV(0,1/2**10)).to.eql(1/2**10);
            expect(getV(1/4, 1/2)).to.eql(0.33333333333333337);
            expect(getV(0,1/2)).to.eql(0.5);
            expect(getV(1/2,1)).to.eql(1);
            expect(getV(0,1)).to.eql(1);
        }


        let tS = 0.5257814553393474;
        let tE = 0.5333566760023488;
        // uDivides(tS)//?
        // uDivides(tE)//?
        test(tS, tE);

        let testCount = 25;
        let i = 0;
        let j = 0;
        while (j < testCount) {
            let tS: number;
            let tE: number;
            while (true) { tS = rand01(2*i    ); if (uDivides(tS)) { break; } i++; }
            while (true) { tE = rand01(2*i + 1); if (uDivides(tE)) { break; } i++; }

            [tS,tE] = [tS,tE].sort((a,b) => a - b);
            test(tS,tE);

            j++;
        }
	});
});


/**
 * `getV` reproduced for convenience.
 * 
 * Returns the *smallest* double (call it `v`) such that:
 * * `v >= _v_ === (tE - tS)/(1 - tS)` AND
 * * such that `eps/2 | v` (where `eps === Number.EPSILON`)
 * 
 * Preconditions:
 *  1. exact `tS`, `tE`
 *  2. `tS, tE ∈ (0,1)`
 *  3. `eps/2 | tS` (and `eps/2 | tE`)
 *  4. `tE > tS`
 */
function getV2(tS: number, tE: number) {
    const span = tE - tS;    // exact by preconditions 
    const fromEnd = 1 - tS;  // exact by preconditions 
    const v = span/fromEnd;  // rounded to nearest ulp (tie breaks to even)
    
    // add an `ulp` so that `v >= _v_` guaranteed
    const r = v + v*u;
    // and *round* to nearest `eps/2`
    const r_ = r + 0.5 - 0.5;

    return r_ >= r ? r_ : r_ + u;
}


/** 
 * Adds 1 ulp to a number for positive numbers or subtract 1 ulp for negative 
 * numbers. 
 */
function add1Upl(v: number) {
    const r = v + v*u;

    // return r;  // no, also take care of exact powers of 2, e.g. 1, 0.25, 0.125
    return v === r ? v + v*eps : r;
}


/**
 * Rounds the given number to the nearest `eps`; not truncate
 */
function roundToNearestEps(v: number) {
    return v + 1 - 1;
}


/**
 * Rounds the given number to the nearest `eps/2`; not truncate
 */
 function roundToNearestU(v: number) {
    return v + 0.5 - 0.5;
}