/**
 * Returns an EFT (error free transformation) for the Horner evaluation of a
 * polymial at a specified x.
 * see https://hal.archives-ouvertes.fr/hal-00107222/document
 * (Faithful Polynomial Evaluation with Compensated Horner Algorithm)
 * Philippe Langlois, Nicolas Louvet. Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f
 */
declare function EFTHorner(p: number[], x: number): {
    r̂: number;
    pπ: number[];
    pσ: number[];
};
export { EFTHorner };
