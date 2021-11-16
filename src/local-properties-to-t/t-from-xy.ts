import { allRootsCertified, RootInterval } from 'flo-poly';
import { getXY2Exact, getXY3Exact } from "../to-power-basis/get-xy/exact/get-xy-exact.js";
import { getXY1DdWithRunningError, getXY2DdWithRunningError, getXY3DdWithRunningError } from "../to-power-basis/get-xy/double-double/get-xy-dd-with-running-error.js";
import { twoDiff as twoDiff_ } from 'big-float-ts';


const twoDiff = twoDiff_;

const min = Math.min;


/**
 * Performs certified inversion, i.e. returns the `t` parameter value 
 * interval(s) for the given `x` and `y` coordinates on the specified bezier 
 * curve. Only `t` values in `[0,1]` are returned.
 * 
 * Returns `undefined` if the point is on the curve and the curve is a point.
 * 
 * **precondition:** `p` must be *exactly* on the curve
 * * **certified** here means no `t` value can be missed but (in rare cases)
 * an extra 1 or 2 `t`s could be returned (e.g. for self-overlapping curves
 * and when the point is exactly on the point of self-intersection of the curve)
 * 
 * @param ps
 * @param p
 */
function tFromXY(
        ps: number[][], p: number[]): RootInterval[] | undefined {

    if (ps.length === 4) {
        return tFromXY3(ps, p);
    }

    if (ps.length === 3) {
        return tFromXY2(ps, p);
    }

    if (ps.length === 2) {
        return tFromXY1(ps, p);
    }

    // TODO - add case of degenerate point
    throw new Error('The given bezier curve is invalid.');
}


// TODO docs
/**
 * Performs certified inversion, i.e. returns the `t` parameter value 
 * interval(s) for the given `x` and `y` coordinates on the specified bezier 
 * curve.
 * 
 * Returns `undefined` if the point is on the curve and the curve is a point.
 * 
 * **precondition:** `p` must be *exactly* on the curve
 * * **certified** here means no `t` value can be missed but (in rare cases)
 * an extra 1 or 2 `t`s could be returned (e.g. for self-overlapping curves
 * and when the point is exactly on the point of self-intersection of the curve)
 * 
 * @param ps
 * @param p
 */
function tFromXY3(
        ps: number[][], p: number[]): RootInterval[] | undefined {

    const x = p[0];
    const y = p[1];

    // get power basis representation in double-double precision including error
    // bound
    const {
        coeffs: [_polyDdX, _polyDdY],
        errorBound: [polyX_, polyY_]
    } = getXY3DdWithRunningError(ps);

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
    ] | undefined = undefined;

    const getPExactX = (): number[][] => { 
        if (pExactXY === undefined) { pExactXY = getXY3Exact(ps); }
        const _pExactX = pExactXY[0];  // x coordinate
        // pop the constant term off `x(t)`
        const tx = _pExactX.pop() as number;
        const pExactX = [..._pExactX, twoDiff(tx, x)] as number[][];

        return pExactX;
    }

    const getPExactY = (): number[][] => {
        if (pExactXY === undefined) { pExactXY = getXY3Exact(ps); }
        const _pExactY = pExactXY[1];  // y coordinate
        // pop the constant term off `y(t)`
        const ty = _pExactY.pop() as number;
        const pExactY = [..._pExactY, twoDiff(ty, y)] as number[][];

        return pExactY;
    }

    // max 3 roots
    const xrs = allRootsCertified(polyDdX, 0, 1, polyX_, getPExactX, true);
    // max 3 roots
    const yrs = allRootsCertified(polyDdY, 0, 1, polyY_, getPExactY, true);

    if (xrs === undefined) {
        // the `x` value of the point is on the curve for all `t` values
        // the curve must be a 'line' (can also be degenerate quadratic, etc.)
        if (yrs === undefined) {
            // the `y` value of the point is on the curve for all `t` values
            // the curve must be a point
            return undefined;
        }

        return yrs; //.map(r => [r.tS, r.tE]);
    }

    if (yrs === undefined) {
        // the `y` value of the point is on the curve for all `t` values
        // the curve must be a 'line' (can also be degenerate quadratic, etc.)        

        return xrs; //.map(r => [r.tS, r.tE]);;
    }

    // check for `t` value overlap 
    // - there can be 0 or 1 overlap (the usual case), 2 overlaps (at point of 
    // self-intersection), 3 overlaps (for self-overlapping curve (that looks 
    // like a line))

    // at this point `xrs !== undefined` and `yrs !== undefined`

    let rs: RootInterval[] = [];
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


