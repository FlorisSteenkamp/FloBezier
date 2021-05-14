/**
 * @param circle a circle
 * @param ps a cubic bezier curve
 *
 * @internal
 */
declare function getCoeffsCubic(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[];
/**
 * @param circle a circle
 * @param ps a quadratic bezier curve
 *
 * @internal
 */
declare function getCeoffsQuadratic(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[];
/**
 * @param circle a circle
 * @param ps a linear bezier curve
 *
 * @internal
 */
declare function getCeoffsLine(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[];
export { getCoeffsCubic, getCeoffsQuadratic, getCeoffsLine };
