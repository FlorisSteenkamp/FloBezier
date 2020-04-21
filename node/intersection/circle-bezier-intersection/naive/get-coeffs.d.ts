/**
 *
 * @param circle a circle
 * @param ps a cubic bezier curve
 */
declare function getCoeffsCubic(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[];
/**
*
* @param circle a circle
* @param ps a quadratic bezier curve
*/
declare function getCeoffsQuadratic(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[];
/**
*
* @param circle a circle
* @param ps a linear bezier curve
*/
declare function getCeoffsLine(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[];
export { getCoeffsCubic, getCeoffsQuadratic, getCeoffsLine };
