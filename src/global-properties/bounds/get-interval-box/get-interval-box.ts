import { evalDeCasteljauWithErr } from "../../../local-properties-at-t/t-to-xy/eval-de-casteljau-with-err";


const eps = Number.EPSILON;
const u = eps/2;
const abs = Math.abs;


/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire 
 * given bezier curve from t1 to t2. The returned box is given as an array 
 * of points in double precision, e.g. `[[[1],[1]], [[2],[2]]]`.
 * 
 * * **precondition:** t1 < t2
 * * **precondition:** t1,t2 >= 0 && t1,t2 <= 1
 * * **precondition:** 49-bit aligned coordinates (inherited from 
 * evalDeCasteljauWithErr - can easily be relaxed)
 * 
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control 
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param ts [first, second] parameter values, e.g. [0.11, 0.12]
 * 
 * @doc mdx
 */
function getIntervalBox(
        ps: number[][], 
        ts: number[]): number[][] {

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
function getIntervalBox3(
        ps: number[][], 
        ts: number[]): number[][] {

    let [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;
    let [t1, t2] = ts;

    /* from split.py (Python - Sympy)
    let t2 = (t2-t1)/(1-t1);
    let x0_ = t1**3*x3 + 3*t1**2*x2*(1 - t1) + 3*t1*x1*(1 - t1)**2 + x0*(1 - t1)**3;
    let x1_ = t2*(t1**2*x3 + 2*t1*x2*(1 - t1) + x1*(1 - t1)**2) + (1 - t2)*(t1**3*x3 + 
            3*t1**2*x2*(1 - t1) + 3*t1*x1*(1 - t1)**2 + x0*(1 - t1)**3);
    let x2_ = t2**2*(t1*x3 + x2*(1 - t1)) + t2*(1 - t2)*(2*t1**2*x3 + 4*t1*x2*(1 - t1) + 2*x1*(1 - t1)**2) + 
        (1 - t2)**2*(t1**3*x3 + 3*t1**2*x2*(1 - t1) + 3*t1*x1*(1 - t1)**2 + x0*(1 - t1)**3);
    let x3_ = t2**3*x3 + t2**2*(1 - t2)*(3*t1*x3 + 3*x2*(1 - t1)) + t2*(1 - t2)**2*(3*t1**2*x3 + 
            6*t1*x2*(1 - t1) + 3*x1*(1 - t1)**2) + (1 - t2)**3*(t1**3*x3 + 3*t1**2*x2*(1 - t1) + 
            3*t1*x1*(1 - t1)**2 + x0*(1 - t1)**3);

    let y0_ = t1**3*y3 + 3*t1**2*y2*(1 - t1) + 3*t1*y1*(1 - t1)**2 + y0*(1 - t1)**3;
    let y1_ = t2*(t1**2*y3 + 2*t1*y2*(1 - t1) + y1*(1 - t1)**2) + (1 - t2)*(t1**3*y3 + 
            3*t1**2*y2*(1 - t1) + 3*t1*y1*(1 - t1)**2 + y0*(1 - t1)**3);
    let y2_ = t2**2*(t1*y3 + y2*(1 - t1)) + t2*(1 - t2)*(2*t1**2*y3 + 4*t1*y2*(1 - t1) + 2*y1*(1 - t1)**2) + 
        (1 - t2)**2*(t1**3*y3 + 3*t1**2*y2*(1 - t1) + 3*t1*y1*(1 - t1)**2 + y0*(1 - t1)**3);
    let y3_ = t2**3*y3 + t2**2*(1 - t2)*(3*t1*y3 + 3*y2*(1 - t1)) + t2*(1 - t2)**2*(3*t1**2*y3 + 
            6*t1*y2*(1 - t1) + 3*y1*(1 - t1)**2) + (1 - t2)**3*(t1**3*y3 + 3*t1**2*y2*(1 - t1) + 
            3*t1*y1*(1 - t1)**2 + y0*(1 - t1)**3);            
    */


    t2 = ((t2-t1) / (1-t1)) * (1 + eps); // <= fl(t2) > t2

    let s1 = (1 - t1);  // <1>s1
    let tt1 = t1*t1;    // <1>tt1  <- error by counters
    let ts1 = t1*s1;    // <2>(<0>t1<1>s1)
    let ss1 = s1*s1;    // <3>(<1>s1<1>s1)
    let ttt1 = tt1*t1;  // <2>(<1>tt1<0>t1)
    let tts1 = tt1*s1;  // <3>(<1>tt1<1>s1)
    let tss1 = ss1*t1;  // <4>(<3>ss1<0>t1)
    let sss1 = ss1*s1;  // <5>(<3>ss1<1>s1)

    let s2 = (1 - t2);  // <1>s2 <= relative error bounded by u*(1 - t2)
    let tt2 = t2*t2;    // <1>tt2
    let ts2 = t2*s2;    // <2>(<0>t2<1>s2)
    let ss2 = s2*s2;    // <3>(<1>s2<1>s2)
    let ttt2 = tt2*t2;  // <2>(<1>tt2<0>t2)
    let tts2 = tt2*s2;  // <3>(<1>tt2<1>s2)
    let tss2 = ss2*t2;  // <4>(<3>ss2<0>t2)
    let sss2 = ss2*s2;  // <5>(<3>ss2<1>s2)

    // all of t1,s1,ts1,... are all positive so simpler to use a relative error
    // bound (using e.g. counters <k>):
    // counter rules:
    //   <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   <k>a<l>b = <k + l + 1>ab
    //   fl(a) === <1>a
    let _x0 = abs(x0);
    let _y0 = abs(y0);
    let _x1 = abs(x1);
    let _y1 = abs(y1);
    let _x2 = abs(x2);
    let _y2 = abs(y2);
    let _x3 = abs(x3);
    let _y3 = abs(y3);

    //---- x - calculation
    let q8 = x3*t1 + x2*s1;  
    let q7 = (x3*tt1 + 2*x2*ts1) + x1*ss1; 
    x0 = (x3*ttt1 + x0*sss1) + 3*(x2*tts1 + x1*tss1);
    x1 = q7*t2 + x0*s2;
    x2 = (q8*tt2 + x0*ss2) + 2*q7*ts2;
    x3 = (x3*ttt2 + x0*sss2) + 3*(q8*tts2 + q7*tss2);

    //---- error / abs value calculation
    let _q8 = _x3*t1 + _x2* s1;  // <= <3>
    // q8: <3>(<1>(x3*t1) + <2>(x2*<1>s1))
    let _q7 = _x3*tt1 + 2*_x2*ts1 + _x1*ss1;  // <= <5> 
    // q7: <5>(<4>(<2>(x3*<1>tt1) + <3>(2*x2*<2>ts1)) + <4>(x1*<3>ss1));
    _x0 = (_x3*ttt1 + _x0*sss1) + 3*(_x2*tts1 + _x1*tss1);  // <= <8>
    // x0: <8>(<7>(x3*<2>ttt1 + x0*<5>sss1) + <7>(3*<6>(<4>(x2*<3>tts1) + <5>(x1*<4>tss1))));
    _x1 = _q7*t2 + _x0*s2;  // <= <7>
    // x1: <11>(<6>(<5>q7*t2) + <10>(<8>x0*<1>s2));
    _x2 = _q8*tt2 + _x0*ss2 + 2*_q7*ts2;  // <= <9>
    // x2: <14>(<13>(<5>(<3>q8*<1>tt2) + <12>(<8>x0*<3>ss2)) + <8>(2*<5>q7*<2>ts2));
    _x3 = _x3*ttt2 + _x0*sss2 + 3*(_q8*tts2 + _q7*tss2);  // <= <13>
    // x3: <16>(<15>(<3>(x3*<2>ttt2) + <14>(<8>x0*<5>sss2)) + <12>(3*<11>(<7>(<3>q8*<3>tts2 + <10>(<5>q7*<4>tss2)))));

    // max errors: 
    _x0 = 8*  u*_x0;
    _x1 = 11* u*_x1;
    _x2 = 14* u*_x2;
    _x3 = 16* u*_x3;

    //---- y - calculation
    let r8 = y3*t1 + y2*s1;
    let r7 = (y3*tt1 + 2*y2*ts1) + y1*ss1; 
    y0 = (y3*ttt1 + y0*sss1) + 3*(y2*tts1 + y1*tss1);
    y1 = r7*t2 + y0*s2;
    y2 = (r8*tt2 + y0*ss2) + 2*r7*ts2;
    y3 = (y3*ttt2 + y0*sss2) + 3*(r8*tts2 + r7*tss2);

    let _r8 = _y3*t1 + _y2* s1;
    let _r7 = _y3*tt1 + 2*_y2*ts1 + _y1*ss1; 
    _y0 = _y3*ttt1 + _y0*sss1 + 3*(_y2*tts1 + _y1*tss1);
    _y1 = _r7*t2 + _y0*s2;
    _y2 = _r8*tt2 + _y0*ss2 + 2*_r7*ts2;
    _y3 = (_y3*ttt2 + _y0*sss2) + 3*(_r8*tts2 + _r7*tss2);


    // max errors: 
    _y0 = 8*  u*_y0;
    _y1 = 11* u*_y1;
    _y2 = 14* u*_y2;
    _y3 = 16* u*_y3;

    let minX = Math.min(x0 - _x0, x1 - _x1, x2 - _x2, x3 - _x3);
    let maxX = Math.max(x0 + _x0, x1 + _x1, x2 + _x2, x3 + _x3);
    let minY = Math.min(y0 - _y0, y1 - _y1, y2 - _y2, y3 - _y3);
    let maxY = Math.max(y0 + _y0, y1 + _y1, y2 + _y2, y3 + _y3);

    return [[minX,minY],[maxX,maxY]];
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
function getIntervalBox2(
        [[x0,y0],[x1,y1],[x2,y2]]: number[][], 
        [t1, t2]: number[]) {

    /* from split.py (Python - Sympy)
    let t2 = (t2-t1)/(1-t1);

    let x0_ = t1**2*x2 + 2*t1*x1*(1 - t1) + x0*(1 - t1)**2;
    let x1_ = t2*(t1*x2 + x1*(1 - t1)) + (1 - t2)*(t1**2*x2 + 2*t1*x1*(1 - t1) + x0*(1 - t1)**2);
    let x2_ = t2**2*x2 + t2*(1 - t2)*(2*t1*x2 + 2*x1*(1 - t1)) + (1 - t2)**2*(t1**2*x2 + 2*t1*x1*(1 - t1) + x0*(1 - t1)**2);

    let y0_ = t1**2*y2 + 2*t1*y1*(1 - t1) + y0*(1 - t1)**2;
    let y1_ = t2*(t1*y2 + y1*(1 - t1)) + (1 - t2)*(t1**2*y2 + 2*t1*y1*(1 - t1) + y0*(1 - t1)**2);
    let y2_ = t2**2*y2 + t2*(1 - t2)*(2*t1*y2 + 2*y1*(1 - t1)) + (1 - t2)**2*(t1**2*y2 + 2*t1*y1*(1 - t1) + y0*(1 - t1)**2);
    */


    t2 = ((t2-t1) / (1-t1)) * (1 + eps); // <= fl(t2) > t2

    let s1 = (1 - t1);  // <1>s1
    let tt1 = t1*t1;    // <1>tt1  <- error by counters
    let ts1 = t1*s1;    // <2>(<0>t1<1>s1)
    let ss1 = s1*s1;    // <3>(<1>s1<1>s1)

    let s2 = (1 - t2);  // <1>s2 <= relative error bounded by u*(1 - t2)
    let tt2 = t2*t2;    // <1>tt2
    let ts2 = t2*s2;    // <2>(<0>t2<1>s2)
    let ss2 = s2*s2;    // <3>(<1>s2<1>s2)


    // all of t1,s1,ts1,... are all positive so simpler to use a relative error
    // bound (using e.g. counters <k>):
    // counter rules:
    //   <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   <k>a<l>b = <k + l + 1>ab
    //   fl(a) === <1>a
    let _x0 = abs(x0);
    let _y0 = abs(y0);
    let _x1 = abs(x1);
    let _y1 = abs(y1);
    let _x2 = abs(x2);
    let _y2 = abs(y2);


    //---- x - calculation
    let q1 = (x2*tt1 + 2*x1*ts1) + x0*ss1;
    let q2 = x2*t1 + x1*s1;
    x0 = q1;
    x1 = t2*q2 + s2*q1;
    x2 = (tt2*x2 + 2*ts2*q2) + ss2*q1;

    let _q1 = _x2*tt1 + 2*_x1*ts1 + _x0*ss1;  // <= <5>
    // q1: <5>(<4>(<2>(x2*<1>tt1) + <3>(2*x1*<2>ts1)) + <4>(x0*<3>ss1));
    let _q2 = _x2*t1 + _x1*s1;  // <= <3>
    // q2: <3>(<1>(x2*t1) + <2>(x1*<1>s1));
    _x0 = _q1;  // <= <5>
    // x0: <5>q1;
    _x1 = t2*_q2 + s2*_q1;  // <= <8>
    // x1: <8>(<4>(t2*<3>q2) + <7>(<1>s2*<5>q1));
    _x2 = (tt2*x2 + 2*ts2*_q2) + ss2*_q1;  // <= <10>
    // x2: <10>(<9>(<2>(<1>tt2*x2) + <6>(2*<2>ts2*<3>q2)) + <9>(<3>ss2*<5>q1));

    // max errors: 
    _x0 = 5* u*_x0;
    _x1 = 8* u*_x1;
    _x2 = 10*u*_x2;


    //---- y - calculation
    let r1 = (y2*tt1 + 2*y1*ts1) + y0*ss1;
    let r2 = y2*t1 + y1*s1;
    y0 = r1;
    y1 = t2*r2 + s2*r1;
    y2 = (tt2*y2 + 2*ts2*r2) + ss2*r1;

    let _r1 = _y2*tt1 + 2*_y1*ts1 + _y0*ss1;  // <= <5>
    let _r2 = _y2*t1 + _y1*s1;  // <= <3>
    _y0 = _r1;  // <= <5>
    _y1 = t2*_r2 + s2*_r1;  // <= <8>
    _y2 = (tt2*y2 + 2*ts2*_r2) + ss2*_r1;  // <= <10>


    // max errors: 
    _y0 = 5* u*_y0;
    _y1 = 8* u*_y1;
    _y2 = 10*u*_y2;


    let minX = Math.min(x0 - _x0, x1 - _x1, x2 - _x2);
    let maxX = Math.max(x0 + _x0, x1 + _x1, x2 + _x2);
    let minY = Math.min(y0 - _y0, y1 - _y1, y2 - _y2);
    let maxY = Math.max(y0 + _y0, y1 + _y1, y2 + _y2);

    return [[minX,minY],[maxX,maxY]];
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
function getIntervalBox1(
        [[x0,y0],[x1,y1]]: number[][], 
        [t1, t2]: number[]) {

    // Implementation for lines kept for symmetry - there are obviously much
    // simpler ways to calculate the required box in the case of a line.

    /* from split.py (Python - Sympy) 
    let t2 = (t2-t1)/(1-t1);

    let x0_ = t1*x1 + x0*(1 - t1)
    let x1_ = t2*x1 + (1 - t2)*(t1*x1 + x0*(1 - t1))

    let y0_ = t1*y1 + y0*(1 - t1)
    let y1_ = t2*y1 + (1 - t2)*(t1*y1 + y0*(1 - t1))
    */


    t2 = ((t2-t1) / (1-t1)) * (1 + eps); // <= fl(t2) > t2

    let s1 = (1 - t1);  // <1>s1
    let s2 = (1 - t2);  // <1>s2 <= relative error bounded by u*(1 - t2)


    // use a relative error bound (using e.g. counters <k>):
    // counter rules:
    //   <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   <k>a<l>b = <k + l + 1>ab
    //   fl(a) === <1>a
    let _x0 = abs(x0);
    let _y0 = abs(y0);
    let _x1 = abs(x1);
    let _y1 = abs(y1);


    //---- x - calculation
    x0 = x1*t1 + x0*s1;
    x1 = x1*t2 + x0*s2;

    _x0 = _x1*t1 + _x0*s1;  // <= <3>
    // x0: <3>(<1>(x1*t1) + <2>(x0*s1));
    _x1 = _x1*t2 + _x0*s2;  // <= <3>
    // x1: <6>(<1>(x1*t2) + <5>(<3>x0*<1>s2));

    // max errors: 
    _x0 = 3*u*_x0;
    _x1 = 6*u*_x1;


    //---- y - calculation

    y0 = y1*t1 + y0*s1;
    y1 = y1*t2 + y0*s2;

    _y0 = _y1*t1 + _y0*s1;  // <= <3>
    _y1 = _y1*t2 + _y0*s2;  // <= <6>

    // max errors: 
    _y0 = 3*u*_y0;
    _y1 = 6*u*_y1;


    let minX = Math.min(x0 - _x0, x1 - _x1);
    let maxX = Math.max(x0 + _x0, x1 + _x1);
    let minY = Math.min(y0 - _y0, y1 - _y1);
    let maxY = Math.max(y0 + _y0, y1 + _y1);

    return [[minX,minY],[maxX,maxY]];
}


/**
 * @param ps 
 * @param t 
 * 
 * @internal
 */
function getIntervalBoxAtT(
        ps: number[][], 
        t: number): number[][] {

    let _pS = ps[0];
    let _pE = ps[ps.length-1];

    if (t === 0) {
        return [_pS,_pS];
    } else if (t === 1) {
        return [_pE,_pE];
    }

    let { p, pE } = evalDeCasteljauWithErr(ps, t);
    return [
        [p[0] - pE[0], p[1] - pE[1]],
        [p[0] + pE[0], p[1] + pE[1]]
    ];
}


export { getIntervalBox }
