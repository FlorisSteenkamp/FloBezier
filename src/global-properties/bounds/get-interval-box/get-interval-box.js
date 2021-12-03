"use strict";
exports.__esModule = true;
exports.getIntervalBox = void 0;
var eval_de_casteljau_js_1 = require("../../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js");
var eval_de_casteljau_error_js_1 = require("../../../local-properties-at-t/t-to-xy/eval-de-casteljau-error.js");
var error_analysis_js_1 = require("../../../error-analysis/error-analysis.js");
var eps = Number.EPSILON;
var u = eps / 2;
var abs = Math.abs;
var γ1 = (0, error_analysis_js_1.γ)(1);
/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire
 * given bezier curve from t1 to t2. The returned box is given as a pair
 * of points (the box corners) in double precision, e.g. `[[1,1], [2,2]]`.
 *
 * * **precondition:** t1 < t2
 * * **precondition:** t1,t2 >= 0 && t1,t2 <= 1
  * evalDeCasteljauWithErr - can easily be relaxed)
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param ts [first, second] parameter values, e.g. [0.11, 0.12]
 *
 * @doc mdx
 */
function getIntervalBox(ps, ts) {
    if (ts[0] !== ts[1]) {
        if (ps.length === 4) {
            return getIntervalBox3(ps, ts);
        }
        if (ps.length === 3) {
            return getIntervalBox2(ps, ts);
        }
        return getIntervalBox1(ps, ts);
    }
    // ts[0] === ts[1]
    return getIntervalBoxAtT(ps, ts[0]);
}
exports.getIntervalBox = getIntervalBox;
// TODO - this is (nearly) exactly the same as the (better?) `fromTo` used in `bezier3Intersection`
/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire given
 * bezier curve from t1 to t2.
 *
 * This is achieved by calculating the error bounds of a new curve calculated
 * form t1 to t2 using a splitting algorithm and then taking its extreme
 * control points and finally finding a box that engulfs the control points
 * @internal
 *
 * @param ps
 * @param ts
 */
