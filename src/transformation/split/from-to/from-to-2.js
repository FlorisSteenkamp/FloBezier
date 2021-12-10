"use strict";
exports.__esModule = true;
exports.fromTo2 = void 0;
var eps = Number.EPSILON;
var u = eps / 2;
var abs = Math.abs;
/** error free error bounds */
var psErrorFree = [[0, 0], [0, 0], [0, 0]];
/**
 * Returns a bezier curve that starts and ends at the given `t` parameters
 * including an error bound (that needs to be multiplied by `6u`, where
 * `u === Number.EPSILON/2`).
 *
 * * precondition 1: exact tS, tE, ps
 * * precondition 2: tS, tE ∈ [0,1]
 * * precondition 3: `Number.EPSILON | tS` and `Number.EPSILON | tE`
 * * precondition 4: tE > tS
 *
 * @param ps a quadratic bezier curve
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 */
function fromTo2(ps, tS, tE) {
    if (tS === 0) {
        if (tE === 1) {
            return { ps: ps, _ps: psErrorFree };
        }
        return splitLeft2(ps, tE);
    }
    if (tE === 1) {
        return splitRight2(ps, tS);
    }
    return splitAtBoth2(ps, tS, tE);
}
exports.fromTo2 = fromTo2;
/**
 * Returns a bezier curve that starts at the given t parameter and ends
 * at `t === 1` including an error bound (that needs to be multiplied
 * by `4u`, where `u === Number.EPSILON/2`).
 *
 * * precondition 1: exact `t`, `ps`
 * * precondition 2: t ∈ [0,1)
 * * precondition 3: `Number.EPSILON | t`
 *
 * @param ps a quadratic bezier curve
 * @param t the `t` parameter where the resultant bezier should start
 */
