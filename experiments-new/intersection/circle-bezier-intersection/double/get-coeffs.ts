import { getXY3, getXY2, getXY1 } from "../../../../src/to-power-basis/get-xy/double/get-xy";


/**
 * @param circle a circle
 * @param ps a cubic bezier curve
 * 
 * @internal
 */
function getCoeffsCubic(
        circle: { center: number[], radius: number}, 
        ps: number[][]) {

    const { radius: r, center: [cx, cy] } = circle;
    const [[a3,a2,a1,a0],[b3,b2,b1,b0]] = getXY3(ps);

    // (a3*a3 + b3*b3)*t**6 + 
    const t6 = a3*a3 + b3*b3;

    // (2*a2*a3 + 2*b2*b3)*t**5 + 
    const t5 = 2*(a2*a3 + b2*b3);

    // (2*a1*a3 + a2*a2 + 2*b1*b3 + b2*b2)*t**4 + 
    const t4 = 2*(a1*a3 + b1*b3) + a2*a2 + b2*b2;

    // (2*a0*a3 + 2*a1*a2 - 2*a3*cx + 2*b0*b3 + 2*b1*b2 - 2*b3*cy)*t**3 + 
    const t3 = 2*(a0*a3 + a1*a2 - a3*cx + b0*b3 + b1*b2 - b3*cy);

    // (2*a0*a2 + a1*a1 - 2*a2*cx + 2*b0*b2 + b1*b1 - 2*b2*cy)*t**2 + 
    const t2 = 2*(a0*a2 - a2*cx + b0*b2 - b2*cy) + a1*a1 + b1*b1;

    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    const t1 = 2*(a0*a1 - a1*cx + b0*b1 - b1*cy);

    // a0*a0 - 2*a0*cx + b0*b0 - 2*b0*cy + cx*cx + cy*cy - r*r
    const t0 = -2*(a0*cx + b0*cy) + a0*a0 + b0*b0 + cx*cx + cy*cy - r*r;

    return [t6, t5, t4, t3, t2, t1, t0];
}


/**
 * @param circle a circle
 * @param ps a quadratic bezier curve
 * 
 * @internal
 */
function getCoeffsQuadratic(
        circle: { center: number[], radius: number}, 
        ps: number[][]) {

    const { radius: r, center: [cx, cy] } = circle;
    const [[a2,a1,a0],[b2,b1,b0]] = getXY2(ps);

    // (a2*a2 + b2*b2)*t**4 + 
    const t4 = a2*a2 + b2*b2;

    // (2*a1*a2 + 2*b1*b2)*t**3 + 
    const t3 = 2*(a1*a2 + b1*b2);

    // (2*a0*a2 + a1*a1 - 2*a2*cx + 2*b0*b2 + b1*b1 - 2*b2*cy)*t**2 + 
    const t2 = 2*(a0*a2 - a2*cx + b0*b2 - b2*cy) + a1*a1 + b1*b1;

    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    const t1 = 2*(a0*a1 - a1*cx + b0*b1 - b1*cy);

    // a0*a0 - 2*a0*cx + b0*b0 - 2*b0*cy + cx*cx + cy*cy - r*r
    const t0 = -2*(a0*cx + b0*cy) + a0*a0 + b0*b0 + cx*cx + cy*cy - r*r;

    return [t4, t3, t2, t1, t0];
}


/**
 * @param circle a circle
 * @param ps a linear bezier curve
 * 
 * @internal
 */
function getCoeffsLine(
        circle: { center: number[], radius: number}, 
        ps: number[][]) {

    const { radius: r, center: [cx, cy] } = circle;
    const [[a1,a0],[b1,b0]] = getXY1(ps);


    // (a1**2 + b1**2)*t**2 +
    const t2 = a1*a1 + b1*b1;

    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    const t1 = 2*(a0*a1 - a1*cx + b0*b1 - b1*cy);

    // a0*a0 - 2*a0*cx + b0*b0 - 2*b0*cy + cx*cx + cy*cy - r*r
    const t0 = -2*(a0*cx + b0*cy) + a0*a0 + b0*b0 + cx*cx + cy*cy - r*r;

    return [t2, t1, t0];
}


export { getCoeffsCubic, getCoeffsQuadratic, getCoeffsLine }
