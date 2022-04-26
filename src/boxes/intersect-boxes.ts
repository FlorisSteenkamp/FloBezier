const min = Math.min;
const max = Math.max;


/**
 * Returns the intersection of 2 given axis-aligned rectangular boxes (or 
 * `undefined` if they don't intersect).
 * 
 * * **exact**: not susceptible to floating point round-off
 * * **closed**: interpret boxes as being closed (i.e. they contain their border).
 * 
 * @param a an axis-aligned rectangular box (given by an array of two points,
 * e.g. `[[1,2], [3,4]]`)
 * @param b another box
 * 
 * @doc mdx
 */
function intersectBoxes(
        a: number[][], b: number[][]): number[][] | undefined {

    let [[ax0, ay0], [ax1, ay1]] = a;
    let [[bx0, by0], [bx1, by1]] = b;

    // Swap so smaller coordinate comes first
    if (ax0 > ax1) { [ax0,ax1] = [ax1,ax0] };
    if (bx0 > bx1) { [bx0,bx1] = [bx1,bx0] };
    if (ay0 > ay1) { [ay0,ay1] = [ay1,ay0] };
    if (by0 > by1) { [by0,by1] = [by1,by0] };

    if (!(ax0 <= bx1 && ax1 >= bx0 && 
        by0 <= ay1 && by1 >= ay0)) {

        // they don't intersect
        return undefined;
    }

    return [
        [max(ax0,bx0), max(ay0,by0)],
        [min(ax1,bx1), min(ay1,by1)]
    ];
}


export { intersectBoxes }
