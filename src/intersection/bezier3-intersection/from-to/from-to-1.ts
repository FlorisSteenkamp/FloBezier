
const eps = Number.EPSILON;
const u = eps/2;
const abs = Math.abs;

/** error free error bounds */ 
const psErrorFree = [[0,0],[0,0]];


/**
 * Returns a bezier curve that starts and ends at the given `t` parameters 
 * including an error bound (that needs to be multiplied by `4u`, where
 * `u === Number.EPSILON/2`).
 * 
 * * ***the below preconditions are only necessary for a correct error bound***
 * * **precondition 1**: exact tS, tE, ps
 * * **precondition 2**: tS, tE ∈ [0,1]
 * * **precondition 3**: `Number.EPSILON | tS` and `Number.EPSILON | tE`
 * * **precondition 4**: tE > tS
 * 
 * @param ps a linear bezier curve (a line)
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 */
 function fromTo1(
        ps: number[][], 
        tS: number, 
        tE: number): { ps: number[][]; _ps: number[][]; } {

    if (tS === 0) { 
        if (tE === 1) {
            return { ps, _ps: psErrorFree }; 
        }
        return splitLeft1(ps, tE);
    }
    
    if (tE === 1) { return splitRight1(ps, tS); }

    return splitAtBoth1(ps, tS, tE);
}


/**
 * Returns a bezier curve that starts at the given `t` parameter and ends 
 * at `t === 1` including an error bound (that needs to be multiplied 
 * by `2u`, where `u === Number.EPSILON/2`).
 * 
 * * ***the below preconditions are only necessary for a correct error bound***
 * * **precondition 1**: exact `t`, `ps`
 * * **precondition 2**: t ∈ [0,1)
 * * **precondition 3**: `Number.EPSILON | t`
 * 
 * @param ps a linear bezier curve (a line)
 * @param t the `t` parameter where the resultant bezier should start
 */
function splitRight1(
        ps: number[][], 
        t: number): { ps: number[][]; _ps: number[][]; } {

    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1]] = ps; 
    const p0 = ps[0];  // exact
    const p1 = ps[1];  // exact
    const x0 = p0[0]; const y0 = p0[1];  // exact
    const x1 = p1[0]; const y1 = p1[1];  // exact
    // --------------------------------------------------------

    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a

    const s = 1 - t;  // <0>s <= exact by precondition 3

    const psR = [
        [t*x1 + s*x0,   // xx0
         t*y1 + s*y0],  // yy0
        [x1,   // xx1
         y1]   // yy1
    ];


    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _x0 = abs(x0);
    const _y0 = abs(y0);
    const _x1 = abs(x1);
    const _y1 = abs(y1);


    // <2>xx0 <= <2>(<1>(t*x1)) + <1>(s*x0))
    const _xx0 = t*_x1 + s*_x0;

    const _yy0 = t*_y1 + s*_y0;


    /** the coordinate-wise error bound */ 
    //const psR_ = [
    //    [2*u*_xx0, 2*u*_yy0],
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
 * parameter including an error bound (that needs to be multiplied by `2u`, 
 * where `u === Number.EPSILON/2`).
 * 
 * * ***the below preconditions are only necessary for a correct error bound***
 * * **precondition 1**: exact `t`, `ps`
 * * **precondition 2**: `t ∈ (0,1]`
 * * **precondition 3**: `Number.EPSILON | t`
 * 
 * @param ps a linear bezier curve (a line)
 * @param t the `t` parameter where the resultant bezier should end
 */
function splitLeft1(
        ps: number[][], 
        t: number): { ps: number[][]; _ps: number[][]; } {

    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1]] = ps; 
    const p0 = ps[0];  // exact 
    const p1 = ps[1];  // exact
    const x0 = p0[0]; const y0 = p0[1];  // exact
    const x1 = p1[0]; const y1 = p1[1];  // exact
    // --------------------------------------------------------

    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a

    const s = 1 - t;  // <0>s <= exact by precondition 3

    const tt  = t*t;   // <1>tt  <= <0>t<0>t   (by counter rule 2)
    const ss  = s*s;   // <1>ss  <= <0>s<0>s
    const ts  = t*s;   // <1>ts  <= <0>t<0>s

    const psL = [
        [x0,   // xx0
         y0],  // yy0
        [x1*t + x0*s,   // xx1
         y1*t + y0*s]   // yy1
    ];


    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _x0 = abs(x0);
    const _y0 = abs(y0);
    const _x1 = abs(x1);
    const _y1 = abs(y1);

    // <2>xx1 <= <2>(<1>(x1*t) + <1>(x0*s))
    const _xx1 = _x1*t + _x0*s;

    const _yy1 = _y1*t + _y0*s;

    /** the coordinate-wise error bound */ 
    //const psL_ = [
    //    [0, 0],
    //    [2*u*_xx1, 2*u*_yy1],
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
 * including an error bound (that needs to be multiplied by `4u`, where 
 * `u === Number.EPSILON/2`). 
 * 
 * * ***the below preconditions are only necessary for a correct error bound***
 * * **precondition 1**: exact `t`, `tE`, `ps`
 * * **precondition 2**: `tS, tE ∈ (0,1)`
 * * **precondition 3**: `Number.EPSILON | t` and `Number.EPSILON | tE`
 * * **precondition 4**: `t < tE`
 * 
 * @param ps a linear bezier curve (a line)
 * @param t the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 */
 function splitAtBoth1(
        ps: number[][], 
        t: number, 
        tE: number): { ps: number[][]; _ps: number[][]; } {

    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2]] = ps; 
    const p0 = ps[0];  // exact
    const p1 = ps[1];  // exact
    const x0 = p0[0]; const y0 = p0[1];  // exact
    const x1 = p1[0]; const y1 = p1[1];  // exact
    // --------------------------------------------------------

    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a

    // splitRight
    const s = 1 - t;  // <0>s <= exact by precondition 3

    // make v the smallest float > (the true v) such that `eps | v`
    // see the function `getV` to see why `v` is calculated this way
    const _v = (tE - t)/s;
    const r = _v + _v*u;  // add an `ulp` so that `v >= (tE - t)/s` guaranteed
    const r_ = r + 0.5 - 0.5;  // and *round* to nearest `eps/2`
    const tL = r_ >= r ? r_ : r_ + u;  // ensure exact powers of 2 are handled correctly

    // splitLeft
    const sL = 1 - tL;  // <0>s <= exact by precondition 3 and by construction that `eps | v`
    
    const xx0 = t*x1 + x0*s;
    const xx1 = tL*x1 + sL*xx0;

    const yy0 = t*y1 + y0*s;
    const yy1 = tL*y1 + sL*yy0;

    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _x0 = abs(x0);
    const _y0 = abs(y0);
    const _x1 = abs(x1);
    const _y1 = abs(y1);

    // <2>xx0 = <2>(<1>(t*x1) + <1>(s*x0))
    const _xx0 = t*_x1 + s*_x0;
    // <4>xx1 = <4>(<1>(tL*x1) + <3>(sL*<2>xx0))
    const _xx1 = tL*_x1 + sL*_xx0;

    const _yy0 = t*_y1 + s*_y0;
    const _yy1 = tL*_y1 + sL*_yy0;

    return {
        ps: [[xx0, yy0], [xx1, yy1]],
        //ps_: [
        //    [2*u*_xx0, 2*u*_yy0],
        //    [4*u*_xx1, 4*u*_yy1]
        //]
        _ps: [
            [_xx0, _yy0],
            [_xx1, _yy1]
        ]
    };
}


export { fromTo1 }
