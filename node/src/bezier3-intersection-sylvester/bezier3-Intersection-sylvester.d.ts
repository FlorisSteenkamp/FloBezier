/**
 * Returns the intersection points between two cubic beziers. This function is
 * not numerically stable and thus not publically exposed. It can not, for
 * instance, handle cases where one or both beziers degenerate into a quadratic
 * bezier. Use for experimentation and comparison only.
 * @ignore
 * @param ps1 - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param ps2 - Another cubic bezier
 * @returns The t-value pairs at intersection of the first
 * and second beziers respectively.
 * See <a href="http://mat.polsl.pl/sjpam/zeszyty/z6/Silesian_J_Pure_Appl_Math_v6_i1_str_155-176.pdf">
 * this paper</a>
 */
declare function bezier3IntersectionSylvester(ps1: number[][], ps2: number[][]): number[][];
export { bezier3IntersectionSylvester };
