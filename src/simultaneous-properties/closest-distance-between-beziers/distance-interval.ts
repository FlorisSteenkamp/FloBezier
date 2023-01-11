
/** @internal */
interface DistanceInterval {
    tS: number;
    tE: number;
    pL: number[];
    pR: number[];
    dL: number;  // distance left
    dR: number;  // distance right
    eL: number;  // error left
    eR: number;  // error right
}


export { DistanceInterval }
