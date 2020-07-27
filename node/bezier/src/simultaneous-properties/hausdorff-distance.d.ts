declare function hausdorffDistanceCandidates(ps1: number[][], ps2: number[][], maxLength: number): {
    p1: number[];
    p2: number[];
    d: number;
}[];
/**
 * Calculates and returns an approximation to the one-sided Hausdorff distance
 * from ps1 to ps2 between two bezier curves.
 * @param ps1
 * @param ps2
 * @param maxLength The first curve (ps1) will be split into pieces such that
 * each piece is shorter than maxLength. All endpoints of the smaller curves
 * are then used to check the distance to the other curve. The max of these
 * are given as an estimate of the Hausdorff distance.
 */
declare function hausdorffDistance(ps1: number[][], ps2: number[][], maxLength: number): number;
export { hausdorffDistance, hausdorffDistanceCandidates };
