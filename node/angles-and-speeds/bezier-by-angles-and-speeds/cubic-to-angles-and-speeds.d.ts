import { AnglesAndSpeeds } from "../angles-and-speeds";
/**
 * For the given bernstein cubic bezier curve basis return the angles-and-speeds
 * basis coefficients, i.e.
 * * α   -> initial tangent angle in degrees
 * * β   -> terminal tangent angle in degrees
 * * s0  -> inital speed
 * * s1  -> terminal speed
 * * L   -> distance between initial and final point (cannot be 0)
 * * rot -> rotation of entire curve
 * * p   -> initial position offset
 *
 * @param ps an order 3 (cubic) bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
declare function cubicToAnglesAndSpeeds(ps: number[][]): AnglesAndSpeeds;
export { cubicToAnglesAndSpeeds };
