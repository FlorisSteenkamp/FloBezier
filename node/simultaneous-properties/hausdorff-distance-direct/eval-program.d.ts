/**
 * A polynomial "program" as produced by `gen-resultants.py`: the polynomials
 * are stored as data and evaluated by a loop (which V8 optimizes quickly), not
 * as generated straight-line code (which mostly stays interpreted).
 *
 * Slots `0 .. nIn-1` of the work array `T` hold the inputs; slot `nIn + k` holds
 * the `k`-th shared product `T[pairs[2k]]*T[pairs[2k+1]]`. Output `o` is
 * `Σ coef[t]·Π T[fidx[f]]` over terms `t ∈ [ostart[o], ostart[o+1])` and
 * factors `f ∈ [fstart[t], fstart[t+1])`.
 */
interface Program {
    /** the number of inputs */
    readonly nIn: number;
    /** shared products as index pairs */
    readonly pairs: Int32Array;
    /** term coefficients */
    readonly coef: Float64Array;
    /** start of each term's factors in `fidx` (one extra entry at the end) */
    readonly fstart: Int32Array;
    /** factor indices into `T` */
    readonly fidx: Int32Array;
    /** start of each output's terms (one extra entry at the end) */
    readonly ostart: Int32Array;
}
/**
 * Evaluates the program for the given inputs.
 *
 * @param P the program
 * @param inputs the input values (`P.nIn` of them)
 */
declare function evalProgram(P: Program, inputs: number[]): Float64Array;
export type { Program };
export { evalProgram };
/**
 * A flattened `Program`: every term is `coef[t]·T[fidx[t]]` (single factor;
 * multi-factor products are folded into extra shared products) and constant
 * terms are collected per output in `c0` - the evaluation loop has no inner
 * loop.
 */
interface Program2 {
    readonly nIn: number;
    readonly pairs: Int32Array;
    readonly coef: Float64Array;
    readonly fidx: Int32Array;
    readonly ostart: Int32Array;
    readonly c0: Float64Array;
}
declare function evalProgram2(P: Program2, inputs: number[]): Float64Array;
export type { Program2 };
export { evalProgram2 };
