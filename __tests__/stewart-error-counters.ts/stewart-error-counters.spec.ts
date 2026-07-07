//--------------------------------------------------------------------------
// THIS FILE IS SIMPLY TO DEMONSTRATE STEWART ERROR COUNTERS IN ACTION
// * see [Stewart error counters](https://www.amazon.ca/Introduction-Matrix-Computations-G-Stewart/dp/0126703507)
//--------------------------------------------------------------------------

// Summary of theorems
//--------------------
// ❗THEOREM❗ Addition and subtraction takes the highest value counter and
//  adds 1 to get the new counter
//  e.g. <5>v0 + <5>v1 -> max(5,5) + 1 = 6
//
// ❗THEOREM❗ Multiplication and division takes the sum of the error
//  counters PLUS 1.
//  e.g. <5>v0 * <5>v1 -> (5 + 5 + 1) = 11
//
// ❗NOTE❗ We can write error counters on the values themselves, e.g. <5>v0 
//  to indicate that there's an error counter of value 5 on `v0` or e.g.
//  <4>(<3>v0 - <3>v1) to indicate the error counter on the result of `v0 + v1`.
//
// ❗CALC MAX ERROR AT THE END❗ by doing the same calculations but using the
//  absolute values of the numbers involved in the calculation and multiplying
//  with the error counters and `γ(1)` (for double precision) or
// `2*γγ(3)` (for double-double precision), etc. since the error is relative to
// the size of the numbers involved in the calculation, not the final result,
// e.g. if the error counter on `v` is 5, i.e. <5>v, then the error is at most
// 5*γ(1)*|v| in double precision.


import { describe, expect, it } from '@jest/globals';
import { squares } from 'squares-rng';

import { γ } from '../../src/error-analysis/error-analysis.js';
import { eAbs, eAdd, eCalculate, eDiff, eDiv, eMult, twoProduct, twoSum } from 'big-float-ts';

const { abs, min, max } = Math;

const γ1 = γ(1);


