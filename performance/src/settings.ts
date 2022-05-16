// * wilkinson -> stewart error counters
// * error counters need to be DOUBLED!!!! for DOUBLE_DOUBLE precision due to `qmq` !!!!!!!! (if applicable)
//
// * test with lower order beziers disguised as higher order
//   (thus will allRootsCertified be able to cope with 0 leading coefficients)
// * test with degenerate to point cases
// * finish geo-clip
// * test with expanding grid ?
// * retest same k family
// * also test polynomial curves (e.g. normal quadratics and cubics)
// * test `isPointOnBezierExtension` where the cubic is really a quad
// * tests
// * change tsconfig back to use include files: src or something


const tc = transformCoordinatesBL(2*640, 2*384);
const tcml = transformCoordinatesML(2*640, 2*384);

//const squashFactor = 2**46;
const squashFactor = 2**0;
const maxCoordinateX = 1;
const maxCoordinateY = 1/squashFactor;
//const expMax = Math.ceil(Math.log2(Math.max(maxCoordinateX, maxCoordinateY)));
const settings = {
    timingOnly: false,
    /** the number of bezier pairs (=== number of beziers / 2) */
    num: 100_000,
    maxBitLength: 53,

    showNaive: true,
    showNative: true,
    showPaper: true,
    showGeo: true,
    transY: 0,
    maxCoordinateX,
    squashFactor,
    maxCoordinateY,
    scaleFactor: 1,

    showNaiveXs: false,
    showNativeXs: true,
    showGeoXs: true,
    showPaperXs: true,
    showGeoIters: true,

    tc, tcml
}


/**
 * such that width === 10x2, height = 6x2, [0,0] is at the Bottom Left
 * @param width 
 * @param height 
 */
 function transformCoordinatesBL(width: number, height: number) {
    return (c: number[]) => {
        //const factor = (width/2);
        const factor = height;
        const x = c[0] * factor;
        const y = c[1] * factor;
        
        return [x, -y + height];
    }
}


function transformCoordinatesML(width: number, height: number) {
    return (c: number[]) => {
        const x = c[0] * width;
        const y = c[1] * height;
        
        return [x, height/2 - y];
    }
}


export { settings }
