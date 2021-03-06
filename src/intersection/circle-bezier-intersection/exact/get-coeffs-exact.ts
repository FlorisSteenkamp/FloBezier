

import { getXExact } from "../../../to-power-basis/get-x";
import { getYExact } from "../../../to-power-basis/get-y";
import { calculate, scaleExpansion, twoProduct } from "flo-numerical";


/**
 * 
 * @param circle a circle
 * @param ps a cubic bezier curve
 */
function getCoeffsCubicExact(
        circle: { center: number[], radius: number}, 
        ps: number[][]) {

    let { radius: r, center: c } = circle;
    let [cx, cy] = c;
    let [a3,a2,a1,a0] = getXExact(ps);
    let [b3,b2,b1,b0] = getYExact(ps);

    // (a3**2 + b3**2)*t**6 + 
    let t6 = calculate([
        [a3,a3], 
        [b3,b3]
    ]);

    // (2*a2*a3 + 2*b2*b3)*t**5 + 
    let t5 = scaleExpansion(calculate([
        [a2,a3], 
        [b2,b3]
    ]), 2);

    // (2*a1*a3 + a2**2 + 2*b1*b3 + b2**2)*t**4 + 
    let t4 = calculate([
        [[2],a1,a3], [a2,a2], [[2],b1,b3], [b2,b2]
    ]);

    // (2*a0*a3 + 2*a1*a2 - 2*a3*cx + 2*b0*b3 + 2*b1*b2 - 2*b3*cy)*t**3 + 
    let t3 = scaleExpansion(calculate([
        [a0,a3], [a1,a2], [[-1],a3,[cx]], [b0,b3], [b1,b2], [[-1],b3,[cy]]
    ]), 2);
    

    // (2*a0*a2 + a1**2 - 2*a2*cx + 2*b0*b2 + b1**2 - 2*b2*cy)*t**2 + 
    let t2 = calculate([
        [[2],a0,a2], [a1,a1], [[-2],a2,[cx]], [[2],b0,b2], [b1,b1], [[-2],b2,[cy]]
    ]);

    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    let t1 = scaleExpansion(calculate([
        [a0,a1], [[-1],a1,[cx]], [b0,b1], [[-1],b1,[cy]]
    ]), 2);

    // a0**2 - 2*a0*cx + b0**2 - 2*b0*cy + cx**2 + cy**2 - r**2
    let t0 = calculate([
        [a0,a0], [[-2],a0,[cx]], [b0,b0], [[-2],b0,[cy]], 
        [twoProduct(cx,cx)], [twoProduct(cy,cy)], [twoProduct(-r,r)]
    ]);

    return [t6, t5, t4, t3, t2, t1, t0];
}


/**
 * 
 * @param circle a circle
 * @param ps a quadratic bezier curve
 */
function getCoeffsQuadraticExact(
        circle: { center: number[], radius: number}, 
        ps: number[][]) {

    let { radius: r, center: c } = circle;
    let [cx, cy] = c;
    let [a2,a1,a0] = getXExact(ps);
    let [b2,b1,b0] = getYExact(ps);

    // (a2**2 + b2**2)*t**4 + 
    let t4 = calculate([
        [a2,a2], 
        [b2,b2]
    ]);

    // (2*a1*a2 + 2*b1*b2)*t**3 + 
    let t3 = scaleExpansion(calculate([
        [a1,a2], 
        [b1,b2]
    ]), 2);

    // (2*a0*a2 + a1**2 - 2*a2*cx + 2*b0*b2 + b1**2 - 2*b2*cy)*t**2 + 
    let t2 = calculate([
        [[2],a0,a2], [a1,a1], [[-2],a2,[cx]], [[2],b0,b2], [b1,b1], [[-2],b2,[cy]]
    ]);

    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    let t1 = scaleExpansion(calculate([
        [a0,a1], [[-1],a1,[cx]], [b0,b1], [[-1],b1,[cy]]
    ]), 2);

    // a0**2 - 2*a0*cx + b0**2 - 2*b0*cy + cx**2 + cy**2 - r**2
    let t0 = calculate([
        [a0,a0], [[-2],a0,[cx]], [b0,b0], [[-2],b0,[cy]], 
        [twoProduct(cx,cx)], [twoProduct(cy,cy)], [twoProduct(-r,r)]
    ]);

    return [t4, t3, t2, t1, t0];
}


/**
 * 
 * @param circle a circle
 * @param ps a linear bezier curve
 */
function getCoeffsLinearExact(
        circle: { center: number[], radius: number}, 
        ps: number[][]) {

    let { radius: r, center: c } = circle;
    let [cx, cy] = c;
    let [a1,a0] = getXExact(ps);
    let [b1,b0] = getYExact(ps);


    // (a1**2 + b1**2)*t**2 +
    let t2 = calculate([
        [a1,a1], 
        [b1,b1]
    ]);

    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    let t1 = scaleExpansion(calculate([
        [a0,a1], [[-1],a1,[cx]], [b0,b1], [[-1],b1,[cy]]
    ]), 2);

    // a0**2 - 2*a0*cx + b0**2 - 2*b0*cy + cx**2 + cy**2 - r**2
    let t0 = calculate([
        [a0,a0], [[-2],a0,[cx]], [b0,b0], [[-2],b0,[cy]], 
        [twoProduct(cx,cx)], [twoProduct(cy,cy)], [twoProduct(-r,r)]
    ]);

    return [t2, t1, t0];
}


export { getCoeffsCubicExact, getCoeffsQuadraticExact, getCoeffsLinearExact }
