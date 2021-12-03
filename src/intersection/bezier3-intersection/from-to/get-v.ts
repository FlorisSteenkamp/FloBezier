const eps = Number.EPSILON;
const u = eps/2;


/**
 * Returns the *smallest* double (call it `v`) such that:
 * * `v >= _v_ === (tE - tS)/(1 - tS)` AND
 * * such that `eps/2 | v` (where `eps/2 === Number.EPSILON`)
 * 
 * * this function is for demonstration and testing purposes and was inlined to 
 * save a function call
 * 
 * Preconditions:
 *  1. exact `tS`, `tE`
 *  2. `tS, tE ∈ (0,1)`
 *  3. `Number.EPSILON/2 | tS` (and `Number.EPSILON/2 | tE`)
 *  4. `tE > tS`
 * 
 * @internal
 */
 function getV(
        tS: number, 
        tE: number) {

    // Recall: the result of +, -, * and / is exactly rounded; that is, the 
    // result is computed exactly and then rounded to the nearest 
    // floating-point number (using round to even).
    // Therefore: it is guaranteed that `v > 0` and `v < 1`
    //
    // The `+ 0.5 - 1` at the end is critical in 
    // ensuring that `Number.EPSILON/2 | v`. (this also causes `v` to be able to go to `1`)
    // e.g.:
    // `function a(a) { return (a*(1+Number.EPSILON) + 1 - 1)/Number.EPSILON; }`
    // `function b(a) { return (a*(1+Number.EPSILON)        )/Number.EPSILON; }`
    // `a(0.0000000321276211)  // 144689942`
    // `b(0.0000000321276211)  // 144689942.41426048`

    const v = 
        (tE - tS) /  // exact and > 0 by preconditions  3 and 4
        (1 - tS);    // exact and > 0 by preconditions  2 and 3
    
    // add an `ulp` so that `v >= _v_` guaranteed
    const r = v + v*u;
    // and *round* to nearest `eps/2`
    const r_ = r + 0.5 - 0.5;

    return r_ >= r ? r_ : r_ + u;
}


export { getV }
