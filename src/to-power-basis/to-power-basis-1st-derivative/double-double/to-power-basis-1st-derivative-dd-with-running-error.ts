/*
import { twoDiff, ddMultDouble2, ddAddDd, ddAddDouble, twoSum } from 'double-double';

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const ts = twoSum;          // error -> 0
const td = twoDiff;        // error -> 0
const qmd = ddMultDouble2;  // error -> 3*u²
const qaq = ddAddDd;
const qad = ddAddDouble;    // error -> 2*u²

const { abs } = Math;


/**
 * Returns the derivative of the power basis representation of a bezier 
 * curve of order cubic or less (with intermediate calculations done in 
 * double-double precision).
 * 
 * * returns the resulting power basis x and y coordinate polynomials from 
 * highest power to lowest, e.g. if `x(t) = at^2 + bt + c` 
 * and `y(t) = dt^2 + et + f` then  the result is returned 
 * as `[[a,b,c],[d,e,f]]`, where the `a,b,c,...` are in double-double precision
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc
 *//*
 function toPowerBasis_1stDerivativeDd_WithRunningError(ps: number[][]): {
            coeffs: number[][][];
            errorBound: number[][];
        } {

	if (ps.length === 4) {
		return toPowerBasis3_1stDerivativeDd_WithRunningError(ps);
	}

    if (ps.length === 3) {
		return toPowerBasis2_1stDerivativeDd_WithRunningError(ps);
	}

    if (ps.length === 2) {
		return toPowerBasis1_1stDerivativeDd_WithRunningError(ps);
	}

    if (ps.length === 1) {
        return [[[0,0]], [[0,0]]];
    }

	throw new Error('The given bezier curve must be of order <= 3.');
}


/** @internal *//*
function toPowerBasis3_1stDerivativeDd_WithRunningError(ps: number[][]): {
            coeffs: number[][][];
            errorBound: number[][];
        } {

    const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;

    //--------------------------------------------------------------------------
    // `var` -> a variable
    // `$var` -> the double precision approximation to `var`
    // `_var` -> the absolute value of $var (a prefix underscore on a variable means absolute value)
    // `var_` -> the error in var (a postfix underscore means error bound but should still be multiplied by 3*γ²)
    // `_var_` -> means both absolute value and absolute error bound
    // recall: `a*b`, where both `a` and `b` have errors |a| and |b| we get for the
    //   * error bound of (a*b) === a_|b| + |a|b_ + |a*b|   (when either of a and b is double)
    //   * error bound of (a*b) === a_|b| + |a|b_ + 2|a*b|  (when both a and b are double-double)
    //   * error bound of (a+b) === a_ + b_ + |a+b|         (when a and/or b is double or double-double)
    // * the returned errors need to be multiplied by 3γ² to get the true error
    //--------------------------------------------------------------------------

    function getCoeffAndError(z0: number, z1: number, z2: number, z3: number) {
        const a = td(z3,z0);  // error free
        const $a = a[1];
        const b = td(z1,z2);  // error free
        const $b = b[1];
        const $c = 3*$b;
        const _c_ = abs($c);
        const c = qmd(3,b);
        const $d = $a + $c;
        const d = qaq(a,c);
        const _d = abs($d);
        const d_ = 2*_d;
        const $e = 3*$d;
        const _e = abs($e);
        const e_ = 3*d_ + _e;
        const e = qmd(3,d);
        const $f = z2 + z0;
        const f = ts(z2,z0);  // error free
        const g = -2*z1;      // double
        const $h = $f + g;
        const h = qad(f,g);
        const _h_ = abs($h)
        const $i = 6*$h;
        const _i = abs($i);
        const i_ = 6*_h_ + _i;
        const i = qmd(6,h);
        const $j = z1 - z0;
        const j = td(z1,z0);  // error free
        const $k = 3*$j;
        const _k_ = abs($k);
        const k = qmd(3,j);

        return {
            coeffs: [e,i,k],
            errorBound: [e_, i_, _k_]
        }
    }
    
    const { coeffs: coeffsX, errorBound: errBoundX } = getCoeffAndError(x0,x1,x2,x3);
    const { coeffs: coeffsY, errorBound: errBoundY } = getCoeffAndError(y0,y1,y2,y3);


    return {
		coeffs: [coeffsX, coeffsY],
		errorBound: [errBoundX, errBoundY]
	}
}


/** @internal *//*
function toPowerBasis2_1stDerivativeDd_WithRunningError(ps: number[][]): {
            coeffs: number[][][];
            errorBound: number[][];
        } {

    const [[x0,y0], [x1,y1], [x2,y2]] = ps;

    function getCoeffAndError(z0: number, z1: number, z2: number, z3: number) {
        const a = 2*x2;
        const b = 2*x0;
        const c = -4*x1;
        const d = ts(a,b);   // error free

        const $e = d[1] + c;
        const e = qad(d,c);
        const e_ = ;

        const f = 2*x1;
        const g = td(f,b);

        return {
            coeffs: [e,g],
            errorBound: [e_, g_]
        }
    }

    const { coeffs: coeffsX, errorBound: errBoundX } = getCoeffAndError(x0,x1,x2,x3);
    const { coeffs: coeffsY, errorBound: errBoundY } = getCoeffAndError(y0,y1,y2,y3);


    return {
		coeffs: [coeffsX, coeffsY],
		errorBound: [errBoundX, errBoundY]
	}
} 
	

/** @internal *//*
function toPowerBasis1_1stDerivativeDd_WithRunningError(ps: number[][]): number[][][] {
    const [[x0,y0], [x1,y1]] = ps;
    return [[
        td(x1,x0),
    ], [
        td(y1,y0),
    ]];
}


export { toPowerBasis_1stDerivativeDd_WithRunningError }
*/