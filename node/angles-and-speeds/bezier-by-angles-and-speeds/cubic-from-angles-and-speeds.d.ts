import { AnglesAndSpeeds } from "../angles-and-speeds.js";
/**
 * Returns a cubic bezier curve (given by its control points) with the given
 * angles-and-speeds parameters.
 *
 * @param anglesAndSpeeds the angles-and-speeds parameters, i.e. an object with
 * the following properties:
 * * `α`   -> initial tangent angle in radians
 * * `β`   -> terminal tangent angle in radians
 * * `s0`  -> initial speed
 * * `s1`  -> terminal speed
 * * `L`   -> distance between initial and final point (cannot be 0)
 * * `rot` -> rotation of entire curve
 * * `p`   -> initial position offset
 */
declare function cubicFromAnglesAndSpeeds(anglesAndSpeeds: AnglesAndSpeeds): number[][];
export { cubicFromAnglesAndSpeeds };
