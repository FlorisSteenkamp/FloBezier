
/**
 * Returns true if the 2 given axis-aligned rectangular boxes intersect.
 * @param a An axis-aligned rectangular box
 * @param b Another axis-aligned rectangular box
 * @param closed (defaults to false) Interpret boxes as being closed (i.e. they
 * contain their border) or open. If open then if both boxes have zero area 
 * then they are both considered close.
 */
function areBoxesIntersectingDd(closed: boolean) {
    return (a: number[][][], b: number[][][]) => {

        let [[ax0, ay0],[ax1, ay1]] = a;
        let [[bx0, by0],[bx1, by1]] = b;

        // If open then if both boxes have zero area then they are both 
        // considered closed.
        /*if ((ax0 === ax1 || ay0 === ay1) && (bx0 === bx1 || by0 === by1)) {
            closed = true;
        }*/

        // Swap so smaller coordinate comes first
        if (ay0[1] > ay1[1] || ay0[1] === ay1[1] && ay0[0] > ay1[0]) { [ay0,ay1] = [ay1,ay0] }
        if (by0[1] > by1[1] || by0[1] === by1[1] && by0[0] > by1[0]) { [by0,by1] = [by1,by0] }
        if (ax0[1] > ax1[1] || ax0[1] === ax1[1] && ax0[0] > ax1[0]) { [ax0,ax1] = [ax1,ax0] }
        if (bx0[1] > bx1[1] || bx0[1] === bx1[1] && bx0[0] > bx1[0]) { [bx0,bx1] = [bx1,bx0] }

        return closed
            ? (
                //ax0 <= bx1 && ax1 >= bx0 && 
                //by0 <= ay1 && by1 >= ay0
                (ax0[1] < bx1[1] || (ax0[1] === bx1[1] && ax0[0] <= bx1[0])) &&
                (ax1[1] > bx0[1] || (ax1[1] === bx0[1] && ax1[0] >= bx0[0])) &&
                (by0[1] < ay1[1] || (by0[1] === ay1[1] && by0[0] <= ay1[0])) &&
                (by1[1] > ay0[1] || (by1[1] === ay0[1] && by1[0] >= ay0[0]))
            )
            : (
                //ax0 < bx1 && ax1 > bx0 && 
                //by0 < ay1 && by1 > ay0
                (ax0[1] < bx1[1] || (ax0[1] === bx1[1] && ax0[0] < bx1[0])) &&
                (ax1[1] > bx0[1] || (ax1[1] === bx0[1] && ax1[0] > bx0[0])) &&
                (by0[1] < ay1[1] || (by0[1] === ay1[1] && by0[0] < ay1[0])) &&
                (by1[1] > ay0[1] || (by1[1] === ay0[1] && by1[0] > ay0[0]))
            );
    }
}


export { areBoxesIntersectingDd }
