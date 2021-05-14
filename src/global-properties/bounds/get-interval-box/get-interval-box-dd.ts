import { evalDeCasteljauWithErrDd } from "../../../local-properties-at-t/t-to-xy/eval-de-casteljau-with-err-dd";
import { operators } from "double-double";

const { 
    ddDiffDd, ddDivDdWithError, ddAddDouble, ddMultDd, ddMultDouble2, 
    ddAddDd, ddMultBy2, ddMin, ddMax 
} = operators;


const u = Number.EPSILON / 2;
const uu = u*u;
const abs = Math.abs;
const qdq = ddDiffDd;
const qOne = [0,1];
const qad = ddAddDouble;
const qaq = ddAddDd;
const qmq = ddMultDd;
const qmd = ddMultDouble2;
const qm2 = ddMultBy2;
const qDivQuadWithError = ddDivDdWithError;
const qMin = ddMin;
const qMax  = ddMax;


/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire 
 * given bezier curve from `t1` to `t2`. The returned box is given as an array 
 * of points in double-double precision, e.g. `[[[0,1],[0,1]], [[0,2],[0,2]]]`.
 * 
 * * **precondition:** t1 < t2
 * * **precondition:** t1,t2 >= 0 && t1,t2 <= 1
 * * **precondition:** 49-bit aligned bezier coordinates
 * 
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control 
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param ts [first, second] parameter values, given in double-double 
 * precision, e.g. [[0,0.11], [0,0.12]]. (Use [[getIntervalBox]] instead for
 * double precision)
 * 
 * @doc mdx
 */
function getIntervalBoxDd(
        ps: number[][], 
        ts: number[][]): number[][][] {

    if (ts[0] !== ts[1]) {
        if (ps.length === 4) {
            return getIntervalBox3Dd(ps, ts);
        }
        if (ps.length === 3) {
            return getIntervalBox2Dd(ps, ts);
        }
        return getIntervalBox1Dd(ps, ts);
    } else {  // ts[0] === ts[1]
        return getIntervalBoxAtTDd(ps, ts[0]);
    }
}


/**
 * quad precision t1, t2
 * 
 * @param param0 
 * @param param1
 * 
 * @internal
 */