describe('correctly calculate and use Stewart Error Counters', function() {
    it('',
    function() {
        //========================
        // Addition / Subtraction
        //========================
        {
            //-------------------
            // Basic case: a + b
            //-------------------
            {
                const V_COUNT = 10;  // number of values to use in demonstration
                const N = 100;  // Number of loops

                let minErr = Number.POSITIVE_INFINITY;
                let maxErr = Number.NEGATIVE_INFINITY;
                let minRelErr = Number.POSITIVE_INFINITY;
                let totErr = 0;
                const EE = 5;  // initial error counter on each value
                for (let i=0; i<N; i++) {
                    // some random values to demonstrate the concept
                    // * we start with 10 numbers with an error counter of 5 on each number
                    const vs = getValues(0 + (i*N), V_COUNT, EE);
                    const [v0_,v1_,v2_,v3_,v4_,v5_,v6_,v7_,v8_,v9_] = vs.map(v => v.v_);  // values with errors
                    const [v0,v1,v2,v3,v4,v5,v6,v7,v8,v9] = vs.map(v => v.v);             // actual values
                    const [e0,e1,e2,e3,e4,e5,e6,e7,e8,e9] = vs.map(v => v.err);           // errors

                    const r1 = v0_ + v1_;        // calculated value
                    const _r1_ = v0_ + v1_;        // calculated value using abs values (crucial step!)
                    const r1Dd = twoSum(v0,v1);  // exact value
                    // ❗THEOREM❗ Addition and subtraction takes the highest
                    // value counter (max(<5>,<5>)) === 5 in this case and adds 1
                    // to get the new counter -> 6
                    
                    // The <5>v0 indicates there's an error counter of value 5 on `v0`, i.e.
                    // the initial uncertainty.

                    // r1 = <6>(<5>v0 + <5>v1)
                    
                    // adds one to the error counter -> 5 + 1 = 6

                    // ❗CALC MAX ERROR AT THE END❗ by multiplying with error counters and
                    // `γ1` (for double precision) or `2*γγ3` (for double-double precision), etc.
                    // with `_r1_` (the sum of the absolute values) instead of `r1` (the actual value)
                    // since the error is relative to the size of the numbers involved in the calculation,
                    // not the final result.
                    const errActualE = eAbs(eDiff(r1Dd, [r1]));
                    const errActual = errActualE[errActualE.length - 1];

                    const E = 6;  // the calculated error counter
                    const errMax = abs(E*γ1*_r1_);

                    const relErr = errMax/errActual;
                    totErr += errActual;

                    minErr = min(minErr, errActual);
                    maxErr = max(maxErr, errActual);

                    minRelErr = min(minRelErr, relErr);

                    if (relErr < 1) {
                        throw new Error(`Error is larger than the calculated error bound! errActual = ${errActual} whilst errMax = ${errMax}`);
                    }
                }

                // const avgErr = totErr/N;
                // minErr;//?
                // maxErr;//?
                // ❗`minRelErr` should aproach one due to tight(ish) bounds of max error calculations
                expect(minRelErr).toBeGreaterThan(1);
                expect(minRelErr).toBeLessThan(16);  // 16 is just a random upper bound to make sure the test isn't passing due to very loose bounds of error calculations
                minRelErr;//?
            }

            //--------------------------------------------
            // Involved case: (a + b) - (c + d) - (e + f)
            //--------------------------------------------
            {
                const V_COUNT = 10;  // number of values to use in demonstration
                const N = 100;  // Number of loops

                let minErr = Number.POSITIVE_INFINITY;
                let maxErr = Number.NEGATIVE_INFINITY;
                let minRelErr = Number.POSITIVE_INFINITY;
                let totErr = 0;
                const EE = 5;  // initial error counter on each value
                for (let i=0; i<N; i++) {
                    // some random values to demonstrate the concept
                    // * we start with 10 numbers with an error counter of 5 on each number
                    const vs = getValues(0 + (i*N), V_COUNT, EE);
                    const [v0_,v1_,v2_,v3_,v4_,v5_,v6_,v7_,v8_,v9_] = vs.map(v => v.v_);  // values with errors
                    const [v0,v1,v2,v3,v4,v5,v6,v7,v8,v9] = vs.map(v => v.v);             // actual values
                    const [e0,e1,e2,e3,e4,e5,e6,e7,e8,e9] = vs.map(v => v.err);           // errors

                    const r1 = (v0_ + v1_) - (v2_ + v3_) - (v4_ + v5_);   // calculated value
                    const _r1_ = (v0_ + v1_) + (v2_ + v3_) + (v4_ + v5_);   // calculated using abs values (crucial step!)
                    const r1a = eAdd([v0],[v1]);
                    const r1b = eAdd([v2],[v3]);
                    const r1c = eAdd([v4],[v5]);
                    const r1E = eDiff(eDiff(r1a, r1b), r1c);  // exact value

                    // ❗THEOREM❗ Addition and subtraction takes the highest
                    // value counter and adds 1 to get the new counter (see prior
                    // test above)
                    
                    // The <5>v0 indicates there's an error counter of value 5 on `v0`, i.e.
                    // the initial uncertainty.

                    // Calculation of error counter:
                    // const rr1 = <8>(
                    //     <7>(<6>(<5>v0_ + <5>v1_) - <6>(<5>v2_ + <5>v3_)) -
                    //     <6>(<5>v4_ + <5>v5_)
                    // );//?
                    
                    // error counter -> 8

                    const errActualE = eAbs(eDiff(r1E, [r1]));
                    const errActual = errActualE[errActualE.length - 1];

                    // ❗CALC MAX ERROR AT THE END❗ by multiplying with error counters and
                    // `γ1` (for double precision) or `2*γγ3` (for double-double precision), etc.
                    // with `_r1_` (the sum of the absolute values) instead of `r1` (the actual value)
                    // since the error is relative to the size of the numbers involved in the calculation, not the final result.
                    const E = 8;  // the calculated error counter
                    const errMax = abs(E*γ1*_r1_);

                    const relErr = errMax/errActual;
                    totErr += errActual;

                    minErr = min(minErr, errActual);
                    maxErr = max(maxErr, errActual);

                    minRelErr = min(minRelErr, relErr);

                    if (relErr < 1) {
                        throw new Error(`Error is larger than the calculated error bound! errActual = ${errActual} whilst errMax = ${errMax}`);
                    }
                }

                // const avgErr = totErr/N;//?
                // minErr;//?
                // maxErr;//?
                // ❗`minRelErr` should aproach one due to tight(ish) bounds of max error calculations
                expect(minRelErr).toBeGreaterThan(1);
                expect(minRelErr).toBeLessThan(16);  // 16 is just a random upper bound to make sure the test isn't passing due to very loose bounds of error calculations
                minRelErr;//?
            }
        }


        //===========================
        // Multiplication / Division
        //===========================
        {
            //-------------------
            // Basic case: a * b
            //-------------------
            {
                const V_COUNT = 10;  // number of values to use in demonstration
                const N = 100;  // Number of loops

                let minErr = Number.POSITIVE_INFINITY;
                let maxErr = Number.NEGATIVE_INFINITY;
                let minRelErr = Number.POSITIVE_INFINITY;
                let totErr = 0;
                const EE = 5;  // initial error counter on each value
                for (let i=0; i<N; i++) {
                    // some random values to demonstrate the concept
                    // * we start with 10 numbers with an error counter of 5 on each number
                    const vs = getValues(0 + (i*N), V_COUNT, EE);
                    const [v0_,v1_,v2_,v3_,v4_,v5_,v6_,v7_,v8_,v9_] = vs.map(v => v.v_);  // values with errors
                    const [v0,v1,v2,v3,v4,v5,v6,v7,v8,v9] = vs.map(v => v.v);             // actual values
                    const [e0,e1,e2,e3,e4,e5,e6,e7,e8,e9] = vs.map(v => v.err);           // errors

                    const r1 = v0_ * v1_;         // calculated value
                    const _r1_ = abs(v0_ * v1_);  // calculated value using abs values (crucial step!)
                    const r1Dd = twoProduct(v0,v1);  // exact value
                    // ❗THEOREM❗ Multiplication and division takes the sum of
                    // the error counters PLUS 1: (<5> + <5> + 1) === 11 in this case
                    
                    // The <5>v0 indicates there's an error counter of value 5 on `v0`, i.e.
                    // the initial uncertainty.

                    // r1 = <11>(<5>v0 * <5>v1)

                    // ❗CALC MAX ERROR AT THE END❗ by multiplying with error counters and
                    // `γ1` (for double precision) or `2*γγ3` (for double-double precision), etc.
                    // with `_r1_` (the sum of the absolute values) instead of `r1` (the actual value)
                    // since the error is relative to the size of the numbers involved in the calculation,
                    // not the final result.
                    const errActualE = eAbs(eDiff(r1Dd, [r1]));
                    const errActual = errActualE[errActualE.length - 1];

                    const E = 11;  // the calculated error counter
                    const errMax = abs(E*γ1*_r1_);

                    const relErr = errMax/errActual;
                    totErr += errActual;

                    minErr = min(minErr, errActual);
                    maxErr = max(maxErr, errActual);

                    minRelErr = min(minRelErr, relErr);

                    if (relErr < 1) {
                        throw new Error(`Error is larger than the calculated error bound! errActual = ${errActual} whilst errMax = ${errMax}`);
                    }
                }

                // const avgErr = totErr/N;//?
                // minErr;//?
                // maxErr;//?
                // ❗`minRelErr` should aproach one due to tight(ish) bounds of max error calculations
                expect(minRelErr).toBeGreaterThan(1);
                expect(minRelErr).toBeLessThan(16);  // 16 is just a random upper bound to make sure the test isn't passing due to very loose bounds of error calculations
                minRelErr;//?
            }
        }


        //==============
        // Combinations
        //==============

        // Let's combine addition and multiplication in a more complex expression,
        // e.g. (a + b) * (c - d) / e, and see how the error counters combine
        // and how the actual error compares to the calculated error bound.
        {
            const V_COUNT = 10;  // number of values to use in demonstration
            const N = 100;  // Number of loops

            let minErr = Number.POSITIVE_INFINITY;
            let maxErr = Number.NEGATIVE_INFINITY;
            let minRelErr = Number.POSITIVE_INFINITY;
            let totErr = 0;
            const EE = 5;  // initial error counter on each value
            for (let i=0; i<N; i++) {
                // some random values to demonstrate the concept
                // * we start with 10 numbers with an error counter of 5 on each number
                const vs = getValues(0 + (i*N), V_COUNT, EE);
                const [v0_,v1_,v2_,v3_,v4_,v5_,v6_,v7_,v8_,v9_] = vs.map(v => v.v_);  // values with errors
                const [v0,v1,v2,v3,v4,v5,v6,v7,v8,v9] = vs.map(v => v.v);             // actual values
                const [e0,e1,e2,e3,e4,e5,e6,e7,e8,e9] = vs.map(v => v.err);           // errors

                const r1 = ((v0_ + v1_) * (v2_ - v3_)) / v4_;          // calculated value
                // calculated using abs values (crucial step!) - the magnitudes
                // accumulate so subtraction becomes addition here
                const _r1_ = abs(((v0_ + v1_) * (v2_ + v3_)) / v4_);
                // exact value (computed in extended precision via expansions):
                // numerator is exact, the division is taken to a high expansion
                // length so that it is effectively exact relative to double precision
                const numE = eMult(eAdd([v0],[v1]), eDiff([v2],[v3]));  // exact numerator
                const r1E = eDiv(numE, [v4], 10);                       // (effectively) exact value

                // ❗THEOREM❗ Combine the rules:
                //   * addition / subtraction -> max(operand counters) + 1
                //   * multiplication / division -> sum(operand counters) + 1

                // The <5>v0 indicates there's an error counter of value 5 on `v0`, i.e.
                // the initial uncertainty.

                // Calculation of error counter:
                // const rr1 = <19>(
                //     <13>(
                //         <6>(<5>v0_ + <5>v1_) *
                //         <6>(<5>v2_ - <5>v3_)
                //     ) / <5>v4_
                // );
                //
                //   * <6>(<5>v0_ + <5>v1_)   -> max(5,5) + 1 = 6
                //   * <6>(<5>v2_ - <5>v3_)   -> max(5,5) + 1 = 6
                //   * <13>( <6> * <6> )      -> 6 + 6 + 1 = 13
                //   * <19>( <13> / <5>v4_ )  -> 13 + 5 + 1 = 19

                // error counter -> 19

                const errActualE = eAbs(eDiff(r1E, [r1]));
                const errActual = errActualE[errActualE.length - 1];

                // ❗CALC MAX ERROR AT THE END❗ by multiplying with error counters and
                // `γ1` (for double precision) or `2*γγ3` (for double-double precision), etc.
                // with `_r1_` (computed via the absolute values) instead of `r1` (the actual value)
                // since the error is relative to the size of the numbers involved in the calculation,
                // not the final result.
                const E = 19;  // the calculated error counter
                const errMax = abs(E*γ1*_r1_);

                const relErr = errMax/errActual;
                totErr += errActual;

                minErr = min(minErr, errActual);
                maxErr = max(maxErr, errActual);

                minRelErr = min(minRelErr, relErr);

                if (relErr < 1) {
                    throw new Error(`Error is larger than the calculated error bound! errActual = ${errActual} whilst errMax = ${errMax}`);
                }
            }

            // const avgErr = totErr/N;//?
            // minErr;//?
            // maxErr;//?
            // ❗`minRelErr` should aproach one due to tight(ish) bounds of max error calculations
            expect(minRelErr).toBeGreaterThan(1);
            expect(minRelErr).toBeLessThan(16);  // 16 is just a random upper bound to make sure the test isn't passing due to very loose bounds of error calculations
            minRelErr;//?
        }
    });
});


/**
 * Returns a value with an error within what the given error counter allows.
 * 
 * @param S rng seed
 * @param n number of values to get
 * @param E error counter endowed onto values
 */
function getValues(
        S: number,
        n: number,
        E: number) {

    const vs: { v: number; v_: number; err: number }[] = [];
    for (let i=0; i<n; i++) {
        const v1 = squares(4*(i+S) + 0)*2**-30;  // some value 1 (32 bitlength)
        const v2 = squares(4*(i+S) + 1)*2**-30;  // some value 2 (32 bitlength)
        const v = v1*v2;

        const e1 = 2*(squares(4*(i+S) + 1)*2**-32) - 1  // some value in [-1,1]
        const e2 = 2*(squares(4*(i+S) + 1)*2**-32) - 1  // some value in [-1,1]
        const e = e1*e2;

        const err = E*γ1*v*e;  // error created to add to actual value

        vs.push({ v, v_: v + err, err });
    }

    return vs;
}
