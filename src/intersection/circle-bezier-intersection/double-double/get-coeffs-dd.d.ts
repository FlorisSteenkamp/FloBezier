/**
 * * **precondition** bit-algined bitlength of coefficients <= 47
 *
 * @param circle a circle
 * @param ps a cubic bezier curve
 *
 * @internal
 */
declare function getCoeffsCubicDd(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[][];
/**
 * * **precondition** bit-algined bitlength of coefficients <= 47
 *
 * @param circle a circle
 * @param ps a quadratic bezier curve
 *
 * @internal
 */
declare function getCoeffsQuadraticDd(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[][];
/**
 * * **precondition** bit-algined bitlength of coefficients <= 47
 *
 * @param circle a circle
 * @param ps a linear bezier curve
 *
 * @internal
 */
declare function getCoeffsLinearDd(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[][];
export { getCoeffsCubicDd, getCoeffsQuadraticDd, getCoeffsLinearDd };