function getIntervalBox3Dd(
        [[x0,y0],[x1,y1],[x2,y2],[x3,y3]]: number[][], 
        [t1, t2]: number[][]) {

    //t2 = ((t2-t1) / (1-t1)) * (1 + Number.EPSILON); // <= fl(t2) > t2
    const tDel = qdq(t2,t1);
    const tDel_ = 3*uu*abs(tDel[1]);  // max absolute error in tDel
    const oMt1 = qdq(qOne,t1);
    const oMt1_ = 3*uu*abs(oMt1[1]);  // max absolute error in oMt1
    //t2 = qdivq(t2m1,omt1) //* (1 + Number.EPSILON); // <= fl(t2) > t2
    const $t2 = qDivQuadWithError(tDel,oMt1,tDel_,oMt1_);
    t2 = qad($t2.est,$t2.err);  // the max t2 can possibly be

    //const s1 = (1 - t1);  // <= exact by precondition - not anymore
    const s1 = qdq(qOne,t1);  // <1>s1
    // below uses error by counters - also note qmq is different than other operators in that it is 2ice as inaccurate
    const tt1 = qmq(t1,t1);    // <2>tt1  
    const ts1 = qmq(t1,s1);    // <3>(<0>t1<1>s1)  <3> === <0+1+2>
    const ss1 = qmq(s1,s1);    // <4>(<1>s1<1>s1)  <4> === <1+1+2>
    const ttt1 = qmq(tt1,t1);  // <4>(<2>tt1<0>t1)
    const tts1 = qmq(tt1,s1);  // <5>(<2>tt1<1>s1)
    const tss1 = qmq(ss1,t1);  // <6>(<4>ss1<0>t1)
    const sss1 = qmq(ss1,s1);  // <7>(<4>ss1<1>s1)

    const s2 = qdq(qOne,t2);  // <1>s2 <= relative error bounded by u*(1 - t2)
    const tt2 = qmq(t2,t2);    // <2>tt2
    const ts2 = qmq(t2,s2);    // <3>(<0>t2<1>s2)
    const ss2 = qmq(s2,s2);    // <4>(<1>s2<1>s2)
    const ttt2 = qmq(tt2,t2);  // <4>(<1>tt2<0>t2)
    const tts2 = qmq(tt2,s2);  // <5>(<1>tt2<1>s2)
    const tss2 = qmq(ss2,t2);  // <6>(<3>ss2<0>t2)
    const sss2 = qmq(ss2,s2);  // <7>(<3>ss2<1>s2)

    const _t1   = abs(t1[1]);
    const _s1   = abs(s1[1]);
    const _tt1  = abs(tt1[1]);
    const _ts1  = abs(ts1[1]);
    const _ss1  = abs(ss1[1]);
    const _ttt1 = abs(ttt1[1]);
    const _tts1 = abs(tts1[1]);
    const _tss1 = abs(tss1[1]);
    const _sss1 = abs(sss1[1]);
    const _t2   = abs(t2[1]);
    const _s2   = abs(s2[1]);
    const _tt2  = abs(tt2[1]);
    const _ts2  = abs(ts2[1]);
    const _ss2  = abs(ss2[1]);
    const _ttt2 = abs(ttt2[1]);
    const _tts2 = abs(tts2[1]);
    const _tss2 = abs(tss2[1]);
    const _sss2 = abs(sss2[1]);

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
    const q8 = qaq(qmd(x3,t1),qmd(x2,s1));
    const q7 = qaq(qaq(qmd(x3,tt1),qmd(2*x2,ts1)),qmd(x1,ss1)); 
    const qx0 = qaq(qaq(qmd(x3,ttt1),qmd(x0,sss1)),qmd(3,(qaq(qmd(x2,tts1),qmd(x1,tss1)))));
    const qx1 = qaq(qmq(q7,t2),qmq(qx0,s2));
    const qx2 = qaq(qaq(qmq(q8,tt2),qmq(qx0,ss2)),qmq(qm2(q7),ts2));
    const qx3 = qaq(qaq(qmd(x3,ttt2),qmq(qx0,sss2)),qmd(3,qaq(qmq(q8,tts2),qmq(q7,tss2))));

    const _qx0 = abs(qx0[1]);

    //---- error / abs value calculation
    const _q8 = _x3*_t1 + _x2*_s1;  // <= <3>
    // q8: <3>(<1>(x3*t1) + <2>(x2*<1>s1))
    const _q7 = _x3*_tt1 + 2*_x2*_ts1 + _x1*_ss1;  // <= <6> 
    // q7: <6>(<5>(<3>(x3*<2>tt1) + <4>(2*x2*<3>ts1)) + <5>(x1*<4>ss1));
    _x0 = (_x3*_ttt1 + _x0*_sss1) + 3*(_x2*_tts1 + _x1*_tss1);  // <= <11>
    // x0: <11>(<9>(x3*<4>ttt1 + x0*<7>sss1) + <10>(3*<9>(<8>(<6>(x2*<5>tts1) + <7>(x1*<6>tss1)))));
    _x1 = _q7*_t2 + _qx0*_s2;  // <= <15>
    // x1: <15>(<7>(<6>q7*t2) + <14>(<11>x0*<1>s2));
    _x2 = _q8*_tt2 + _qx0*_ss2 + 2*_q7*_ts2;  // <= <20>
    // x2: <20>(<19>(<18>(<3>q8*<2>tt2) + <17>(<11>x0*<4>ss2)) + <11>(2*<6>q7*<3>ts2));
    _x3 = _x3*_ttt2 + _qx0*_sss2 + 3*(_q8*_tts2 + _q7*_tss2);  // <= <22>
    // x3: <22>(<21>(<5>(x3*<4>ttt2) + <20>(<11>x0*<7>sss2)) + <16>(3*<15>(<10>(<3>q8*<5>tts2) + <14>(<6>q7*<6>tss2)))));

    // max errors: 
    _x0 = 11* uu*_x0;
    _x1 = 15* uu*_x1;
    _x2 = 20* uu*_x2;
    _x3 = 22* uu*_x3;

    //---- y - calculation
    const r8 = qaq(qmd(y3,t1),qmd(y2,s1));
    const r7 = qaq(qaq(qmd(y3,tt1),qmd(2*y2,ts1)),qmd(y1,ss1)); 
    const qy0 = qaq(qaq(qmd(y3,ttt1),qmd(y0,sss1)),qmd(3,(qaq(qmd(y2,tts1),qmd(y1,tss1)))));
    const qy1 = qaq(qmq(r7,t2),qmq(qy0,s2));
    const qy2 = qaq(qaq(qmq(r8,tt2),qmq(qy0,ss2)),qmq(qm2(r7),ts2));
    const qy3 = qaq(qaq(qmd(y3,ttt2),qmq(qy0,sss2)),qmd(3,qaq(qmq(r8,tts2),qmq(r7,tss2))));

    const _qy0 = abs(qy0[1]);

    //---- error / abs value calculation
    const _r8 = _y3*_t1 + _y2*_s1;  // <= <3>
    const _r7 = _y3*_tt1 + 2*_y2*_ts1 + _y1*_ss1;  // <= <6> 
    _y0 = (_y3*_ttt1 + _y0*_sss1) + 3*(_y2*_tts1 + _y1*_tss1);  // <= <11>
    _y1 = _r7*_t2 + _qy0*_s2;  // <= <15>
    _y2 = _r8*_tt2 + _qy0*_ss2 + 2*_r7*_ts2;  // <= <20>
    _y3 = _y3*_ttt2 + _qy0*_sss2 + 3*(_r8*_tts2 + _r7*_tss2);  // <= <22>

    // max errors: 
    _y0 = 11* uu*_y0;
    _y1 = 15* uu*_y1;
    _y2 = 20* uu*_y2;
    _y3 = 22* uu*_y3;

    const minX = qMin(qMin(qad(qx0,-_x0), qad(qx1,-_x1)), qMin(qad(qx2,-_x2), qad(qx3,-_x3)));
    const maxX = qMax(qMax(qad(qx0,+_x0), qad(qx1,+_x1)), qMax(qad(qx2,+_x2), qad(qx3,+_x3)));
    const minY = qMin(qMin(qad(qy0,-_y0), qad(qy1,-_y1)), qMin(qad(qy2,-_y2), qad(qy3,-_y3)));
    const maxY = qMax(qMax(qad(qy0,+_y0), qad(qy1,+_y1)), qMax(qad(qy2,+_y2), qad(qy3,+_y3)));

    return [[minX,minY],[maxX,maxY]];
}


