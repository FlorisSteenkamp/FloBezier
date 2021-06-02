import { evalDeCasteljau as _evalDeCasteljau } from "../../local-properties-at-t/t-to-xy/eval-de-casteljau";

const evalDeCasteljau = _evalDeCasteljau;

// just for testin speed
function splitCubicAt2(
        ps: number[][], 
        t: number): number[][][] {

    //const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 

    const p0 = ps[0];
    const p1 = ps[1];
    const p2 = ps[2];
    const p3 = ps[3];

    const x0 = p0[0];
    const y0 = p0[1];
    const x1 = p1[0];
    const y1 = p1[1];
    const x2 = p2[0];
    const y2 = p2[1];
    const x3 = p3[0];
    const y3 = p3[1];

    const s = 1-t;

    const t2 = t*t;
    const t3 = t*t2;
    const s2 = s*s;
    const s3 = s*s2;
    const ts = t*s;

    /** The split point */
    const p = [
        x3*t3 + 3*(x2*s*t2 + x1*s2*t) + x0*s3, 
        y3*t3 + 3*(y2*s*t2 + y1*s2*t) + y0*s3
    ];


    const ps1 = [
        [x0, y0],
        [x1*t + x0*s,
        y1*t + y0*s],
        [x2*t2 + 2*x1*ts + x0*s2, 
        y2*t2 + 2*y1*ts + y0*s2],
        p
    ];

    const ps2 = [
        p,
        [x3*t2 + 2*x2*ts + x1*s2, 
        y3*t2 + 2*y2*ts + y1*s2],
        [x3*t + x2*s, 
        y3*t + y2*s],
        [x3, y3]
    ];

    return [ps1, ps2];
}


/**
 * Returns a bezier curve that starts and ends at the given t parameters. 
 * Uses de Casteljau's algorithm. 
 * 
 * A loose bound on the accuracy of the resultant points is given by: 
 * |δP| = 2*2n*max_k(|b_k|)η, where n = 3 (for a cubic), b_k are the control 
 * points and η is Number.EPSILON.
 * 
 * @param ps a cubic bezier curve
 * @param t1 the t parameter where the resultant bezier should start
 * @param t2 the t parameter where the resultant bezier should end
 * 
 * @doc
 */

 function fromTo2(ps: number[][], t1: number, t2: number) {
    const reverse = t1 > t2;
    if (t1 > t2) { [t1,t2] = [t2,t1]; }

    let ps_: number[][];

    if (t1 === 0 && t2 === 1) { 
        ps_ = ps; 
    } else if (t1 === 0) { 
        ps_ = splitCubicAt2(ps, t2)[0];
    } else if (t2 === 1) { 
        ps_ = splitCubicAt2(ps, t1)[1]; 
    } else if (t1 === t2) {
        // Degenerate case
        const p = evalDeCasteljau(ps, t1);
        if (ps.length === 2) { return [p,p]; }
        if (ps.length === 3) { return [p,p,p]; }
        if (ps.length === 4) { return [p,p,p,p]; }
    } else {
        ps_ = splitCubicAt2(splitCubicAt2(ps, t1)[1], (t2-t1)/(1-t1))[0];
    }

    return reverse ? ps_.slice().reverse() : ps_;
}



export { splitCubicAt2, fromTo2 }
