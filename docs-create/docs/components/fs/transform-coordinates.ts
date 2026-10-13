
/**
 * such that width === 10*2, height = 6*2, [0,0] is in middle
 * @param width 
 * @param height 
 */
function transformCoordinatesMid(width: number, height: number) {
    return (c: number[]) => {
        const factor = (width/2)/10;
        const x = c[0] * factor;
        const y = c[1] * factor;
        return [x + width/2, -y + height/2];
    }
}


/**
 * such that width === 10x2, height = 6x2, [0,0] is at the Bottom Left
 * @param width 
 * @param height 
 */
 function transformCoordinatesBL(width: number, height: number) {
    return (c: number[]) => {
        const factor = (width/2)/10;
        const x = c[0] * factor;
        const y = c[1] * factor;
        
        return [x, -y + height];
    }
}


export { transformCoordinatesMid, transformCoordinatesBL }
