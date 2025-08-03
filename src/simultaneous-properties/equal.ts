/**
 * Returns `true` if the two given bezier curves are exactly equal when compared
 * by value (deep equality), `false` otherwise
 * 
 * @param ps1 an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param ps2 another bezier curve
 * 
 * @doc
 */
function equal(
        ps1: number[][], 
        ps2: number[][]): boolean {

    if (ps1 === ps2) { return true; }

    if (ps1.length !== ps2.length) { return false; }
    
    for (let i=0; i<ps1.length; i++) {
        if (ps1[i][0] !== ps2[i][0] || ps1[i][1] !== ps2[i][1]) {
            return false;
        }
    }

    return true;
}


export { equal }
