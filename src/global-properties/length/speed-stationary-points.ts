import { allRoots } from "flo-poly";
import { toPowerBasis_1stDerivative } from "../../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js";


/**
 * Returns the parameter `t` values (strictly within the given interval and in
 * ascending order) at which the speed (i.e. `|B'(t)|`) of the given bezier
 * curve is stationary, i.e. where `d/dt |B'(t)|² = 0`.
 *
 * * the speed minima are where the speed is hardest to integrate (e.g. at or
 * near a cusp the speed has a sharp minimum) so splitting the integration
 * interval at these points makes quadrature converge much faster
 *
 * @param ps an order 1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param tS the start of the interval
 * @param tE the end of the interval (must be larger than `tS`)
 *
 * @internal
 */
function getSpeedStationaryPoints(
        ps: number[][],
        tS: number,
        tE: number): number[] {

    const [dX, dY] = toPowerBasis_1stDerivative(ps);

    // Pad to quadratic (i.e. `[a2,a1,a0]`) for lower order curves
    while (dX.length < 3) { dX.unshift(0); dY.unshift(0); }

    const [a2,a1,a0] = dX;
    const [b2,b1,b0] = dY;

    // The derivative of the speed squared, i.e. `d/dt (dx² + dy²)`,
    // i.e. `2*(dx*dx' + dy*dy')`, is a cubic (the factor 2 is irrelevant)
    const qd = [
        2*(a2*a2 + b2*b2),
        3*(a2*a1 + b2*b1),
        a1*a1 + b1*b1 + 2*(a2*a0 + b2*b0),
        a1*a0 + b1*b0
    ];

    // Remove leading zeros (for lower order curves)
    while (qd.length > 0 && qd[0] === 0) { qd.shift(); }
    if (qd.length <= 1) { return []; }  // constant - no stationary points

    return allRoots(qd, tS, tE)
        .filter(t => t > tS && t < tE)
        .sort((a,b) => a - b);
}


export { getSpeedStationaryPoints }
