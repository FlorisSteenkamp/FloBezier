/**
 * PRECONDITION: Control points have max 13-bit significand aligned to grid
 * accuracy.
 *
 * Returns the intersection points between two cubic beziers.
 *
 * Note: Determinant calculated using https://www.dcode.fr/matrix-determinant
 *
 * See: http://mat.polsl.pl/sjpam/zeszyty/z6/Silesian_J_Pure_Appl_Math_v6_i1_str_155-176.pdf
 *
 * @param ps1 - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param ps2 - Another cubic bezier
 * See http://mat.polsl.pl/sjpam/zeszyty/z6/Silesian_J_Pure_Appl_Math_v6_i1_str_155-176.pdf
 */
declare function bezier3IntersectionSylvester(ps1: number[][], ps2: number[][]): void;
export { bezier3IntersectionSylvester };
