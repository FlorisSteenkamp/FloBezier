/**
 * MA two interior footpoints, A of degree 1, B of degree 2: `G(σ,π)` (the implicit form
 * of `A` at the intersection of the normals of `B` at `s1`, `s2`; `σ = s1 + s2`,
 * `π = s1·s2`) as `g[j][i]`, the coefficient of `σ^i π^j`
 * (12 terms; multiplications: 35 without sharing,
 * 22 with 6 shared products)
 */
declare function maiG_A1B2(v: number[], bx: number[], by: number[]): number[][];
export { maiG_A1B2 };
