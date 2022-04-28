const abs = Math.abs;
/** error free error bounds */
const psErrorFree = [[0, 0], [0, 0]];
/**
 * Returns a bezier curve that starts and ends at the given `t` parameters
 * including an error bound (that needs to be multiplied by `3u` before use,
 * where `u === Number.EPSILON/2`).
 *
 * @param ps a linear bezier curve (a line) given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
function fromTo1InclErrorBound(ps, tS, tE) {
    if (tS === 0) {
        if (tE === 1) {
            return { ps, _ps: psErrorFree };
        }
        return splitLeft1(ps, tE);
    }
    if (tE === 1) {
        return splitRight1(ps, tS);
    }
    return splitAtBoth1(ps, tS, tE);
}
/**
 * Returns a bezier curve that starts at the given `t` parameter and ends
 * at `t === 1` including an error bound (that needs to be multiplied
 * by `3u`, where `u === Number.EPSILON/2`).
 *
 * @param ps a lineer bezier curve (a line) given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param t the `t` parameter where the resultant bezier should start
 *
 * @internal
 */
function splitRight1(ps, t) {
    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1]] = ps; 
    const p0 = ps[0]; // exact
    const p1 = ps[1]; // exact
    const x0 = p0[0];
    const y0 = p0[1]; // exact
    const x1 = p1[0];
    const y1 = p1[1]; // exact
    // --------------------------------------------------------
    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a
    const psR = [
        [t * (x1 - x0) + x0,
            t * (y1 - y0) + y0],
        [x1,
            y1] // yy1
    ];
    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _t = abs(t);
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    // <3>xx0 <= <3>(<2>(t*<1>(x1 - x0)) + x0)
    const _xx0 = _t * (_x1 + _x0) + _x0;
    const _yy0 = _t * (_y1 + _y0) + _y0;
    /** the coordinate-wise error bound */
    //const psR_ = [
    //    [3*u*_xx0, 3*u*_yy0],
    //    [0, 0]
    //];
    const psR_ = [
        [_xx0, _yy0],
        [0, 0]
    ];
    return {
        ps: psR,
        _ps: psR_
    };
}
/**
 * Returns a bezier curve that starts at `t === 0` and ends at the given `t`
 * parameter including an error bound (that needs to be multiplied by `3u`,
 * where `u === Number.EPSILON/2`).
 *
 * @param ps a lineer bezier curve (a line) given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param t the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
function splitLeft1(ps, t) {
    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1]] = ps; 
    const p0 = ps[0]; // exact 
    const p1 = ps[1]; // exact
    const x0 = p0[0];
    const y0 = p0[1]; // exact
    const x1 = p1[0];
    const y1 = p1[1]; // exact
    // --------------------------------------------------------
    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a
    const psL = [
        [x0,
            y0],
        [t * (x1 - x0) + x0,
            t * (y1 - y0) + y0] // yy1
    ];
    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _t = abs(t);
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    // <3>xx1 <= <3>(<2>(t*<1>(x1 - x0)) + x0)
    const _xx1 = _t * (_x1 + _x0) + _x0;
    const _yy1 = _t * (_y1 + _y0) + _y0;
    /** the coordinate-wise error bound */
    //const psL_ = [
    //    [0, 0],
    //    [3*u*_xx1, 3*u*_yy1],
    //];
    const psL_ = [
        [0, 0],
        [_xx1, _yy1],
    ];
    return {
        ps: psL,
        _ps: psL_
    };
}
/**
 * Returns a bezier curve that starts and ends at the given `t` parameters
 * including an error bound (that needs to be multiplied by `3u`, where
 * `u === Number.EPSILON/2`).
 *
 * @param ps a lineer bezier curve (a line) given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
function splitAtBoth1(ps, tS, tE) {
    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1]] = ps; 
    const p0 = ps[0]; // exact
    const p1 = ps[1]; // exact
    const x0 = p0[0];
    const y0 = p0[1]; // exact
    const x1 = p1[0];
    const y1 = p1[1]; // exact
    // --------------------------------------------------------
    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a
    const psB = [
        [tS * (x1 - x0) + x0,
            tS * (y1 - y0) + y0],
        [tE * (x1 - x0) + x0,
            tE * (y1 - y0) + y0] // yy1
    ];
    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _tS = abs(tS);
    const _tE = abs(tE);
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    // <3>xx0 <= <3>(<2>(tS*<1>(x1 - x0)) + x0)
    const _xx0 = _tS * (_x1 + _x0) + _x0;
    // <3>xx1
    const _xx1 = _tE * (_x1 + _x0) + _x0;
    const _yy0 = _tS * (_y1 + _y0) + _y0;
    const _yy1 = _tE * (_y1 + _y0) + _y0;
    /** the coordinate-wise error bound */
    //const psR_ = [
    //    [3*u*_xx0, 3*u*_yy0],
    //    [0, 0]
    //];
    const psB_ = [
        [_xx0, _yy0],
        [_xx1, _yy1]
    ];
    return {
        ps: psB,
        _ps: psB_
    };
}
export { fromTo1InclErrorBound };
//# sourceMappingURL=from-to-1-incl-error-bound.js.map