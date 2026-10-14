/**
 * MA two interior footpoints, A of degree 3, B cubic: `G(σ,π)` (the implicit form
 * of `A` at the intersection of the normals of `B` at `s1`, `s2`; `σ = s1 + s2`,
 * `π = s1·s2`) as `g[j][i]`, the coefficient of `σ^i π^j`
 * (6168 terms; multiplications: 49810 without sharing,
 * 8287 with 1927 shared products)
 */
declare function maiG_A3B3(v: number[], bx: number[], by: number[]): number[][];
export { maiG_A3B3 };
