import { getXY3Dd, getXY2Dd, getXY1Dd } from "../../../to-power-basis/get-xy/double-double/get-xy-dd.js";
import { twoProduct, ddAddDd, ddMultByNeg2, ddMultBy2, ddDiffDd, ddMultDd, ddMultDouble2 } from "double-double";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp = twoProduct;
const qaq = ddAddDd;
const qm2 = ddMultBy2;
const qmn2 = ddMultByNeg2;
const qdifq = ddDiffDd;
const qmq = ddMultDd;
const qmd = ddMultDouble2;


/**
 * @param circle a circle
 * @param ps a cubic bezier curve
 * 
 * @internal
 */
function getCoeffsCubicDd(
        circle: { center: number[], radius: number}, 
        ps: number[][]) {

    const { radius: r, center: [cx,cy] } = circle;
    const [[a3,a2,a1,a0],[b3,b2,b1,b0]] = getXY3Dd(ps);

    // a3*a3 + b3*b3
    const t6 = qaq(qmq(a3,a3),qmq(b3,b3));

    // 2*(a2*a3 + b2*b3)
    const t5 = qm2(qaq(qmq(a2,a3),qmq(b2,b3)));

    // 2*(a1*a3 + b1*b3) + (a2*a2 + b2*b2)
    const t4 = qaq(
        qm2(qaq(qmq(a1,a3),qmq(b1,b3))),
        qaq(qmq(a2,a2),qmq(b2,b2))
    );

    // ((2*a0*a3 + 2*a1*a2) + (2*b0*b3 + 2*b1*b2)) + (-2*a3*cx + -2*b3*cy)
    const t3 = qaq(
        qaq(
            qaq(qmd(2*a0,a3),qmq(qm2(a1),a2)),
            qaq(qmd(2*b0,b3),qmq(qm2(b1),b2))
        ),
        qaq(qmd(-2*cx,a3),qmd(-2*cy,b3))
    );

    // ((2*a0*a2 + 2*b0*b2) + (a1*a1 + b1*b1)) + (-2*a2*cx + -2*b2*cy)
    const t2 = qaq(
        qaq(
            qaq(qmd(2*a0,a2),qmd(2*b0,b2)),
            qaq(qmq(a1,a1),qmq(b1,b1))
        ),
        qaq(qmd(-2*cx,a2),qmd(-2*cy,b2))
    );


    // (2*a0*a1 + 2*b0*b1) - (2*a1*cx + 2*b1*cy)
    const t1 = qdifq(
        qaq(qmd(2*a0,a1),qmd(2*b0,b1)),
        qaq(qmd(2*cx,a1),qmd(2*cy,b1))
    );  


    // - 2*(a0*cx + b0*cy) + (((a0**2 + b0**2) + (cx**2 + cy**2)) - r**2)
    const t0 = qaq(
        qmn2(qaq(tp(a0,cx),tp(b0,cy))),    // -2*(a0*cx + b0*cy)
        qdifq(
            qaq(
                qaq(tp(a0,a0),tp(b0,b0)),  // a0**2 + b0**2
                qaq(tp(cx,cx),tp(cy,cy))   // cx**2 + cy**2
            ),
            tp(r,r)                        // r**2
        )
    );  

    return [t6,t5,t4,t3,t2,t1,t0];
}


/**
 * @param circle a circle
 * @param ps a quadratic bezier curve
 * 
 * @internal
 */
function getCoeffsQuadraticDd(
        circle: { center: number[], radius: number}, 
        ps: number[][]): number[][] {

    const { radius: r, center: [cx, cy] } = circle;
    const [[a2,a1,a0],[b2,b1,b0]] = getXY2Dd(ps);

    // a2*a2 + b2*b2
    const t4 = qaq(qmq(a2,a2),qmq(b2,b2));

    // 2*a1*a2 + 2*b1*b2 
    const t3 = qaq(qmq(qm2(a1),a2),qmq(qm2(b1),b2));

    // ((2*a0*a2 + 2*b0*b2) + (a1*a1 + b1*b1)) + (-2*a2*cx + -2*b2*cy)
    const t2 = qaq(
        qaq(
            qaq(qmd(2*a0,a2),qmd(2*b0,b2)),
            qaq(qmq(a1,a1),qmq(b1,b1))
        ),
        qaq(qmd(-2*cx,a2),qmd(-2*cy,b2))
    );

    // (2*a0*a1 + 2*b0*b1) + (-2*a1*cx + -2*b1*cy)
    const t1 = qaq(
        qaq(qmd(2*a0,a1),qmd(2*b0,b1)),
        qaq(qmd(-2*cx,a1),qmd(-2*cy,b1))
    );

    // ((a0*a0 + b0*b0) + (-2*a0*cx + -2*b0*cy)) + ((cx*cx + cy*cy) - r*r)
    const t0 = qaq(
        qaq(
            qaq(tp(a0,a0),tp(b0,b0)),
            qaq(tp(-2*a0,cx),tp(-2*b0,cy))
        ),
        qdifq(
            qaq(tp(cx,cx),tp(cy,cy)),
            tp(r,r)
        )
    );

    return [t4,t3,t2,t1,t0];
}


/**
 * @param circle a circle
 * @param ps a linear bezier curve
 * 
 * @internal
 */
function getCoeffsLinearDd(
        circle: { center: number[], radius: number}, 
        ps: number[][]): number[][] {

    const { radius: r, center: [cx, cy] } = circle;
    const [[a1,a0],[b1,b0]] = getXY1Dd(ps);

    // a1**2 + b1**2
    const t2 = qaq(qmq(a1,a1),qmq(b1,b1));

    // 2*((a0*a1 + b0*b1) - (a1*cx + b1*cy))
    const t1 = qm2(
        qdifq(
            qaq(qmd(a0,a1),qmd(b0,b1)),
            qaq(qmd(cx,a1),qmd(cy,b1))
        )
    );

    // ((-2*a0*cx + -2*b0*cy) + (a0*a0 + b0*b0)) + ((cx*cx + cy*cy) - r*r)
    const t0 = qaq(
        qaq(
            qmn2(qaq(tp(a0,cx),tp(b0,cy))),
            qaq(tp(a0,a0),tp(b0,b0))
        ),
        qdifq(
            qaq(tp(cx,cx),tp(cy,cy)),
            tp(r,r)
        )
    );

    return [t2,t1,t0];
}


export { getCoeffsCubicDd, getCoeffsQuadraticDd, getCoeffsLinearDd }
    