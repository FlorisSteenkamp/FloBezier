import { AnglesAndSpeeds } from "./angles-and-speeds.js";
/**
 * Returns a cubic bezier curve (given by its control points) with the given
 * angles-and-speeds parameters.
 *
 * @param α initial tangent angle in radians
 * @param β terminal tangent angle in radians
 * @param s0 inital speed
 * @param s1 terminal speed
 * @param L distance between initial and final point (cannot be 0)
 * @param rot rotation of entire curve
 * @param p initial position offset
 */
declare function cubicFromAnglesAndSpeeds(anglesAndSpeeds: AnglesAndSpeeds): number[][];
export { cubicFromAnglesAndSpeeds };
