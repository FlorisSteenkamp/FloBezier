/**
 * Returns the exact implicit form of the given linear bezier.
 * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps
 */
declare function getImplicitForm1Exact(ps: number[][]): {
    vₓ: number;
    vᵧ: number;
    v: number[];
};
export { getImplicitForm1Exact };
