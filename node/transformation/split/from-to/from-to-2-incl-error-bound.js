const abs = Math.abs;
/** error free error bounds */
const psErrorFree = [[0, 0], [0, 0], [0, 0]];
/**
 * Returns a bezier curve that starts and ends at the given `t` parameters
 * including an error bound (that needs to be multiplied by `5u`, where
 * `u === Number.EPSILON/2`).
 *
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
function fromTo2InclErrorBound(ps, tS, tE) {
    if (tS === 0) {
        if (tE === 1) {
            return { ps, _ps: psErrorFree };
        }
        return splitLeft2(ps, tE);
    }
    if (tE === 1) {
        return splitRight2(ps, tS);
    }
    return splitAtBoth2(ps, tS, tE);
}
/**
 * Returns a bezier curve that starts at the given t parameter and ends
 * at `t === 1` including an error bound (that needs to be multiplied
 * by `5u`, where `u === Number.EPSILON/2`).
 *
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param t the `t` parameter where the resultant bezier should start
 *
 * @internal
 */
function splitRight2(ps, t) {
    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2]] = ps; 
    const p0 = ps[0]; // exact
    const p1 = ps[1]; // exact
    const p2 = ps[2]; // exact
    const x0 = p0[0];
    const y0 = p0[1]; // exact
    const x1 = p1[0];
    const y1 = p1[1]; // exact
    const x2 = p2[0];
    const y2 = p2[1]; // exact
    // --------------------------------------------------------
    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a
    const tt = t * t; // <1>tt  <= <0>t<0>t   (by counter rule 2)
    const xA = x0 - x1; // <1>xA
    const xB = x2 - x1; // <1>xB
    const yA = y0 - y1;
    const yB = y2 - y1;
    const psR = [
        [tt * (xA + xB) - (2 * t * xA - x0), // xx0, split point x
            tt * (yA + yB) - (2 * t * yA - y0)], // yy0, split point y
        [t * xB + x1, // xx1
            t * yB + y1], // yy1
        [x2, // xx2
            y2] // yy2
    ];
    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _t = abs(t);
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _x2 = abs(x2);
    const _xA = _x0 + _x1;
    const _xB = _x2 + _x1;
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    const _y2 = abs(y2);
    const _yA = _y0 + _y1;
    const _yB = _y2 + _y1;
    // <5>xx0 <= <5>(<4>(<1>tt*<2>(<1>xA + <1>xB)) - <3>(<2>(2*t*<1>xA) - x0))
    const _xx0 = tt * (_xA + _xB) + (2 * _t * _xA + _x0);
    // <3>xx1 <= <3>(<2>(t*<1>xB) + x1)
    const _xx1 = _t * _xB + _x1;
    const _yy0 = tt * (_yA + _yB) + (2 * _t * _yA + _y0);
    const _yy1 = 0;
    /** the coordinate-wise error bound */
    //const psR_ = [
    //    [5*u*_xx0, 5*u*_yy0],
    //    [3*u*_xx1, 3*u*_yy1],
    //    [0, 0]
    //];
    const psR_ = [
        [_xx0, _yy0],
        [_xx1, _yy1],
        [0, 0]
    ];
    return {
        ps: psR,
        _ps: psR_
    };
}
/**
 * Returns a bezier curve that starts at `t === 0` and ends at the given `t`
 * parameter including an error bound (that needs to be multiplied by `5u`,
 * where `u === Number.EPSILON/2`).
 *
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param t the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
function splitLeft2(ps, t) {
    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2]] = ps; 
    const p0 = ps[0]; // exact 
    const p1 = ps[1]; // exact
    const p2 = ps[2]; // exact
    const x0 = p0[0];
    const y0 = p0[1]; // exact
    const x1 = p1[0];
    const y1 = p1[1]; // exact
    const x2 = p2[0];
    const y2 = p2[1]; // exact
    // --------------------------------------------------------
    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a
    const tt = t * t; // <1>tt  <= <0>t<0>t   (by counter rule 2)
    const xA = x0 - x1; // <1>xA
    const yA = y0 - y1;
    const psL = [
        [x0, // xx0
            y0], // yy0
        [-t * xA + x0, // xx1
            -t * yA + y0], // yy1
        [tt * (xA + (x2 - x1)) - (2 * t * xA - x0), // xx2 - split point x
            tt * (yA + (y2 - y1)) - (2 * t * yA - y0)] // yy2 - split point y
    ];
    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _t = abs(t);
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _x2 = abs(x2);
    const _xA = _x0 + _x1;
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    const _y2 = abs(y2);
    const _yA = _y0 + _y1;
    // <3>xx1 <= <3>(<2>(-t*<1>xA) + x0)
    const _xx1 = _t * _xA + _x0;
    // <5>xx2 <= <5>(<4>(<1>tt*<2>(<1>xA + <1>(x2 - x1))) - <3>(<2>(2*t*<1>xA) - x0))
    const _xx2 = tt * (_xA + (_x2 + _x1)) + (2 * _t * _xA + _x0);
    const _yy1 = _t * _yA + _y0;
    const _yy2 = tt * (_yA + (_y2 + _y1)) + (2 * _t * _yA + _y0);
    /** the coordinate-wise error bound */
    //const psL_ = [
    //    [0, 0],
    //    [3*u*_xx1, 3*u*_yy1],
    //    [5*u*_xx2, 5*u*_yy2],
    //];
    const psL_ = [
        [0, 0],
        [_xx1, _yy1],
        [_xx2, _yy2]
    ];
    return {
        ps: psL,
        _ps: psL_
    };
}
/**
 * Returns a bezier curve that starts and ends at the given `t` parameters
 * including an error bound (that needs to be multiplied by `5u`, where
 * `u === Number.EPSILON/2`).
 *
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
function splitAtBoth2(ps, tS, tE) {
    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2]] = ps; 
    const p0 = ps[0]; // exact
    const p1 = ps[1]; // exact
    const p2 = ps[2]; // exact
    const x0 = p0[0];
    const y0 = p0[1]; // exact
    const x1 = p1[0];
    const y1 = p1[1]; // exact
    const x2 = p2[0];
    const y2 = p2[1]; // exact
    // --------------------------------------------------------
    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a
    const ttS = tS * tS; // <1>ttS  <= <0>tS<0>tS   (by counter rule 2)
    const ttE = tE * tE; // ...
    const tStE = tS * tE; // <1>tStE
    const xA = x0 - x1; // <1>xA
    const xB = x2 - x1; // <1>xB
    const xC = xA + xB; // <2>xC
    const yA = y0 - y1;
    const yB = y2 - y1;
    const yC = yA + yB;
    const xx0 = ttS * xC - (2 * tS * xA - x0);
    const xx1 = tStE * xC - (xA * (tE + tS) - x0);
    const xx2 = ttE * xC - (2 * tE * xA - x0);
    const yy0 = ttS * yC - (2 * tS * yA - y0);
    const yy1 = tStE * yC - (yA * (tE + tS) - y0);
    const yy2 = ttE * yC - (2 * tE * yA - y0);
    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _tS = abs(tS);
    const _tE = abs(tE);
    const _tStE = abs(tStE);
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _x2 = abs(x2);
    const _xA = _x0 + _x1;
    const _xC = _xA + _x2 + _x1;
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    const _y2 = abs(y2);
    const _yA = _y0 + _y1;
    const _yC = _yA + _y2 + _y1;
    // <5>xx0 = <5>(<4>(<1>ttS*<2>xC) - <3>(<2>(2*tS*<1>xA) - x0))
    const _xx0 = ttS * _xC + (2 * _tS * _xA + _x0);
    // <5>xx1 = <5>(<4>(<1>tStE*<2>xC) - <4>((<3>(<1>xA*<1>(tE + tS)) - x0)))
    const _xx1 = _tStE * _xC + (_xA * (_tE + _tS) + _x0);
    // <5>xx2 = <5>(<4>(<1>ttE*<2>xC) - <3>(<2>(2*tE*<1>xA) - x0))
    const _xx2 = ttE * _xC + (2 * _tE * _xA + _x0);
    const _yy0 = ttS * _yC + (2 * _tS * _yA + _y0);
    const _yy1 = _tStE * yC + (_yA * (_tE + _tS) + _y0);
    const _yy2 = ttE * _yC + (2 * _tE * _yA + _y0);
    return {
        ps: [[xx0, yy0], [xx1, yy1], [xx2, yy2]],
        //ps_: [
        //    [5*u*_xx0, 5*u*_yy0],
        //    [5*u*_xx1, 5*u*_yy1],
        //    [5*u*_xx2, 5*u*_yy2]
        //]
        _ps: [
            [_xx0, _yy0],
            [_xx1, _yy1],
            [_xx2, _yy2]
        ]
    };
}
export { fromTo2InclErrorBound };
//# sourceMappingURL=from-to-2-incl-error-bound.js.map