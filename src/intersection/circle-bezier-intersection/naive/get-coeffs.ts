
import { getXY } from "../../../to-power-basis/get-xy";


/**
 * 
 * @param circle a circle
 * @param ps a cubic bezier curve
 */
function getCoeffsCubic(
        circle: { center: number[], radius: number}, 
        ps: number[][]) {

    let { radius: r, center: [cx, cy] } = circle;
    let [[a3,a2,a1,a0],[b3,b2,b1,b0]] = getXY(ps);

    // (a3*a3 + b3*b3)*t**6 + 
    let t6 = a3*a3 + b3*b3;

    // (2*a2*a3 + 2*b2*b3)*t**5 + 
    let t5 = 2*(a2*a3 + b2*b3);

    // (2*a1*a3 + a2*a2 + 2*b1*b3 + b2*b2)*t**4 + 
    let t4 = 2*(a1*a3 + b1*b3) + a2*a2 + b2*b2;

    // (2*a0*a3 + 2*a1*a2 - 2*a3*cx + 2*b0*b3 + 2*b1*b2 - 2*b3*cy)*t**3 + 
    let t3 = 2*(a0*a3 + a1*a2 - a3*cx + b0*b3 + b1*b2 - b3*cy);

    // (2*a0*a2 + a1*a1 - 2*a2*cx + 2*b0*b2 + b1*b1 - 2*b2*cy)*t**2 + 
    let t2 = 2*(a0*a2 - a2*cx + b0*b2 - b2*cy) + a1*a1 + b1*b1;

    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    let t1 = 2*(a0*a1 - a1*cx + b0*b1 - b1*cy);

    // a0*a0 - 2*a0*cx + b0*b0 - 2*b0*cy + cx*cx + cy*cy - r*r
    let t0 = -2*(a0*cx + b0*cy) + a0*a0 + b0*b0 + cx*cx + cy*cy - r*r;

    return [t6, t5, t4, t3, t2, t1, t0];
}


/**
* 
* @param circle a circle
* @param ps a quadratic bezier curve
*/
function getCeoffsQuadratic(
        circle: { center: number[], radius: number}, 
        ps: number[][]) {

    let { radius: r, center: [cx, cy] } = circle;
    let [[a2,a1,a0],[b2,b1,b0]] = getXY(ps);

    // (a2*a2 + b2*b2)*t**4 + 
    let t4 = a2*a2 + b2*b2;

    // (2*a1*a2 + 2*b1*b2)*t**3 + 
    let t3 = 2*(a1*a2 + b1*b2);

    // (2*a0*a2 + a1*a1 - 2*a2*cx + 2*b0*b2 + b1*b1 - 2*b2*cy)*t**2 + 
    let t2 = 2*(a0*a2 - a2*cx + b0*b2 - b2*cy) + a1*a1 + b1*b1;

    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    let t1 = 2*(a0*a1 - a1*cx + b0*b1 - b1*cy);

    // a0*a0 - 2*a0*cx + b0*b0 - 2*b0*cy + cx*cx + cy*cy - r*r
    let t0 = -2*(a0*cx + b0*cy) + a0*a0 + b0*b0 + cx*cx + cy*cy - r*r;

    return [t4, t3, t2, t1, t0];
}


/**
* 
* @param circle a circle
* @param ps a linear bezier curve
*/
function getCeoffsLine(
        circle: { center: number[], radius: number}, 
        ps: number[][]) {

    let { radius: r, center: [cx, cy] } = circle;
    let [[a1,a0],[b1,b0]] = getXY(ps);


    // (a1**2 + b1**2)*t**2 +
    let t2 = a1*a1 + b1*b1;

    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    let t1 = 2*(a0*a1 - a1*cx + b0*b1 - b1*cy);

    // a0*a0 - 2*a0*cx + b0*b0 - 2*b0*cy + cx*cx + cy*cy - r*r
    let t0 = -2*(a0*cx + b0*cy) + a0*a0 + b0*b0 + cx*cx + cy*cy - r*r;

    return [t2, t1, t0];
}


export { getCoeffsCubic, getCeoffsQuadratic, getCeoffsLine }
