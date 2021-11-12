import { BezierPart } from "../bezier-part.js";
/**
 * Returns a new bezier from the given bezier by limiting its t range.
 *
 * Uses de Casteljau's algorithm.
 *
 * @param bezierPart A partial bezier
 *
 * @doc
 */
declare function bezierFromPart(bezierPart: BezierPart): number[][];
export { bezierFromPart };
