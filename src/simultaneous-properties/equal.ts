/**
 * Returns true if the two given bezier curves are exactly equal as compared
 * by value (deep equality)
 * 
 * @param ps1 an order 1, 2 or 3 bezier curve
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
