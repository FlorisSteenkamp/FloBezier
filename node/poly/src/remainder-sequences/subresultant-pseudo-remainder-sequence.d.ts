/**
 * Returns the subresultant pseudo remainder sequence of a/b.
 * see "The subresultant polynomial remainder sequence algorithm" by Ruiyuan (Ronnie) Chen, p.10
 * https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf
 * @param f a polynomial
 * @param g another polynomial
 * @param sturm if set to true then calculate a Sturm sequence instead
 */
declare function subresultantPseudoRemainderSequence(f: number[][], g: number[][], sturm: boolean): number[][][];
export { subresultantPseudoRemainderSequence };
