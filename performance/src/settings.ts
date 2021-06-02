
//const tc = transformCoordinatesBL(640, 384);
const tc = transformCoordinatesBL(2*640, 2*384);

const squashFactor = 2**20;
const maxCoordinateX = 1;
const maxCoordinateY = 1/squashFactor;
const expMax = Math.ceil(Math.log2(Math.max(maxCoordinateX, maxCoordinateY)));
const settings = {
    timingOnly: true,

    showNaive: false,
    showNative: true,
    showPaper: true,
    showGeo: true,

    /** the number of bezier pairs (=== number of beziers - 1) */
    num: 25000,
    maxBitLength: 47,  // 47 ???????,    
    //maxBitLength: 53,  // 47 ???????,    
    //transY: 0.5,
    transY: 0,
    maxCoordinateX,
    squashFactor,
    maxCoordinateY,
    scaleFactor: 1,
    expMax,

    showNaiveXs: false,
    showNativeXs: false,
    showPaperXs: false,

    showGeoXs: false,
    showGeoIters: true,

    tc
}


/**
 * such that width === 10x2, height = 6x2, [0,0] is at the Bottom Left
 * @param width 
 * @param height 
 */
 function transformCoordinatesBL(width: number, height: number) {
    return (c: number[]) => {
        //const factor = (width/2);
        const factor = (height);
        const x = c[0] * factor;
        const y = c[1] * factor;
        
        return [x, -y + height];
    }
}


export { settings }
