/**
 * Returns a representation of the error (from which an absolute error bound
 * can be calculated) when calculating the implicit form of the given bezier
 * curve (using [[getImplicitForm1]] or [[getImplicitForm1Dd]]).
 *
 * * returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v`
 * * The returned error representation needs to be multiplied with
 * [Stewart error counters¹](https://www.amazon.ca/Introduction-Matrix-Computations-G-Stewart/dp/0126703507)
 * and an appropriate error function, `γ`, depending on the precision used (e.g. double
 * or double-double). This is explained in more detail below. See
 * also [Higham 2002](http://ftp.demec.ufpr.br/CFD/bibliografia/Higham_2002_Accuracy%20and%20Stability%20of%20Numerical%20Algorithms.pdf)
 * p. 68 near the bottom.
 *
 * (1) G. W. Stewart. Introduction to Matrix Computations. Academic Press, New York,
 *  1973. xiii+441 pp. ISBN 0-12-670350-7
 *
 * The absolute erros below can be calculated as follows (where `<E>` are the
 * error counters as indicated in the comments of the return value below):
 *  * double precision: `<E> * (γ(1)) * result_`
 *  * double-double precision: `<E> * (2*γγ(3)) * result_`
 *
 * where [[γ]] and [[γγ]] are the usual error functions (provided in this library
 * as functions with the same name) with `γ(1) === 1.1102230246251568e-16`
 * and `γγ(3) === 3.697785493223493e-32`.
 *
 * ```
 * errorBound: {
 *      vₓₓₓ_,  // <11>
 *      vₓₓᵧ_,  // <12>
 *      vₓᵧᵧ_,  // <12>
 *      vᵧᵧᵧ_,  // <11>
 *      vₓₓ_,   // <19>
 *      vₓᵧ_,   // <18>
 *      vᵧᵧ_,   // <19>
 *      vₓ_,    // <22>
 *      vᵧ_,    // <22>
 *      v_      // <24>
 * }
 * ```
 * @param ps
 *
 * @doc
 */
declare function getImplicitForm3ErrorCounters(ps: number[][]): {
    vₓₓₓ_: number;
    vₓₓᵧ_: number;
    vₓᵧᵧ_: number;
    vᵧᵧᵧ_: number;
    vₓₓ_: number;
    vₓᵧ_: number;
    vᵧᵧ_: number;
    vₓ_: number;
    vᵧ_: number;
    v_: number;
};
export { getImplicitForm3ErrorCounters };
