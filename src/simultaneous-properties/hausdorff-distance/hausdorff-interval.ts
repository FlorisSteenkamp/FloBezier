
/** @internal */
interface HausdorffInterval {
    tS: number;
    tE: number;
    hL: number;   // Hausdorff distance left
    hR: number;   // Hausdorff distance right
    hEL: number;  // Hausdorff error left
    hER: number;  // Hausdorff error right
}


export { type HausdorffInterval }
