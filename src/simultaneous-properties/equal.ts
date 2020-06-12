
/**
 * Returns true if the two beziers are deeply equal
 * @param psA an order 2, 3 or 4 bezier curve
 * @param psB another bezier curve
 */
function equal(psA: number[][], psB: number[][]) {
    if (psA === psB) { return true; }

    if (psA.length !== psB.length) { return false; }
    
    for (let i=0; i<psA.length; i++) {
        if (psA[i][0] !== psB[i][0] || psA[i][1] !== psB[i][1]) {
            return false;
        }
    }

    return true;
}


export { equal }
