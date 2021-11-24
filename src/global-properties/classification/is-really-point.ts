
/**
 * TODO
 * @param ps 
 */
function isReallyPoint(ps: number[][]): boolean {
    const x = ps[0][0];
    const y = ps[0][1];

    for (let i=1; i<ps.length; i++) {
        if (x !== ps[i][0] || y !== ps[i][1]) {
            return false;
        }
    }

    return true;
}


export { isReallyPoint }
