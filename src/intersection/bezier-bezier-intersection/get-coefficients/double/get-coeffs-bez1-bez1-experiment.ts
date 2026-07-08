
// Experimental - if ps1[0] === ps2[0]

const { abs } = Math;


/**
 * Returns a polynomial in 1 variable whose roots are the parameter values of
 * the intersection points of two order 1 bezier curves (i.e. 2 lines).
 * 
 * The returned polynomial degree will be 1 
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * double precision floating point numbers from highest to lowest power, 
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 * 
 * * intermediate calculations are done in double precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1
 * @param ps2
 * 
 * @internal
 */
function getCoeffsBez1Bez1Z(
        ps1: number[][],
        ps2: number[][]) {

    //--------------------------------------------------------------------------
    // See: error-analysis-double.txt
    //--------------------------------------------------------------------------

    const { vₓ, vᵧ } = getImplicitForm1Z(ps1);

    const [[c1],[d1]] = toPowerBasis1Z(ps2);

    //----------------------------------
    // const v1 = c1*vₓ + d1*vᵧ;
    //----------------------------------
    const p1 = c1*vₓ;
    const _p1_ = abs(p1);
    const p2 = d1*vᵧ;
    const _p2_ = abs(p2);
    const v1 = p1 + p2;
    const v1_ = _p1_ + _p2_ + abs(v1);

    //-------------------------------
    // const v0 = === 0 (by premise)
    //-------------------------------

    return {
        coeffs:   [v1],
        errBound: [v1_]
    };
}


function getImplicitForm1Z(
        ps: number[][]): { vₓ: number; vᵧ: number; } {

    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    const [[a1], [b1]] = toPowerBasis1Z(ps);

    const vₓ = -b1;
    const vᵧ = a1;

    return { vₓ, vᵧ };
}


// with first point being on origin
function toPowerBasis1Z(
        ps: number[][]) {

    const [, [x1,y1]] = ps;

    const xx1 = x1;
    const yy1 = y1;

    return [[xx1], [yy1]];
}
