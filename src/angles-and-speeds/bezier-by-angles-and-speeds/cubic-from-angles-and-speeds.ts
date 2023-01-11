import { rotate, translate } from "flo-vector2d";
import { fromPowerBasis } from "../../from-power-basis/from-power-basis.js";
import { AnglesAndSpeeds } from "./angles-and-speeds.js";


const { cos, sin } = Math;


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
 function cubicFromAnglesAndSpeeds(anglesAndSpeeds: AnglesAndSpeeds) {
    const { α, β, s0, s1, L, rot, p } = anglesAndSpeeds;
    const x3 = L*(-2 + s0*cos(α) + s1*cos(β));
    const x2 = L*(3 - 2*s0*cos(α) - s1*cos(β));
    const x1 = L*(s0*cos(α));
    const x0 = L*(0);

    const y3 = L*(s0*sin(α) + s1*sin(β));
    const y2 = L*(-2*s0*sin(α) - s1*sin(β))
    const y1 = L*(s0*sin(α));
    const y0 = L*(0);

    return fromPowerBasis([[x3,x2,x1,x0],[y3,y2,y1,y0]])
        .map(rotate(sin(rot), cos(rot)))
        .map(translate(p));
}


export { cubicFromAnglesAndSpeeds }
