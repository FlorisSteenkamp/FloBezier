declare function circleBezierIntersection(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): {
    t: number;
    p: number[];
}[];
export { circleBezierIntersection };
