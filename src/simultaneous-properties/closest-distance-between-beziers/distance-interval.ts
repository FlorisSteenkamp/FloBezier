
/** @internal */
interface DistanceInterval {
    readonly tS: number;
    readonly tE: number;
    readonly pL: number[];
    readonly pR: number[];
    readonly dL: number;  // distance left
    readonly dR: number;  // distance right
    readonly eL: number;  // error left
    readonly eR: number;  // error right
}


export type { DistanceInterval }
