/**
 *
 * @param circle a circle
 * @param ps a cubic bezier curve
 */
declare function getCoeffsCubicExact(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[][];
/**
 *
 * @param circle a circle
 * @param ps a quadratic bezier curve
 */
declare function getCoeffsQuadraticExact(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[][];
/**
 *
 * @param circle a circle
 * @param ps a linear bezier curve
 */
declare function getCoeffsLinearExact(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[][];
export { getCoeffsCubicExact, getCoeffsQuadraticExact, getCoeffsLinearExact };
