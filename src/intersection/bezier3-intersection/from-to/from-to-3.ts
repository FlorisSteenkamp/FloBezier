
const eps = Number.EPSILON;
const u = eps/2;
const abs = Math.abs;

/** error free error bounds */ 
const psErrorFree = [[0,0],[0,0],[0,0],[0,0]];


/**
 * Returns a bezier curve that starts and ends at the given t parameters 
 * including an error bound (that needs to be multiplied by `11u`, where 
 * `u === Number.EPSILON/2`).
 * 
 * * ***the below preconditions are only necessary for a correct error bound***
 * * **precondition 1**: exact tS, tE, ps
 * * **precondition 2**: tS, tE ∈ [0,1]
 * * **precondition 3**: `Number.EPSILON/2 | tS` and `Number.EPSILON/2 | tE`
 * * **precondition 4**: tE > tS
 * 
 * @param ps a cubic bezier curve
 * @param tS the t parameter where the resultant bezier should start
 * @param tE the t parameter where the resultant bezier should end
 */
 function fromTo3(
        ps: number[][], 
        tS: number, 
        tE: number): { ps: number[][]; _ps: number[][]; } {

    if (tS === 0) { 
        if (tE === 1) {
            return { ps, _ps: psErrorFree }; 
        }
        return splitLeft3(ps, tE);
    }
    
    if (tE === 1) { return splitRight3(ps, tS); }

    return splitAtBoth3(ps, tS, tE);
}


/**
 * Returns a bezier curve that starts at the given t parameter and ends 
 * at `t === 1` including an error bound (that needs to be multiplied 
 * by `11u`, where `u === Number.EPSILON/2`).
 * 
 * * ***the below preconditions are only necessary for a correct error bound***
 * * **precondition 1**: exact `t`, `ps`
 * * **precondition 2**: t ∈ [0,1)
 * * **precondition 3**: `Number.EPSILON/2 | t`
 * 
 * @param ps a cubic bezier curve
 * @param t the t parameter where the resultant bezier should start
 */
function splitRight3(
        ps: number[][], 
        t: number): { ps: number[][]; _ps: number[][]; } {

    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 
    const p0 = ps[0]; const p1 = ps[1];  // exact
    const p2 = ps[2]; const p3 = ps[3];  // exact
    const x0 = p0[0]; const y0 = p0[1];  // exact
    const x1 = p1[0]; const y1 = p1[1];  // exact
    const x2 = p2[0]; const y2 = p2[1];  // exact
    const x3 = p3[0]; const y3 = p3[1];  // exact
    // --------------------------------------------------------

    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a

    const s = 1 - t;  // <0>s <= exact by precondition 3

    const tt  = t*t;   // <1>tt  <= <0>t<0>t   (by counter rule 2)
    const ttt = t*tt;  // <2>ttt <= <0>t<1>tt  (again by counter rule 2)
    const ss  = s*s;   // <1>ss  <= <0>s<0>s
    const sss = s*ss;  // <2>sss <= <0>s<1>ss
    const ts  = t*s;   // <1>ts  <= <0>t<0>s
    const sst = t*ss;  // <2>sst <= <0>t<1>ss
    const stt = s*tt;  // <2>stt <= <0>s<1>tt

    const psR = [
        [(x3*ttt + x0*sss) + 3*(x2*stt + x1*sst),   // xx0, split point x
         (y3*ttt + y0*sss) + 3*(y2*stt + y1*sst)],  // yy0, split point y
        [(x3*tt + x1*ss) + 2*x2*ts,   // xx1
         (y3*tt + y1*ss) + 2*y2*ts],  // yy1
        [x3*t + x2*s,   // xx2
         y3*t + y2*s],  // yy2
        [x3,  // xx3
         y3]  // yy3
    ];


    // -----------------------
    // Calculate error bounds
    // -----------------------

    const _x0 = abs(x0);
    const _y0 = abs(y0);
    const _x1 = abs(x1);
    const _y1 = abs(y1);
    const _x2 = abs(x2);
    const _y2 = abs(y2);
    const _x3 = abs(x3);
    const _y3 = abs(y3);

    // using error bound counter rule 2 in the final step:
    // <2>xx2 <= <2>(<1>(<0>x3*<0>t) + <1>(<0>x2*<0>s))
    const _xx2 = _x3*t + _x2*s;
    // <4>xx1 <= <4>(<3>(<2>(<0>x3*<1>tt) + <2>(<0>x1*<1>ss)) + <2>(2*<0>x2*<1>ts))
    const _xx1 = (_x3*tt + _x1*ss) + 2*_x2*ts;
    // <6>xx0 <= <6>(<4>(<3>(<0>x3*<2>ttt) + <3>(<0>x0*<2>sss)) + <5>(3*(<4>(<3>(<0>x2*<2>stt) + <3>(<0>x1*<2>sst)))))
    const _xx0 = (_x3*ttt + _x0*sss) + 3*(_x2*stt + _x1*sst);

    const _yy2 = _y3*t + _y2*s;
    const _yy1 = (_y3*tt + _y1*ss) + 2*_y2*ts;
    const _yy0 = (_y3*ttt + _y0*sss) + 3*(_y2*stt + _y1*sst);

    /** the coordinate-wise error bound */ 
    //const psR_ = [
    //    [6*u*_xx0, 6*u*_yy0],
    //    [4*u*_xx1, 4*u*_yy1],
    //    [2*u*_xx2, 2*u*_yy2],
    //    [0, 0]
    //];

    const psR_ = [
        [_xx0, _yy0],
        [_xx1, _yy1],
        [_xx2, _yy2],
        [0, 0]
    ];

    return {
        ps: psR, 
        _ps: psR_
    };
}


