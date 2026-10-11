/** @internal */
interface DistanceInterval {
    readonly tS: number;
    readonly tE: number;
    readonly pL: number[];
    readonly pR: number[];
    readonly dL: number;
    readonly dR: number;
    readonly eL: number;
    readonly eR: number;
}
export type { DistanceInterval };
