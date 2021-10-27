import { RootInterval } from "./root-interval";
import { RootIntervalExp } from "./root-interval-exp";
/**
 * Returns once compensated root(s) (bar underflow / overflow) given a root
 * interval previously calculated using [[allRootsCertified]].
 *
 * * 'once-compensated' here means that the typical root interval, `W`,
 * (`= Number.EPSILON` at `1`) is reduced to `W**2`; if multiple roots were
 * present in the original interval they may be resolved to individual
 * intervals
 *
 * @param ri a root interval previously calculated
 * @param p the exact polynomial with coefficients given densely as an array of
 * Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
declare function refineK1(ri: RootInterval, p: number[][]): RootIntervalExp[];
export { refineK1 };
