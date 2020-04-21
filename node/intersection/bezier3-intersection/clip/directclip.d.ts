/**
 * This is the directClip version of the cubic bezier curve intersection
 * algorithm. Since a cubic needs to be solved as opposed to two quadratics as
 * in GeoClip, GeoClip is faster.
 */
declare function directClip(P: number[][], dQ: (p: number[]) => number, dMin: number, dMax: number): {
    tMin: number;
    tMax: number;
};
export { directClip };
