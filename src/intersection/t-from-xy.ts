import { allRootsCertified, RootInterval } from 'flo-poly';
import { getXYExactAnyBitlength3 } from "../to-power-basis/any-bitlength/exact/get-xy-exact-any-bitlength";
import { getXYDdAnyBitlength3 } from "../to-power-basis/any-bitlength/double-double/get-xy-dd-any-bitlength";
import { twoDiff as twoDiff_ } from 'big-float-ts';


const twoDiff = twoDiff_;

const min = Math.min;


// TODO docs
/**
 * Performs certified inversion, i.e. returns the `t` parameter value 
 * interval(s) for the given `x` and `y` coordinates on the specified bezier 
 * curve.
 * 
 * Returns `undefined` if the point is on the curve and the curve is a point.
 * 
 * **precondition:** `p` must be *exactly* on the curve
 * * **certified** here means no `t` value can be missed but (in rare case)
 * an extra 1 or 2 `t`s could be returned (e.g. for self-overlapping curves
 * and when the point is exactly on the point of self-intersection of the curve)
 * 
 * @param ps
 * @param p
 */
function tFromXY3(
        ps: number[][], p: number[]): number[][] {

    const x = p[0];
    const y = p[1];

    // get power basis representation in double-double precision including error
    // bound
    const {
        coeffs: [_polyDdX, _polyDdY],
        errorBound: [polyX_, polyY_]
    } = getXYDdAnyBitlength3(ps);

    // pop the constant term off `x(t)`
    const txDd = _polyDdX.pop() as number;
    // subtract the x coordinate of the point
    const polyDdX = [..._polyDdX, twoDiff(txDd, x)] as number[][];

    // pop the constant term off `y(t)`
    const tyDd = _polyDdY.pop() as number;
    // subtract the y coordinate of the point
    const polyDdY = [..._polyDdY, twoDiff(tyDd, y)] as number[][];

    let pExactXY: [
        [number[], number[], number[], number],
        [number[], number[], number[], number]
    ] = undefined;

    const getPExactX = (): number[][] => { 
        if (pExactXY === undefined) { pExactXY = getXYExactAnyBitlength3(ps); }
        const _pExactX = pExactXY[0];  // x coordinate
        // pop the constant term off `x(t)`
        const tx = _pExactX.pop() as number;
        const pExactX = [..._pExactX, twoDiff(tx, x)] as number[][];

        return pExactX;
    }

    const getPExactY = (): number[][] => {
        if (pExactXY === undefined) { pExactXY = getXYExactAnyBitlength3(ps); }
        const _pExactY = pExactXY[1];  // y coordinate
        // pop the constant term off `y(t)`
        const ty = _pExactY.pop() as number;
        const pExactY = [..._pExactY, twoDiff(ty, y)] as number[][];

        return pExactY;
    }

    // max 3 roots
    const xrs = allRootsCertified(polyDdX, 0, 1, polyX_, getPExactX);
    // max 3 roots
    const yrs = allRootsCertified(polyDdY, 0, 1, polyY_, getPExactY);

    if (xrs === undefined) {
        // the `x` value of the point is on the curve for all `t` values
        // the curve must be a 'line' (can also be degenerate quadratic, etc.)
        if (yrs === undefined) {
            // the `y` value of the point is on the curve for all `t` values
            // the curve must be a point
            return undefined;
        }

        return yrs.map(r => [r.tS, r.tE]);
    }

    if (yrs === undefined) {
        // the `y` value of the point is on the curve for all `t` values
        // the curve must be a 'line' (can also be degenerate quadratic, etc.)        

        return xrs.map(r => [r.tS, r.tE]);;
    }

    // check for `t` value overlap 
    // - there can be 1 overlap (the usual case), 2 overlaps (at point of 
    // self-intersection), 3 overlaps (for self-overlapping curve (that looks 
    // like a line))

    // at this point `xrs !== undefined` and `yrs !== undefined`

    let rs: number[][] = [];
    for (let i=0; i<xrs.length; i++) {
        let xr = xrs[i];
        for (let j=0; j<yrs.length; j++) {
            let yr = yrs[j];
            let r = combineRoots(xr,yr);
            
            if (r !== undefined) {
                rs.push(r);
            }
        }
    }

    return rs;
}


function combineRoots(r: RootInterval, s: RootInterval) {
    // case 1
    if (r.tS <= s.tS) {
        if (r.tE < s.tS) {
            return undefined;  // no overlap
        }
        return [s.tS, min(r.tE, s.tE)];
    }

    // case 2 - r.tS > s.tS
    if (s.tE < r.tS) {
        return undefined;  // no overlap
    }
    return [r.tS, min(r.tE, s.tE)];
}


export { tFromXY3 }
