import { twoDiff, scaleExpansion2, eMultBy2, eAdd, eMult, eDiff, eCompress } from "big-float-ts";

const td = twoDiff;
const sce = scaleExpansion2;
const em2 = eMultBy2;


/**
 * Returns the result of multiplying a floating point expansion by 4.
 * 
 * * **error free**
 * 
 * * see [[Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a floating point expansion
 * 
 * @internal
 */
 function em4(e: number[]) {
    const e_: number[] = [];
    for (let i=0; i<e.length; i++) {
        e_.push(4*e[i]);
    }

    return e_;
}



/**
 * Returns the *exact* polynomial whose roots are all the `t` values on the 
 * given bezier curve such that the line from the given point to the point on 
 * the bezier evaluated at `t` is tangent to the bezier curve at `t`.
 * 
 * * The returned polynomial coefficients are given densely as an array of 
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) floating 
 * point expansions from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * @param ps an order 2 curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param p a point, e.g. `[1,2]`
 * 
 * @internal
 */
 function getFootpointPoly2Exact(ps: number[][], p: number[]): number[][] {
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    const [x, y] = p;

    const xx0 = td(x0,x);
    const xx1 = td(x1,x);
    const xx2 = td(x2,x);
    const yy0 = td(y0,y);
    const yy1 = td(y1,y);
    const yy2 = td(y2,y);

    const x00 = eMult(xx0,xx0);
    const x01 = eMult(xx0,xx1);
    const x02 = eMult(xx0,xx2);
    const x11 = eMult(xx1,xx1);
    const x12 = eMult(xx1,xx2);
    const x22 = eMult(xx2,xx2);

    const y00 = eMult(yy0,yy0);
    const y01 = eMult(yy0,yy1);
    const y02 = eMult(yy0,yy2);
    const y11 = eMult(yy1,yy1);
    const y12 = eMult(yy1,yy2);
    const y22 = eMult(yy2,yy2);

    const q1 = eAdd(y02,em2(y11));
    const r1 = eAdd(x02,em2(x11));

    //const t3 = y22 + 2*q1 - 4*(y12 + y01) + y00 + 
    //           x22 + 2*r1 - 4*(x12 + x01) + x00;
    const t3a = eAdd(eDiff(eAdd(x22,em2(r1)),em4(eAdd(x12,x01))),x00);
    const t3b = eAdd(eDiff(eAdd(y22,em2(q1)),em4(eAdd(y12,y01))),y00);
    const t3 = eAdd(t3a,t3b);

    //const t2 = 3*(y12 - q1 + 3*y01 - y00 + 
    //              x12 - r1 + 3*x01 - x00);
    const t2a = eAdd(eDiff(x12,r1),eDiff(sce(3,x01),x00));
    const t2b = eAdd(eDiff(y12,q1),eDiff(sce(3,y01),y00));
    const t2 = sce(3,eAdd(t2a,t2b));

    //const t1 = q1 - 3*(2*y01 - y00) + 
    //           r1 - 3*(2*x01 - x00);
    const t1a = eDiff(q1,sce(3,eDiff(em2(y01),y00)));
    const t1b = eDiff(r1,sce(3,eDiff(em2(x01),x00)));
    const t1 = eAdd(t1a,t1b);

    //const t0 = y01 - y00 + 
    //           x01 - x00;
    const t0a = eDiff(y01,y00);
    const t0b = eDiff(x01,x00);
    const t0 = eAdd(t0a,t0b);

    return [t3,t2,t1,t0].map(eCompress);
}


export { getFootpointPoly2Exact }