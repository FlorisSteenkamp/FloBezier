
function toExpansion(ps: number[][]): number[][][] {
    return ps.map(p => p.map(c => [c]));
}


export { toExpansion }