function tFromXY2(
        ps: number[][], p: number[]): RootInterval[] | undefined {

    const x = p[0];
    const y = p[1];

    // get power basis representation in double-double precision including error
    // bound
    const {
        coeffs: [_polyDdX, _polyDdY],
        errorBound: [polyX_, polyY_]
    } = getXY2DdWithRunningError(ps);

    // pop the constant term off `x(t)`
    const txDd = _polyDdX.pop() as number;
    // subtract the x coordinate of the point
    const polyDdX = [..._polyDdX, twoDiff(txDd, x)] as number[][];

    // pop the constant term off `y(t)`
    const tyDd = _polyDdY.pop() as number;
    // subtract the y coordinate of the point
    const polyDdY = [..._polyDdY, twoDiff(tyDd, y)] as number[][];

    let pExactXY: [
        [number[], number[], number],
        [number[], number[], number]
    ] | undefined = undefined;

    const getPExactX = (): number[][] => { 
        if (pExactXY === undefined) { pExactXY = getXY2Exact(ps); }
        const _pExactX = pExactXY[0];  // x coordinate
        // pop the constant term off `x(t)`
        const tx = _pExactX.pop() as number;
        const pExactX = [..._pExactX, twoDiff(tx, x)] as number[][];

        return pExactX;
    }

    const getPExactY = (): number[][] => {
        if (pExactXY === undefined) { pExactXY = getXY2Exact(ps); }
        const _pExactY = pExactXY[1];  // y coordinate
        // pop the constant term off `y(t)`
        const ty = _pExactY.pop() as number;
        const pExactY = [..._pExactY, twoDiff(ty, y)] as number[][];

        return pExactY;
    }

    // max 2 roots
    const xrs = allRootsCertified(polyDdX, 0, 1, polyX_, getPExactX, true);
    // max 2 roots
    const yrs = allRootsCertified(polyDdY, 0, 1, polyY_, getPExactY, true);

    if (xrs === undefined) {
        // the `x` value of the point is on the curve for all `t` values
        // the curve must be a 'line'
        if (yrs === undefined) {
            // the `y` value of the point is on the curve for all `t` values
            // the curve must be a point
            return undefined;
        }

        return yrs; //.map(r => ({ tS: r.tS, tE: r.tE, multiplicity: 1 }));
    }

    if (yrs === undefined) {
        // the `y` value of the point is on the curve for all `t` values
        // the curve must be a 'line'

        return xrs; //.map(r => ({ tS: r.tS, tE: r.tE, multiplicity: 1 }));
    }

    // check for `t` value overlap 
    // - there can be 0 or 1 overlap (the usual case), 2 overlaps (for 
    // self-overlapping curve (that looks like a line))

    // at this point `xrs !== undefined` and `yrs !== undefined`

    let rs: RootInterval[] = [];
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


function tFromXY1(
        ps: number[][], 
        p: number[]): RootInterval[] | undefined {

    const x = p[0];
    const y = p[1];

    // get power basis representation in double-double precision including error
    // bound
    const [_polyDdX, _polyDdY] = getXY1DdWithRunningError(ps);

    // pop the constant term off `x(t)`
    const txDd = _polyDdX.pop() as number;
    // subtract the x coordinate of the point
    const polyExactX = [..._polyDdX, twoDiff(txDd, x)] as number[][];

    // pop the constant term off `y(t)`
    const tyDd = _polyDdY.pop() as number;
    // subtract the y coordinate of the point
    const polyExactY = [..._polyDdY, twoDiff(tyDd, y)] as number[][];

    // max 1 roots
    const xrs = allRootsCertified(polyExactX, 0, 1, undefined, undefined, true);
    // max 1 roots
    const yrs = allRootsCertified(polyExactY, 0, 1, undefined, undefined, true);

    if (xrs === undefined) {
        // the `x` value of the point is on the curve for all `t` values
        // the curve must be a vertical line
        if (yrs === undefined) {
            // the `y` value of the point is on the curve for all `t` values
            // the curve must be a point
            return undefined;
        }

        return yrs; //.map(r => ({ tS: r.tS, tE: r.tE, multiplicity: 1 }));
    }

    if (yrs === undefined) {
        // the `y` value of the point is on the curve for all `t` values
        // the curve must be horizontal line

        return xrs; //.map(r => ({ tS: r.tS, tE: r.tE, multiplicity: 1 }));
    }

    // check for `t` value overlap 
    // - there can be 0 or 1 overlap (the usual case), 2 overlaps (for 
    // self-overlapping curve (that looks like a line))

    // at this point `xrs !== undefined` and `yrs !== undefined`

    if (xrs.length === 0 || yrs.length === 0) {
        // this is actually not possible since a precondition is that the point
        // must be *exactly* on the line
        return [];
    }

    // at this point `xrs.length === 1` and `yrs.length === 1`

    const r = combineRoots(xrs[0], yrs[0]);

    if (r === undefined) { 
        // this is actually not possible since a precondition is that the point
        // must be *exactly* on the line
        return undefined; 
    }

    return [r];
}


function combineRoots(
        r: RootInterval, s: RootInterval): RootInterval | undefined {

    // case 1
    if (r.tS <= s.tS) {
        if (r.tE < s.tS) {
            return undefined;  // no overlap
        }
        return { tS: s.tS, tE: min(r.tE, s.tE), multiplicity: r.multiplicity + s.multiplicity };
    }

    // case 2 - r.tS > s.tS
    if (s.tE < r.tS) {
        return undefined;  // no overlap
    }

    return { tS: r.tS, tE: min(r.tE, s.tE), multiplicity: r.multiplicity + s.multiplicity };
}


export { tFromXY3, tFromXY2, tFromXY1, tFromXY }