/**
 * quad precision t1, t2
 * 
 * @param param0 
 * @param param1 
 * 
 * @internal
 */
function getIntervalBox2Dd(
        [[x0,y0],[x1,y1],[x2,y2]]: number[][], 
        [t1, t2]: number[][]) {

    //t2 = ((t2-t1) / (1-t1)) * (1 + Number.EPSILON); // <= fl(t2) > t2
    const tDel = qdq(t2,t1);
    const tDel_ = 3*uu*abs(tDel[1]);  // max absolute error in tDel
    const oMt1 = qdq(qOne,t1);
    const oMt1_ = 3*uu*abs(oMt1[1]);  // max absolute error in oMt1
    //t2 = qdivq(t2m1,omt1) //* (1 + Number.EPSILON); // <= fl(t2) > t2
    const $t2 = qDivQuadWithError(tDel,oMt1,tDel_,oMt1_);
    t2 = qad($t2.est,$t2.err);  // the max t2 can possibly be

    //const s1 = (1 - t1);  // <= exact by precondition - not anymore
    const s1 = qdq(qOne,t1);   // <1>s1
    // below uses error by counters - also note qmq is different than other operators in that it is 2ice as inaccurate
    const tt1 = qmq(t1,t1);    // <2>tt1  
    const ts1 = qmq(t1,s1);    // <3>(<0>t1<1>s1)  <3> === <0+1+2>
    const ss1 = qmq(s1,s1);    // <4>(<1>s1<1>s1)  <4> === <1+1+2>
    const s2 = qdq(qOne,t2);   // <1>s2 <= relative error bounded by u*(1 - t2)
    const tt2 = qmq(t2,t2);    // <2>tt2
    const ts2 = qmq(t2,s2);    // <3>(<0>t2<1>s2)
    const ss2 = qmq(s2,s2);    // <4>(<1>s2<1>s2)


    const _t1   = abs(t1[1]);
    const _s1   = abs(s1[1]);
    const _tt1  = abs(tt1[1]);
    const _ts1  = abs(ts1[1]);
    const _ss1  = abs(ss1[1]);
    const _t2   = abs(t2[1]);
    const _s2   = abs(s2[1]);
    const _tt2  = abs(tt2[1]);
    const _ts2  = abs(ts2[1]);
    const _ss2  = abs(ss2[1]);


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
    const q1 = qaq(qaq(qmd(x2,tt1),qmd(2*x1,ts1)),qmd(x0,ss1));
    const q2 = qaq(qmd(x2,t1),qmd(x1,s1));
    const qx0 = q1;
    const qx1 = qaq(qmq(t2,q2),qmq(s2,q1));
    const qx2 = qaq(qaq(qmd(x2,tt2),qmq(qm2(ts2),q2)),qmq(ss2,q1));

    const _q1 = _x2*_tt1 + 2*_x1*_ts1 + _x0*_ss1;  // <= <7>
    // q1: <7>(<6>(<5>(x2*<2>tt1) + <4>(2*x1*<3>ts1)) + <5>(x0*<4>ss1));
    const _q2 = _x2*_t1 + _x1*_s1;  // <= <3>
    // q2: <3>(<1>(x2*t1) + <2>(x1*<1>s1));
    _x0 = _q1;  // <= <7>
    // x0: <7>q1;
    _x1 = _t2*_q2 + _s2*_q1;  // <= <11>
    // x1: <11>(<5>(t2*<3>q2) + <10>(<1>s2*<7>q1));
    _x2 = (_tt2*x2 + 2*_ts2*_q2) + _ss2*_q1;  // <= <14>
    // x2: <14>(<9>(<3>(<2>tt2*x2) + <8>(2*<3>ts2*<3>q2)) + <13>(<4>ss2*<7>q1));

    // max errors: 
    _x0 = 7*  uu*_x0;
    _x1 = 11* uu*_x1;
    _x2 = 14* uu*_x2;


    //---- y - calculation
    const r1 = qaq(qaq(qmd(y2,tt1),qmd(2*y1,ts1)),qmd(y0,ss1));
    const r2 = qaq(qmd(y2,t1),qmd(y1,s1));
    const qy0 = r1;
    const qy1 = qaq(qmq(t2,r2),qmq(s2,r1));
    const qy2 = qaq(qaq(qmd(y2,tt2),qmq(qm2(ts2),r2)),qmq(ss2,r1));

    const _r1 = _y2*_tt1 + 2*_y1*_ts1 + _y0*_ss1;  // <= <7>
    // r1: <7>(<6>(<5>(y2*<2>tt1) + <4>(2*y1*<3>ts1)) + <5>(y0*<4>ss1));
    const _r2 = _y2*_t1 + _y1*_s1;  // <= <3>
    // r2: <3>(<1>(y2*t1) + <2>(y1*<1>s1));
    _y0 = _r1;  // <= <7>
    // y0: <7>r1;
    _y1 = _t2*_r2 + _s2*_r1;  // <= <11>
    // y1: <11>(<5>(t2*<3>r2) + <10>(<1>s2*<7>r1));
    _y2 = (_tt2*y2 + 2*_ts2*_r2) + _ss2*_r1;  // <= <14>
    // y2: <14>(<9>(<3>(<2>tt2*y2) + <8>(2*<3>ts2*<3>r2)) + <13>(<4>ss2*<7>r1));

    // max errors: 
    _y0 = 7*  uu*_y0;
    _y1 = 11* uu*_y1;
    _y2 = 14* uu*_y2;    


    const minX = qMin(qMin(qad(qx0,-_x0), qad(qx1,-_x1)), qad(qx2,-_x2));
    const maxX = qMax(qMax(qad(qx0,+_x0), qad(qx1,+_x1)), qad(qx2,+_x2));
    const minY = qMin(qMin(qad(qy0,-_y0), qad(qy1,-_y1)), qad(qy2,-_y2));
    const maxY = qMax(qMax(qad(qy0,+_y0), qad(qy1,+_y1)), qad(qy2,+_y2));


    return [[minX,minY],[maxX,maxY]];
}


