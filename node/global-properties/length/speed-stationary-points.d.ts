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
declare function getSpeedStationaryPoints(ps: number[][], tS: number, tE: number): number[];
export { getSpeedStationaryPoints };