function getIntervalBox3(ps, ts) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    var t1 = ts[0], t2 = ts[1];
    /* from split.py (Python - Sympy)
    const t2 = (t2-t1)/(1-t1);
    const x0_ = t1**3*x3 + 3*t1**2*x2*(1 - t1) + 3*t1*x1*(1 - t1)**2 + x0*(1 - t1)**3;
    const x1_ = t2*(t1**2*x3 + 2*t1*x2*(1 - t1) + x1*(1 - t1)**2) + (1 - t2)*(t1**3*x3 +
            3*t1**2*x2*(1 - t1) + 3*t1*x1*(1 - t1)**2 + x0*(1 - t1)**3);
    const x2_ = t2**2*(t1*x3 + x2*(1 - t1)) + t2*(1 - t2)*(2*t1**2*x3 + 4*t1*x2*(1 - t1) + 2*x1*(1 - t1)**2) +
        (1 - t2)**2*(t1**3*x3 + 3*t1**2*x2*(1 - t1) + 3*t1*x1*(1 - t1)**2 + x0*(1 - t1)**3);
    const x3_ = t2**3*x3 + t2**2*(1 - t2)*(3*t1*x3 + 3*x2*(1 - t1)) + t2*(1 - t2)**2*(3*t1**2*x3 +
            6*t1*x2*(1 - t1) + 3*x1*(1 - t1)**2) + (1 - t2)**3*(t1**3*x3 + 3*t1**2*x2*(1 - t1) +
            3*t1*x1*(1 - t1)**2 + x0*(1 - t1)**3);

    const y0_ = t1**3*y3 + 3*t1**2*y2*(1 - t1) + 3*t1*y1*(1 - t1)**2 + y0*(1 - t1)**3;
    const y1_ = t2*(t1**2*y3 + 2*t1*y2*(1 - t1) + y1*(1 - t1)**2) + (1 - t2)*(t1**3*y3 +
            3*t1**2*y2*(1 - t1) + 3*t1*y1*(1 - t1)**2 + y0*(1 - t1)**3);
    const y2_ = t2**2*(t1*y3 + y2*(1 - t1)) + t2*(1 - t2)*(2*t1**2*y3 + 4*t1*y2*(1 - t1) + 2*y1*(1 - t1)**2) +
        (1 - t2)**2*(t1**3*y3 + 3*t1**2*y2*(1 - t1) + 3*t1*y1*(1 - t1)**2 + y0*(1 - t1)**3);
    const y3_ = t2**3*y3 + t2**2*(1 - t2)*(3*t1*y3 + 3*y2*(1 - t1)) + t2*(1 - t2)**2*(3*t1**2*y3 +
            6*t1*y2*(1 - t1) + 3*y1*(1 - t1)**2) + (1 - t2)**3*(t1**3*y3 + 3*t1**2*y2*(1 - t1) +
            3*t1*y1*(1 - t1)**2 + y0*(1 - t1)**3);
    */
    t2 = ((t2 - t1) / (1 - t1)) * (1 + eps); // <= fl(t2) > t2
    var s1 = (1 - t1); // <1>s1
    var tt1 = t1 * t1; // <1>tt1  <- error by counters
    var ts1 = t1 * s1; // <2>(<0>t1<1>s1)
    var ss1 = s1 * s1; // <3>(<1>s1<1>s1)
    var ttt1 = tt1 * t1; // <2>(<1>tt1<0>t1)
    var tts1 = tt1 * s1; // <3>(<1>tt1<1>s1)
    var tss1 = ss1 * t1; // <4>(<3>ss1<0>t1)
    var sss1 = ss1 * s1; // <5>(<3>ss1<1>s1)
    var s2 = (1 - t2); // <1>s2 <= relative error bounded by u*(1 - t2)
    var tt2 = t2 * t2; // <1>tt2
    var ts2 = t2 * s2; // <2>(<0>t2<1>s2)
    var ss2 = s2 * s2; // <3>(<1>s2<1>s2)
    var ttt2 = tt2 * t2; // <2>(<1>tt2<0>t2)
    var tts2 = tt2 * s2; // <3>(<1>tt2<1>s2)
    var tss2 = ss2 * t2; // <4>(<3>ss2<0>t2)
    var sss2 = ss2 * s2; // <5>(<3>ss2<1>s2)
    // all of t1,s1,ts1,... are all positive so simpler to use a relative error
    // bound (using e.g. counters <k>):
    // counter rules:
    //   <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   <k>a<l>b = <k + l + 1>ab
    //   fl(a) === <1>a
    var _x0 = abs(x0);
    var _y0 = abs(y0);
    var _x1 = abs(x1);
    var _y1 = abs(y1);
    var _x2 = abs(x2);
    var _y2 = abs(y2);
    var _x3 = abs(x3);
    var _y3 = abs(y3);
    //---- x - calculation
    var q8 = x3 * t1 + x2 * s1;
    var q7 = (x3 * tt1 + 2 * x2 * ts1) + x1 * ss1;
    x0 = (x3 * ttt1 + x0 * sss1) + 3 * (x2 * tts1 + x1 * tss1);
    x1 = q7 * t2 + x0 * s2;
    x2 = (q8 * tt2 + x0 * ss2) + 2 * q7 * ts2;
    x3 = (x3 * ttt2 + x0 * sss2) + 3 * (q8 * tts2 + q7 * tss2);
    //---- error / abs value calculation
    var _q8 = _x3 * t1 + _x2 * s1; // <= <3>
    // q8: <3>(<1>(x3*t1) + <2>(x2*<1>s1))
    var _q7 = _x3 * tt1 + 2 * _x2 * ts1 + _x1 * ss1; // <= <5> 
    // q7: <5>(<4>(<2>(x3*<1>tt1) + <3>(2*x2*<2>ts1)) + <4>(x1*<3>ss1));
    _x0 = (_x3 * ttt1 + _x0 * sss1) + 3 * (_x2 * tts1 + _x1 * tss1); // <= <8>
    // x0: <8>(<7>(x3*<2>ttt1 + x0*<5>sss1) + <7>(3*<6>(<4>(x2*<3>tts1) + <5>(x1*<4>tss1))));
    _x1 = _q7 * t2 + _x0 * s2; // <= <7>
    // x1: <11>(<6>(<5>q7*t2) + <10>(<8>x0*<1>s2));
    _x2 = _q8 * tt2 + _x0 * ss2 + 2 * _q7 * ts2; // <= <9>
    // x2: <14>(<13>(<5>(<3>q8*<1>tt2) + <12>(<8>x0*<3>ss2)) + <8>(2*<5>q7*<2>ts2));
    _x3 = _x3 * ttt2 + _x0 * sss2 + 3 * (_q8 * tts2 + _q7 * tss2); // <= <13>
    // x3: <16>(<15>(<3>(x3*<2>ttt2) + <14>(<8>x0*<5>sss2)) + <12>(3*<11>(<7>(<3>q8*<3>tts2 + <10>(<5>q7*<4>tss2)))));
    // max errors: 
    _x0 = 8 * u * _x0;
    _x1 = 11 * u * _x1;
    _x2 = 14 * u * _x2;
    _x3 = 16 * u * _x3;
    //---- y - calculation
    var r8 = y3 * t1 + y2 * s1;
    var r7 = (y3 * tt1 + 2 * y2 * ts1) + y1 * ss1;
    y0 = (y3 * ttt1 + y0 * sss1) + 3 * (y2 * tts1 + y1 * tss1);
    y1 = r7 * t2 + y0 * s2;
    y2 = (r8 * tt2 + y0 * ss2) + 2 * r7 * ts2;
    y3 = (y3 * ttt2 + y0 * sss2) + 3 * (r8 * tts2 + r7 * tss2);
    var _r8 = _y3 * t1 + _y2 * s1;
    var _r7 = _y3 * tt1 + 2 * _y2 * ts1 + _y1 * ss1;
    _y0 = _y3 * ttt1 + _y0 * sss1 + 3 * (_y2 * tts1 + _y1 * tss1);
    _y1 = _r7 * t2 + _y0 * s2;
    _y2 = _r8 * tt2 + _y0 * ss2 + 2 * _r7 * ts2;
    _y3 = (_y3 * ttt2 + _y0 * sss2) + 3 * (_r8 * tts2 + _r7 * tss2);
    // max errors: 
    _y0 = 8 * u * _y0;
    _y1 = 11 * u * _y1;
    _y2 = 14 * u * _y2;
    _y3 = 16 * u * _y3;
    var minX = Math.min(x0 - _x0, x1 - _x1, x2 - _x2, x3 - _x3);
    var maxX = Math.max(x0 + _x0, x1 + _x1, x2 + _x2, x3 + _x3);
    var minY = Math.min(y0 - _y0, y1 - _y1, y2 - _y2, y3 - _y3);
    var maxY = Math.max(y0 + _y0, y1 + _y1, y2 + _y2, y3 + _y3);
    return [[minX, minY], [maxX, maxY]];
}
/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire given
 * bezier curve from t1 to t2.
 *
 * This is achievied by calculating the error bounds of a new curve calculated
 * form t1 to t2 using a splitting algorithm and then taking its extreme
 * control points and finally finding a box that engulfs the control points
 *
 * @param param0
 * @param param1
 *
 * @internal
 */
