/**
 * The canonical floating point error function, γ.
 * see e.g. https://hal.archives-ouvertes.fr/hal-00285603/document
 *
 * * γ is multiplied by (1+u) since it is calculated in floating point so we
 * must ensure it is bigger than the real value.
 * @param k the parameter
 */
declare function γ(n: number): number;
declare function γγ(n: number): number;
export { γ, γγ };
