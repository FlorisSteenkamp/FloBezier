/**
 * Returns the *exact* implicit form of the given line *relative to its start
 * point* (see [[getImplicitForm1AtStartDd]] for details).
 *
 * @param ps a line, e.g. `[[1,2],[3,4]]`
 *
 * @internal
 */
declare function getImplicitForm1AtStartExact(ps: number[][]): {
    vₓ: number[];
    vᵧ: number[];
};
export { getImplicitForm1AtStartExact };
