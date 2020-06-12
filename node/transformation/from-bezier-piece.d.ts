import { BezierPart } from "../bezier-part";
/**
 * Returns a new bezier from the given bezier by limiting its t range.
 *
 * Uses de Casteljau's algorithm.
 *
 * @param bezierPart A partial bezier
 */
declare function bezierFromPart(bezierPart: BezierPart): number[][];
export { bezierFromPart };
