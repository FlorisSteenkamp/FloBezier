/**
 * MA two interior footpoints, cubic B: the intersection of the normals of `B`
 * at `s1` and `s2` is `(Nx/D, Ny/D)`; returns `[Nx, Ny, D]` in terms of
 * `σ = s1 + s2`, `π = s1·s2`, each as `c[i][j]`, the coefficient of `σ^i π^j`
 * (58 terms; multiplications: 140 without sharing,
 * 87 with 19 shared products)
 */
declare function maN_B3(bx: number[], by: number[]): number[][][];
export { maN_B3 };
