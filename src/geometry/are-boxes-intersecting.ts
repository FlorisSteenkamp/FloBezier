
/**
 * Returns true if the 2 given axis-aligned rectangular boxes intersect.
 * @param a An axis-aligned rectangular box
 * @param a Another axis-aligned rectangular box
 * @param closed (defaults to true) Interpret boxes as being closed (i.e. they
 * contain their border) or open. If open then if both boxes have zero area 
 * then they are both considered close.
 */
function areBoxesIntersecting(closed: boolean) {
    return (a: number[][], b: number[][]) => {

        let [[ax0, ay0],[ax1, ay1]] = a;
        let [[bx0, by0],[bx1, by1]] = b;

        // If open then if both boxes have zero area then they are both 
        // considered closed.
        /*if ((ax0 === ax1 || ay0 === ay1) && (bx0 === bx1 || by0 === by1)) {
            closed = true;
        }*/

        // Swap so smaller coordinate comes first
        if (ay0 > ay1) { [ay0,ay1] = [ay1,ay0] };
        if (by0 > by1) { [by0,by1] = [by1,by0] };
        if (ax0 > ax1) { [ax0,ax1] = [ax1,ax0] };
        if (bx0 > bx1) { [bx0,bx1] = [bx1,bx0] };

        return closed
            ? (
                ax0 <= bx1 && ax1 >= bx0 && 
                by0 <= ay1 && by1 >= ay0
            )
            : (
                ax0 < bx1 && ax1 > bx0 && 
                by0 < ay1 && by1 > ay0
            )
    }
}


export { areBoxesIntersecting }
