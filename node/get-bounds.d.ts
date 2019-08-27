/**
 * Calculates and returns general bezier bounds.
 * @returns The axis-aligned bounding box together with the t values
 * where the bounds on the bezier are reached.
 */
declare let getBounds: (a: number[][]) => {
    ts: number[][];
    box: number[][];
};
export { getBounds };
