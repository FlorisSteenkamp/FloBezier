
/** 
 * Returns the cross product signed magnitude between two 2-vectors.
 * @param a the first vector
 * @param b the second vector
 */
 function cross(a: number[], b: number[]): number {
    return a[0]*b[1] - a[1]*b[0]; 
}


export { cross }
