
/** @internal */
interface HausdorffInterval {
    readonly tS: number;
    readonly tE: number;
    readonly hL: number;   // Hausdorff distance left
    readonly hR: number;   // Hausdorff distance right
    readonly hEL: number;  // Hausdorff error left
    readonly hER: number;  // Hausdorff error right
}


export type { HausdorffInterval }
