/**
 * @param P
 * @param dQ Distance to fat line's zero line
 * @param dMin
 * @param dMax
 */
declare function geoClip(P: number[][], dQ: (p: number[]) => number, dMin: number, dMax: number): {
    tMin: number;
    tMax: number;
};
export { geoClip };