/**
 * quad precision t1, t2
 * 
 * @param param0 
 * @param param1 
 * 
 * @internal
 */
function getIntervalBox1Dd(
        [[x0,y0],[x1,y1]]: number[][], 
        [t1, t2]: number[][]) {

    // Implementation for lines kept for symmetry - there are obviously much
    // simpler ways to calculate the required box in the case of a line.

    //t2 = ((t2-t1) / (1-t1)) * (1 + Number.EPSILON); // <= fl(t2) > t2
    const tDel = qdq(t2,t1);
    const tDel_ = 3*uu*abs(tDel[1]);  // max absolute error in tDel
    const oMt1 = qdq(qOne,t1);
    const oMt1_ = 3*uu*abs(oMt1[1]);  // max absolute error in oMt1
    //t2 = qdivq(t2m1,omt1) //* (1 + Number.EPSILON); // <= fl(t2) > t2
    const $t2 = qDivQuadWithError(tDel,oMt1,tDel_,oMt1_);
    t2 = qad($t2.est,$t2.err);  // the max t2 can possibly be


    const s1 = qdq(qOne,t1);   // <1>s1
    const s2 = qdq(qOne,t2);   // <1>s2 <= relative error bounded by u*(1 - t2)

    const _t1   = abs(t1[1]);
    const _s1   = abs(s1[1]);
    const _t2   = abs(t2[1]);
    const _s2   = abs(s2[1]);

    // counter rules:
    //   <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   <k>a<l>b = <k + l + 1>ab
    //   fl(a) === <1>a
    let _x0 = abs(x0);
    let _y0 = abs(y0);
    let _x1 = abs(x1);
    let _y1 = abs(y1);


    //---- x - calculation
    const qx0 = qaq(qmd(x1,t1),qmd(x0,s1));
    const qx1 = qaq(qmd(x1,t2),qmq(qx0,s2));

    _x0 = _x1*_t1 + _x0*_s1;  // <= <3>
    // x0: <3>(<1>(x1*t1) + <2>(x0*s1));
    _x1 = _x1*_t2 + _x0*_s2;  // <= <7>
    // x1: <7>(<1>(x1*t2) + <6>(<3>x0*<1>s2));

    // max errors: 
    _x0 = 3*u*_x0;
    _x1 = 7*u*_x1;


    //---- y - calculation
    const qy0 = qaq(qmd(y1,t1),qmd(y0,s1));
    const qy1 = qaq(qmd(y1,t2),qmq(qy0,s2));

    _y0 = _y1*_t1 + _y0*_s1;  // <= <3>
    _y1 = _y1*_t2 + _y0*_s2;  // <= <7>

    // max errors: 
    _y0 = 3*u*_y0;
    _y1 = 7*u*_y1;


    const minX = qMin(qad(qx0,-_x0), qad(qx1,-_x1));
    const maxX = qMax(qad(qx0,+_x0), qad(qx1,+_x1));
    const minY = qMin(qad(qy0,-_y0), qad(qy1,-_y1));
    const maxY = qMax(qad(qy0,+_y0), qad(qy1,+_y1));

    //return [[x0,y0],[x1,y1]];

    return [[minX,minY],[maxX,maxY]];
}


/**
 * quad precision t1, t2
 * 
 * @param ps 
 * @param t 
 * 
 * @internal
 */
function getIntervalBoxAtTDd(
        ps: number[][], 
        t: number[]) {

    const _pS = ps[0];
    const _pE = ps[ps.length-1];

    if (t[0] === 0 && t[1] === 0) {
        const pSx = [0,_pS[0]];
        const pSy = [0,_pS[1]];
        return [
            [pSx,pSy],
            [pSx,pSy]
        ];
    } else if (t[0] === 0 && t[1] === 1) {
        const pEx = [0,_pE[0]];
        const pEy = [0,_pE[1]];
        return [
            [pEx,pEy],
            [pEx,pEy]
        ];
    }

    const { p, pE } = evalDeCasteljauWithErrDd(ps, t);

    return [
        [qad(p[0],-pE[0]), qad(p[1],-pE[1])],
        [qad(p[0],+pE[0]), qad(p[1],+pE[1])]
    ];
}


export { getIntervalBoxDd }