function splitRight2(ps, t) {
    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2]] = ps; 
    var p0 = ps[0]; // exact
    var p1 = ps[1]; // exact
    var p2 = ps[2]; // exact
    var x0 = p0[0];
    var y0 = p0[1]; // exact
    var x1 = p1[0];
    var y1 = p1[1]; // exact
    var x2 = p2[0];
    var y2 = p2[1]; // exact
    // --------------------------------------------------------
    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a
    var s = 1 - t; // <0>s <= exact by precondition 3
    var tt = t * t; // <1>tt  <= <0>t<0>t   (by counter rule 2)
    var ss = s * s; // <1>ss  <= <0>s<0>s
    var ts = t * s; // <1>ts  <= <0>t<0>s
    var psR = [
        [x0 * ss + x2 * tt + 2 * x1 * ts,
            y0 * ss + y2 * tt + 2 * y1 * ts],
        [x1 * s + x2 * t,
            y1 * s + y2 * t],
        [x2,
            y2] // yy2
    ];
    // -----------------------
    // Calculate error bounds
    // -----------------------
    var _x0 = abs(x0);
    var _y0 = abs(y0);
    var _x1 = abs(x1);
    var _y1 = abs(y1);
    var _x2 = abs(x2);
    var _y2 = abs(y2);
    // <4>xx0 <= <4>(<3>(<2>(x0*<1>ss) + <2>(x2*<1>tt)) + <2>(2*x1*<1>ts))
    var _xx0 = _x0 * ss + _x2 * tt + 2 * _x1 * ts;
    // <2>xx1 <= <2>(<1>(x1*s) + <1>(x2*t))
    var _xx1 = _x1 * s + _x2 * t;
    var _yy0 = _y0 * ss + _y2 * tt + 2 * _y1 * ts;
    var _yy1 = _y1 * s + _y2 * t;
    /** the coordinate-wise error bound */
    //const psR_ = [
    //    [4*u*_xx0, 4*u*_yy0],
    //    [2*u*_xx1, 2*u*_yy1],
    //    [0, 0]
    //];
    var psR_ = [
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
 * parameter including an error bound (that needs to be multiplied by `4u`,
 * where `u === Number.EPSILON/2`).
 *
 * * precondition 1: exact `t`, `ps`
 * * precondition 2: `t ∈ (0,1]`
 * * precondition 3: `Number.EPSILON | t`
 *
 * @param ps a quadratic bezier curve
 * @param t the `t` parameter where the resultant bezier should end
 */
function splitLeft2(ps, t) {
    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2]] = ps; 
    var p0 = ps[0]; // exact 
    var p1 = ps[1]; // exact
    var p2 = ps[2]; // exact
    var x0 = p0[0];
    var y0 = p0[1]; // exact
    var x1 = p1[0];
    var y1 = p1[1]; // exact
    var x2 = p2[0];
    var y2 = p2[1]; // exact
    // --------------------------------------------------------
    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a
    var s = 1 - t; // <0>s <= exact by precondition 3
    var tt = t * t; // <1>tt  <= <0>t<0>t   (by counter rule 2)
    var ss = s * s; // <1>ss  <= <0>s<0>s
    var ts = t * s; // <1>ts  <= <0>t<0>s
    var psL = [
        [x0,
            y0],
        [x1 * t + x0 * s,
            y1 * t + y0 * s],
        [(x2 * tt + x0 * ss) + 2 * x1 * ts,
            (y2 * tt + y0 * ss) + 2 * y1 * ts] // yy2 - split point y
    ];
    // -----------------------
    // Calculate error bounds
    // -----------------------
    var _x0 = abs(x0);
    var _y0 = abs(y0);
    var _x1 = abs(x1);
    var _y1 = abs(y1);
    var _x2 = abs(x2);
    var _y2 = abs(y2);
    // <2>xx1 <= <2>(<1>(<0>x1*<0>t) + <1>(<0>x0*<0>s))
    var _xx1 = _x1 * t + _x0 * s;
    // <4>xx2 <= <4>(<3>(<2>(<0>x2*<1>tt) + <2>(<0>x0*<1>ss)) + <2>(2*<0>x1*<1>ts))
    var _xx2 = (_x2 * tt + _x0 * ss) + 2 * _x1 * ts;
    var _yy1 = _y1 * t + _y0 * s;
    var _yy2 = (_y2 * tt + _y0 * ss) + 2 * _y1 * ts;
    /** the coordinate-wise error bound */
    //const psL_ = [
    //    [0, 0],
    //    [2*u*_xx1, 2*u*_yy1],
    //    [4*u*_xx2, 4*u*_yy2],
    //];
    var psL_ = [
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
 * including an error bound (that needs to be multiplied by `6u`, where
 * `u === Number.EPSILON/2`).
 *
 * * precondition 1: exact `t`, `tE`, `ps`
 * * precondition 2: `tS, tE ∈ (0,1)`
 * * precondition 3: `Number.EPSILON | t` and `Number.EPSILON | tE`
 * * precondition 4: `t < tE`
 *
 * @param ps a quadratic bezier curve
 * @param t the t parameter where the resultant bezier should start
 * @param tE the t parameter where the resultant bezier should end
 */
function splitAtBoth2(ps, t, tE) {
    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2]] = ps; 
    var p0 = ps[0]; // exact
    var p1 = ps[1]; // exact
    var p2 = ps[2]; // exact
    var x0 = p0[0];
    var y0 = p0[1]; // exact
    var x1 = p1[0];
    var y1 = p1[1]; // exact
    var x2 = p2[0];
    var y2 = p2[1]; // exact
    // --------------------------------------------------------
    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a
    // splitRight
    var s = 1 - t; // <0>s <= exact by precondition 3
    var tt = t * t; // <1>tt  <= <0>t<0>t   (by counter rule 2)
    var ss = s * s; // <1>ss  <= <0>s<0>s
    var ts = t * s; // <1>ts  <= <0>t<0>s
    // make v the smallest float > (the true v) such that `eps | v`
    //const v = (tE - t)/s; 
    // see the function `getV` below to see why `v` is calculated this way
    var tL = ((tE - t) / s) * (1 + Number.EPSILON) + 1 - 1;
    // splitLeft
    var sL = 1 - tL; // <0>s <= exact by precondition 3 and by construction that `eps | v`
    var ttL = tL * tL; // <1>uu <= <0>u<0>u
    var ssL = sL * sL; // <1>ss  <= <0>s<0>s
    var tsL = tL * sL; // <1>us  <= <0>u<0>s
    var xa = s * x1 + t * x2;
    var xx0 = (ss * x0 + tt * x2) + 2 * ts * x1;
    var xx1 = sL * xx0 + tL * xa;
    var xx2 = ssL * xx0 + (2 * tsL * xa + ttL * x2);
    var ya = s * y1 + t * y2;
    var yy0 = (ss * y0 + tt * y2) + 2 * ts * y1;
    var yy1 = sL * yy0 + tL * ya;
    var yy2 = ssL * yy0 + (2 * tsL * ya + ttL * y2);
    // -----------------------
    // Calculate error bounds
    // -----------------------
    var _x0 = abs(x0);
    var _y0 = abs(y0);
    var _x1 = abs(x1);
    var _y1 = abs(y1);
    var _x2 = abs(x2);
    var _y2 = abs(y2);
    // <2>xa = <2>(<1>(s*x1) + <1>(t*x2))
    var _xa = s * _x1 + t * _x2;
    // <4>xx0 = <4>(<3>(<2>(ss*x0) + <2>(tt*x2)) + 2*<2>(<1>ts*<0>x1));
    var _xx0 = (ss * _x0 + tt * _x2) + 2 * ts * _x1;
    // <6>xx1 = <6>(<5>(<0>sL*<4>xx0) + <3>(<0>tL*<2>xa));
    var _xx1 = sL * _xx0 + tL * _xa;
    // <7>xx2 = <7>(<6>(<1>ssL*<4>xx0) + <6>(<5>(<4>(2*<1>tsL*<2>xa) + <2>(<1>ttL*<0>x2))));
    var _xx2 = ssL * _xx0 + (2 * tsL * _xa + ttL * _x2);
    var _ya = s * _y1 + t * _y2;
    var _yy0 = (ss * _y0 + tt * _y2) + 2 * ts * _y1;
    var _yy1 = sL * _yy0 + tL * _ya;
    var _yy2 = ssL * _yy0 + (2 * tsL * _ya + ttL * _y2);
    return {
        ps: [[xx0, yy0], [xx1, yy1], [xx2, yy2]],
        //ps_: [
        //    [4*u*_xx0, 4*u*_yy0],
        //    [6*u*_xx1, 6*u*_yy1],
        //    [7*u*_xx2, 4*u*_yy2]
        //]
        _ps: [
            [_xx0, _yy0],
            [_xx1, _yy1],
            [_xx2, _yy2]
        ]
    };
}
/**
 * Returns the smallest double (call it `v`) such that:
 * * `v > _v_ === (tE - tS)/(1 - tS)` AND
 * * such that `eps | v` (where `eps === Number.EPSILON`)
 *
 * * this function is for demonstration purposes and was inlined to save a
 * function call
 *
 * Preconditions:
 *  1. exact `tS`, `tE`
 *  2. `tS, tE ∈ (0,1)`
 *  3. `Number.EPSILON | tS` (and `Number.EPSILON | tE`)
 *  4. `tE > tS`
 *
 * @internal
 */
function getV(tS, tE) {
    //const numer = tE - tS;  // exact and > 0 due to preconditions 3 and 4
    //const denom = 1 - tS;  // exact and > 0 due to preconditions 2 and 3
    // Recall: the result of +, -, * and / is exactly rounded; that is, the 
    // result is computed exactly and then rounded to the nearest 
    // floating-point number (using round to even).
    // Therefore: it is guaranteed that `u > 0` and `u < 1`
    // The `+ 1` and then `- 1` at the end is critical in 
    // ensuring that `Number.EPSILON | u`. (this also causes `u` to be able to go to `1`)
    // e.g.:
    // `function a(a) { return (a*(1+Number.EPSILON) + 1 - 1)/Number.EPSILON; }`
    // `function b(a) { return (a*(1+Number.EPSILON)        )/Number.EPSILON; }`
    // `a(0.0000000321276211)  // 144689942`
    // `b(0.0000000321276211)  // 144689942.41426048`
    // Also the `(1 + Number.EPSILON)` part ensures that we're rounding up
    var u = ((tE - tS) / (1 - tS)) * (1 + Number.EPSILON) + 1 - 1;
}
