
/** 
 * Returns the dot (inner) product between two 2-vectors. 
 * @param a the first vector
 * @param b the second vector
 */
 function dot(a: number[], b: number[]): number {
    return a[0]*b[0] + a[1]*b[1]; 
}


export { dot }