function getIntervalBox2(_a, _b) {
    /* from split.py (Python - Sympy)
    const t2 = (t2-t1)/(1-t1);

    const x0_ = t1**2*x2 + 2*t1*x1*(1 - t1) + x0*(1 - t1)**2;
    const x1_ = t2*(t1*x2 + x1*(1 - t1)) + (1 - t2)*(t1**2*x2 + 2*t1*x1*(1 - t1) + x0*(1 - t1)**2);
    const x2_ = t2**2*x2 + t2*(1 - t2)*(2*t1*x2 + 2*x1*(1 - t1)) + (1 - t2)**2*(t1**2*x2 + 2*t1*x1*(1 - t1) + x0*(1 - t1)**2);

    const y0_ = t1**2*y2 + 2*t1*y1*(1 - t1) + y0*(1 - t1)**2;
    const y1_ = t2*(t1*y2 + y1*(1 - t1)) + (1 - t2)*(t1**2*y2 + 2*t1*y1*(1 - t1) + y0*(1 - t1)**2);
    const y2_ = t2**2*y2 + t2*(1 - t2)*(2*t1*y2 + 2*y1*(1 - t1)) + (1 - t2)**2*(t1**2*y2 + 2*t1*y1*(1 - t1) + y0*(1 - t1)**2);
    */
    var _c = _a[0], x0 = _c[0], y0 = _c[1], _d = _a[1], x1 = _d[0], y1 = _d[1], _e = _a[2], x2 = _e[0], y2 = _e[1];
    var t1 = _b[0], t2 = _b[1];
    t2 = ((t2 - t1) / (1 - t1)) * (1 + eps); // <= fl(t2) > t2
    var s1 = (1 - t1); // <1>s1
    var tt1 = t1 * t1; // <1>tt1  <- error by counters
    var ts1 = t1 * s1; // <2>(<0>t1<1>s1)
    var ss1 = s1 * s1; // <3>(<1>s1<1>s1)
    var s2 = (1 - t2); // <1>s2 <= relative error bounded by u*(1 - t2)
    var tt2 = t2 * t2; // <1>tt2
    var ts2 = t2 * s2; // <2>(<0>t2<1>s2)
    var ss2 = s2 * s2; // <3>(<1>s2<1>s2)
    // all of t1,s1,ts1,... are all positive so simpler to use a relative error
    // bound (using e.g. counters <k>):
    // counter rules:
    //   <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   <k>a<l>b = <k + l + 1>ab
    //   fl(a) === <1>a
    var _x0 = abs(x0);
    var _y0 = abs(y0);
    var _x1 = abs(x1);
    var _y1 = abs(y1);
    var _x2 = abs(x2);
    var _y2 = abs(y2);
    //---- x - calculation
    var q1 = (x2 * tt1 + 2 * x1 * ts1) + x0 * ss1;
    var q2 = x2 * t1 + x1 * s1;
    x0 = q1;
    x1 = t2 * q2 + s2 * q1;
    x2 = (tt2 * x2 + 2 * ts2 * q2) + ss2 * q1;
    var _q1 = _x2 * tt1 + 2 * _x1 * ts1 + _x0 * ss1; // <= <5>
    // q1: <5>(<4>(<2>(x2*<1>tt1) + <3>(2*x1*<2>ts1)) + <4>(x0*<3>ss1));
    var _q2 = _x2 * t1 + _x1 * s1; // <= <3>
    // q2: <3>(<1>(x2*t1) + <2>(x1*<1>s1));
    _x0 = _q1; // <= <5>
    // x0: <5>q1;
    _x1 = t2 * _q2 + s2 * _q1; // <= <8>
    // x1: <8>(<4>(t2*<3>q2) + <7>(<1>s2*<5>q1));
    _x2 = (tt2 * x2 + 2 * ts2 * _q2) + ss2 * _q1; // <= <10>
    // x2: <10>(<9>(<2>(<1>tt2*x2) + <6>(2*<2>ts2*<3>q2)) + <9>(<3>ss2*<5>q1));
    // max errors: 
    _x0 = 5 * u * _x0;
    _x1 = 8 * u * _x1;
    _x2 = 10 * u * _x2;
    //---- y - calculation
    var r1 = (y2 * tt1 + 2 * y1 * ts1) + y0 * ss1;
    var r2 = y2 * t1 + y1 * s1;
    y0 = r1;
    y1 = t2 * r2 + s2 * r1;
    y2 = (tt2 * y2 + 2 * ts2 * r2) + ss2 * r1;
    var _r1 = _y2 * tt1 + 2 * _y1 * ts1 + _y0 * ss1; // <= <5>
    var _r2 = _y2 * t1 + _y1 * s1; // <= <3>
    _y0 = _r1; // <= <5>
    _y1 = t2 * _r2 + s2 * _r1; // <= <8>
    _y2 = (tt2 * y2 + 2 * ts2 * _r2) + ss2 * _r1; // <= <10>
    // max errors: 
    _y0 = 5 * u * _y0;
    _y1 = 8 * u * _y1;
    _y2 = 10 * u * _y2;
    var minX = Math.min(x0 - _x0, x1 - _x1, x2 - _x2);
    var maxX = Math.max(x0 + _x0, x1 + _x1, x2 + _x2);
    var minY = Math.min(y0 - _y0, y1 - _y1, y2 - _y2);
    var maxY = Math.max(y0 + _y0, y1 + _y1, y2 + _y2);
    return [[minX, minY], [maxX, maxY]];
}
/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire given
 * bezier curve from t1 to t2.
 *
 * This is achievied by calculating the error bounds of a new curve calculated
 * form t1 to t2 using a splitting algorithm and then taking its extreme
 * control points and finally finding a box that engulfs the control points
 *
 * @param param0
 * @param param1
 *
 * @internal
 */
