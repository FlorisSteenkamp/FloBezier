/**
 * MA two interior footpoints, A of degree 2, B cubic: `G(σ,π)` (the implicit form
 * of `A` at the intersection of the normals of `B` at `s1`, `s2`; `σ = s1 + s2`,
 * `π = s1·s2`) as `g[j][i]`, the coefficient of `σ^i π^j`
 * (870 terms; multiplications: 5004 without sharing,
 * 1294 with 361 shared products)
 */
declare function maiG_A2B3(v: number[], bx: number[], by: number[]): number[][];
export { maiG_A2B3 };
