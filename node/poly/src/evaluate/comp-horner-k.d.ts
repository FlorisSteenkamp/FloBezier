/**
 * see https://hal.archives-ouvertes.fr/hal-00285603/document
 *
 * For K-times compensated with K <= 4 this is the fastest known method, but
 * grows exponentially with K.
 * @param p
 * @param x
 * @param K
 */
declare function CompHornerK(p: number[], x: number, K: number): number;
export { CompHornerK };