/**
 * Returns a bezier curve that starts at `t === 0` and ends at the given t 
 * parameter including an error bound (that needs to be multiplied by `11u`, where 
 * `u === Number.EPSILON/2`).
 * 
 * * ***the below preconditions are only necessary for a correct error bound*** 
 * * **precondition 1**: exact `t`, `ps`
 * * **precondition 2**: `t ∈ (0,1]`
 * * **precondition 3**: `Number.EPSILON/2 | t`  (i.e. `eps/2` divides `t`)
 * 
 * @param ps a cubic bezier curve
 * @param t the `t` parameter where the resultant bezier should end
 */
function splitLeft3(
        ps: number[][], 
        t: number): { ps: number[][]; _ps: number[][]; } {

    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 
    const p0 = ps[0]; const p1 = ps[1];  // exact
    const p2 = ps[2]; const p3 = ps[3];  // exact
    const x0 = p0[0]; const y0 = p0[1];  // exact
    const x1 = p1[0]; const y1 = p1[1];  // exact
    const x2 = p2[0]; const y2 = p2[1];  // exact
    const x3 = p3[0]; const y3 = p3[1];  // exact
    // --------------------------------------------------------

    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a

    const s = 1 - t;  // <0>s <= exact by precondition 3

    const tt  = t*t;   // <1>tt  <= <0>t<0>t   (by counter rule 2)
    const ttt = t*tt;  // <2>ttt <= <0>t<1>tt  (again by counter rule 2)
    const ss  = s*s;   // <1>ss  <= <0>s<0>s
    const sss = s*ss;  // <2>sss <= <0>s<1>ss
    const ts  = t*s;   // <1>ts  <= <0>t<0>s
    const sst = t*ss;  // <2>sst <= <0>t<1>ss
    const stt = s*tt;  // <2>stt <= <0>s<1>tt

    const psL = [
        [x0,   // xx0
         y0],  // yy0
        [x1*t + x0*s,   // xx1
         y1*t + y0*s],  // yy1
        [(x2*tt + x0*ss) + 2*x1*ts,   // xx2
         (y2*tt + y0*ss) + 2*y1*ts],  // yy2
        [(x3*ttt + x0*sss) + 3*(x2*stt + x1*sst),  // xx3 - split point x
         (y3*ttt + y0*sss) + 3*(y2*stt + y1*sst)]  // yy3 - split point y
    ];


    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _x0 = abs(x0);
    const _y0 = abs(y0);
    const _x1 = abs(x1);
    const _y1 = abs(y1);
    const _x2 = abs(x2);
    const _y2 = abs(y2);
    const _x3 = abs(x3);
    const _y3 = abs(y3);

    const _xx1 = _x1*t + _x0*s;
    // <2>xx1 <= <2>(<1>(<0>x1*<0>t) + <1>(<0>x0*<0>s))
    const _xx2 = (_x2*tt + _x0*ss) + 2*_x1*ts;
    // <4>xx2 <= <4>(<3>(<2>(<0>x2*<1>tt) + <2>(<0>x0*<1>ss)) + <2>(2*<0>x1*<1>ts))
    const _xx3 = (_x3*ttt + _x0*sss) + 3*(_x2*stt + _x1*sst);
    // <6>xx3 <= <6>(<4>(<3>(<0>x3*<2>ttt) + <3>(<0>x0*<2>sss)) + <5>(3*(<4>(<3>(<0>x2*<2>stt) + <3>(<0>x1*<2>sst)))))

    const _yy1 = _y1*t + _y0*s;
    const _yy2 = (_y2*tt + _y0*ss) + 2*_y1*ts;
    const _yy3 = (_y3*ttt + _y0*sss) + 3*(_y2*stt + _y1*sst);

    /** the coordinate-wise error bound */ 
    //const psL_ = [
    //    [0, 0],
    //    [2*u*_xx1, 2*u*_yy1],
    //    [4*u*_xx2, 4*u*_yy2],
    //    [6*u*_xx3, 6*u*_yy3]
    //];

    const psL_ = [
        [0, 0],
        [_xx1, _yy1],
        [_xx2, _yy2],
        [_xx3, _yy3]
    ];

    return {
        ps: psL,
        _ps: psL_
    };
}