function getIntervalBox1(_a, _b) {
    // Implementation for lines kept for symmetry - there are obviously much
    // simpler ways to calculate the required box in the case of a line.
    var _c = _a[0], x0 = _c[0], y0 = _c[1], _d = _a[1], x1 = _d[0], y1 = _d[1];
    var t1 = _b[0], t2 = _b[1];
    /* from split.py (Python - Sympy)
    const t2 = (t2-t1)/(1-t1);

    const x0_ = t1*x1 + x0*(1 - t1)
    const x1_ = t2*x1 + (1 - t2)*(t1*x1 + x0*(1 - t1))

    const y0_ = t1*y1 + y0*(1 - t1)
    const y1_ = t2*y1 + (1 - t2)*(t1*y1 + y0*(1 - t1))
    */
    t2 = ((t2 - t1) / (1 - t1)) * (1 + eps); // <= fl(t2) > t2
    var s1 = (1 - t1); // <1>s1
    var s2 = (1 - t2); // <1>s2 <= relative error bounded by u*(1 - t2)
    // use a relative error bound (using e.g. counters <k>):
    // counter rules:
    //   <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   <k>a<l>b = <k + l + 1>ab
    //   fl(a) === <1>a
    var _x0 = abs(x0);
    var _y0 = abs(y0);
    var _x1 = abs(x1);
    var _y1 = abs(y1);
    //---- x - calculation
    x0 = x1 * t1 + x0 * s1;
    x1 = x1 * t2 + x0 * s2;
    _x0 = _x1 * t1 + _x0 * s1; // <= <3>
    // x0: <3>(<1>(x1*t1) + <2>(x0*s1));
    _x1 = _x1 * t2 + _x0 * s2; // <= <3>
    // x1: <6>(<1>(x1*t2) + <5>(<3>x0*<1>s2));
    // max errors: 
    _x0 = 3 * u * _x0;
    _x1 = 6 * u * _x1;
    //---- y - calculation
    y0 = y1 * t1 + y0 * s1;
    y1 = y1 * t2 + y0 * s2;
    _y0 = _y1 * t1 + _y0 * s1; // <= <3>
    _y1 = _y1 * t2 + _y0 * s2; // <= <6>
    // max errors: 
    _y0 = 3 * u * _y0;
    _y1 = 6 * u * _y1;
    var minX = Math.min(x0 - _x0, x1 - _x1);
    var maxX = Math.max(x0 + _x0, x1 + _x1);
    var minY = Math.min(y0 - _y0, y1 - _y1);
    var maxY = Math.max(y0 + _y0, y1 + _y1);
    return [[minX, minY], [maxX, maxY]];
}
/**
 * @param ps
 * @param t
 *
 * @internal
 */
function getIntervalBoxAtT(ps, t) {
    var _pS = ps[0];
    var _pE = ps[ps.length - 1];
    if (t === 0) {
        return [_pS, _pS];
    }
    else if (t === 1) {
        return [_pE, _pE];
    }
    var p = (0, eval_de_casteljau_js_1.evalDeCasteljau)(ps, t);
    var pE;
    if (ps.length === 4) {
        pE = (0, eval_de_casteljau_error_js_1.evalDeCasteljauError)(ps, [0, t]).map(function (c_) { return 8 * γ1 * c_; });
    }
    else if (ps.length === 3) {
        pE = (0, eval_de_casteljau_error_js_1.evalDeCasteljauError)(ps, [0, t]).map(function (c_) { return 5 * γ1 * c_; });
    }
    else if (ps.length === 2) {
        pE = (0, eval_de_casteljau_error_js_1.evalDeCasteljauError)(ps, [0, t]).map(function (c_) { return 2 * γ1 * c_; });
    }
    else if (ps.length === 1) {
        pE = [0, 0];
    }
    else {
        throw new Error('The given bezier curve is invalid.');
    }
    return [
        [p[0] - pE[0], p[1] - pE[1]],
        [p[0] + pE[0], p[1] + pE[1]]
    ];
}