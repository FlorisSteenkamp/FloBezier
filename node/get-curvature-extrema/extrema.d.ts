/**
 * Curve extrema
 *
 * @doc
 */
interface Extrema {
    /** list of paramter t values where minima occur */
    readonly minima: number[];
    /** list of paramter t values where maxima occur */
    readonly maxima: number[];
    /** list of paramter t values where inflection points occur */
    readonly inflections: number[];
}
export type { Extrema };
