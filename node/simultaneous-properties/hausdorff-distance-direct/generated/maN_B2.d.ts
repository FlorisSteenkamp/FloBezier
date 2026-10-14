/**
 * MA two interior footpoints, B of degree 2: the intersection of the normals of `B`
 * at `s1` and `s2` is `(Nx/D, Ny/D)`; returns `[Nx, Ny, D]` in terms of
 * `σ = s1 + s2`, `π = s1·s2`, each as `c[i][j]`, the coefficient of `σ^i π^j`
 * (12 terms; multiplications: 24 without sharing,
 * 18 with 2 shared products)
 */
declare function maN_B2(bx: number[], by: number[]): number[][][];
export { maN_B2 };