/**
 * Returns a bezier curve that starts and ends at the given `t` parameters
 * including an error bound (that needs to be multiplied by `11u`, where 
 * `u === Number.EPSILON/2`). 
 * 
 * * ***the below preconditions are only necessary for a correct error bound***
 * * **precondition 1**: exact `t`, `tE`, `ps`
 * * **precondition 2**: `tS, tE ∈ (0,1)`
 * * **precondition 3**: `Number.EPSILON/2 | t (and tE)`  (i.e. `eps/2` divides `t` and `tE`)
 * * **precondition 4**: `t > 0 && tE < 1 && t < tE`
 * 
 * @param ps a cubic bezier curve
 * @param t the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 */
function splitAtBoth3(
        ps: number[][], 
        t: number, 
        tE: number): { ps: number[][]; _ps: number[][]; } {

    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 
    const p0 = ps[0]; const p1 = ps[1];  // exact
    const p2 = ps[2]; const p3 = ps[3];  // exact
    const x0 = p0[0]; const y0 = p0[1];  // exact
    const x1 = p1[0]; const y1 = p1[1];  // exact
    const x2 = p2[0]; const y2 = p2[1];  // exact
    const x3 = p3[0]; const y3 = p3[1];  // exact
    // --------------------------------------------------------

    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a

    // splitRight
    const s = 1 - t;  // <0>s <= exact by precondition 3
    // make v the smallest float > (the true v) such that `eps/2 | v`
    // see the function `getV` to see why `v` is calculated this way
    const _v = (tE - t)/s;
    const r = _v + _v*u;  // add an `ulp` so that `v >= (tE - t)/s` guaranteed
    const r_ = r + 0.5 - 0.5;  // and *round* to nearest `eps/2`
    const v = r_ >= r ? r_ : r_ + u;  // ensure exact powers of 2 are handled correctly

    const tt  = t*t;   // <1>tt  <= <0>t<0>t   (by counter rule 2)
    const ttt = t*tt;  // <2>ttt <= <0>t<1>tt  (again by counter rule 2)
    const ss  = s*s;   // <1>ss  <= <0>s<0>s
    const sss = s*ss;  // <2>sss <= <0>s<1>ss
    const ts  = t*s;   // <1>ts  <= <0>t<0>s
    const sst = ss*t;  // <2>sst <= <0>t<1>ss
    const tts = tt*s;  // <2>stt <= <0>s<1>tt

    // splitLeft
    const sL   = 1 - v;  // <0>s <= exact by precondition 3 and by construction that `u | v`
    const ttL  = v*v;     // <1>uu <= <0>u<0>u
    const tttL = v*ttL;   // <2>uuu <= <0>u<1>uu
    const ssL  = sL*sL;   // <1>ss  <= <0>s<0>s
    const sssL = sL*ssL;  // <2>sss <= <0>s<1>ss
    const tsL  = v*sL;    // <1>us  <= <0>u<0>s
    const ssuL = ssL*v;   // <2>ssu  <= <1>ss<0>u

    const xa = (ss*x1 + tt*x3) + 2*ts*x2;
    const xb = ttL*(s*x2 + t*x3);
    const xx0 = 3*(tts*x2 + sst*x1) + (sss*x0 + ttt*x3);
    const xx1 = sL*xx0 + v*xa;
    const xx2 = (ssL*xx0 + xb) + tsL*2*xa;
    const xx3 = 3*(ssuL*xa + sL*xb) + (sssL*xx0 + tttL*x3);

    const ya = ss*y1 + tt*y3 + 2*ts*y2;
    const yb = ttL*(s*y2 + t*y3);
    const yy0 = 3*(tts*y2 + sst*y1) + (sss*y0 + ttt*y3);
    const yy1 = sL*yy0 + v*ya;
    const yy2 = (ssL*yy0 + yb) + tsL*2*ya;
    const yy3 = 3*(ssuL*ya + sL*yb) + (sssL*yy0 + tttL*y3);


    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _x0 = abs(x0);
    const _y0 = abs(y0);
    const _x1 = abs(x1);
    const _y1 = abs(y1);
    const _x2 = abs(x2);
    const _y2 = abs(y2);
    const _x3 = abs(x3);
    const _y3 = abs(y3);

    // <4>xa <= <4>(<3>((<2>(<1>ss*<0>x1) + <2>(<1>tt*<0>x3))) + <2>(2*<1>ts*<0>x2));
    const _xa = (ss*_x1 + tt*_x3) + 2*ts*_x2;
    // <4>xb <= <4>(<1>ttL*<2>((<1>(<0>s*<0>x2) + <1>(<0>t*<0>x3))));
    const _xb = ttL*(s*_x2 + t*_x3);
    // <6>xx0 <= <6>(<5>(3*<4>(<3>(<2>tts*<0>x2) + <3>(<2>sst*<0>x1))) + <4>(<3>(<2>sss*<0>x0) + <3>(<2>ttt*<0>x3)));
    const _xx0 = 3*(tts*_x2 + sst*_x1) + (sss*_x0 + ttt*_x3);
    // <6>xx1 = <6>(<1>(<0>sL*<0>xx0) + <5>(<0>u*<4>xa));
    const _xx1 = sL*_xx0 + v*_xa;
    // <10>xx2 = <10>(<9>(<8>(<1>ssL*<6>xx0) + <4>xb) + <6>(<1>tsL*2*<4>xa));
    const _xx2 = (ssL*_xx0 + _xb) + tsL*2*_xa;
    // <11>xx3 = <11>(<9>(3*<8>(<7>(<2>ssuL*<4>xa) + <5>(<0>sL*<4>xb))) + <10>(<9>(<2>sssL*<6>xx0) + <3>(<2>tttL*<0>x3)));
    const _xx3 = 3*(ssuL*_xa + sL*_xb) + (sssL*_xx0 + tttL*_x3);

    const _ya = ss*_y1 + tt*_y3 + 2*ts*_y2;
    const _yb = ttL*(s*_y2 + t*_y3);
    const _yy0 = 3*(tts*_y2 + sst*_y1) + (sss*_y0 + ttt*_y3);
    const _yy1 = sL*_yy0 + v*_ya;
    const _yy2 = (ssL*_yy0 + _yb) + tsL*2*_ya;
    const _yy3 = 3*(ssuL*_ya + sL*_yb) + (sssL*_yy0 + tttL*_y3);

    return {
        ps: [[xx0, yy0], [xx1, yy1], [xx2, yy2], [xx3, yy3]],
        //ps_: [
        //    [6* u*_xx0, 6* u*_yy0],
        //    [6* u*_xx1, 6* u*_yy1],
        //    [10*u*_xx2, 10*u*_yy2],
        //    [11*u*_xx3, 11*u*_yy3]
        //]
        _ps: [
            [_xx0, _yy0],
            [_xx1, _yy1],
            [_xx2, _yy2],
            [_xx3, _yy3]
        ]
    };
}


export { fromTo3 }
