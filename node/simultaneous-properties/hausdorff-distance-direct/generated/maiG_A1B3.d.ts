/**
 * MA two interior footpoints, A of degree 1, B cubic: `G(σ,π)` (the implicit form
 * of `A` at the intersection of the normals of `B` at `s1`, `s2`; `σ = s1 + s2`,
 * `π = s1·s2`) as `g[j][i]`, the coefficient of `σ^i π^j`
 * (58 terms; multiplications: 197 without sharing,
 * 98 with 30 shared products)
 */
declare function maiG_A1B3(v: number[], bx: number[], by: number[]): number[][];
export { maiG_A1B3 };
