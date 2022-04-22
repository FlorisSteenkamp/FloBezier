/**
 * Calculates and returns an approximation to the one-sided Hausdorff distance
 * from ps1 to ps2 between two bezier curves in a naive way.
 *
 * @param A
 * @param B
 * @param maxLength The first curve (ps1) will be split into pieces such that
 * each piece is shorter than maxLength. All endpoints of the smaller curves
 * are then used to check the distance to the other curve. The max of these
 * are given as an estimate of the Hausdorff distance.
 */
declare function H(A: number[][], B: number[][], maxLength: number): number;
/**
* Calculates and returns an approximation to the two-sided Hausdorff distance
* in a naive way.
*/
declare function HH(A: number[][], B: number[][], maxLength: number): number;
export { H, HH };
