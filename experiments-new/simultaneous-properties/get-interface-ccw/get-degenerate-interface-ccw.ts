import { dot } from './dot';
import { cross } from './cross';


/**
 * @internal
 */
function getDegenerateInterfaceCcw([
        x10,y10,x11,y11,x12,y12,x13,y13,
        x20,y20,x21,y21,x22,y22,x23,y23]: number[]): number {

    // We should rarely ever get here so code clarity trumps efficiency.
    
    // Curve 1 and/AND Curve 2 is degenerate with at least some initial points
    // coinciding.

    
    const t1x10 = x11 - x10;  // tangent x-coordinate
    const t1y10 = y11 - y10;  // tangent y-coordinate
	const t2x10 = x21 - x20;  // tangent x-coordinate
    const t2y10 = y21 - y20;  // tangent y-coordinate
    
    const t1x20 = x12 - x10;  // '2nd order' tangent x-coordinate
    const t1y20 = y12 - y10;  // '2nd order' tangent y-coordinate
	const t2x20 = x22 - x20;  // '2nd order' tangent x-coordinate
    const t2y20 = y22 - y20;  // '2nd order' tangent y-coordinate

    const t1x30 = x13 - x10;  // '3nd order' tangent x-coordinate
    const t1y30 = y13 - y10;  // '3nd order' tangent y-coordinate
	const t2x30 = x23 - x20;  // '3nd order' tangent x-coordinate
    const t2y30 = y23 - y20;  // '3nd order' tangent y-coordinate


    // If a curve's tangent is zero at the interface the it has a cusp there
    // with either 0 or infinite curvature.
    // We then can calculate the *initial tangent direction* 
    // via `6(x2 - x0)t - 3(-2x0 + 3x2 - x3)t^2` and taking `t` to be small
    // giving `x2 - x0`

    // If additionally a curve's '2nd order' tangent is zero at the interface 
    // then it is a straight line with zero curvature everywhere and with
    // initial tangent given by `x3 - x0`

    // If additionally a curve's '3nd order' tangent is zero at the interface 
    // then it is a point.


    // TODO - consider case where say last point equals first point :(
    // TODO - consider case where the cross is pi rad in opposite direction

    // --------------------------------------------------------
    // First eliminate cases where either curve may be a point
    // --------------------------------------------------------
    if (t1x10 === 0 && t1y10 === 0 &&  // zero tangent at `t === 0`
        t1x20 === 0 && t1y20 === 0 &&  // first 3 points coincide
        t1x30 === 0 && t1y30 === 0) {  // all points coincide

        return undefined;
    }

    if (t2x10 === 0 && t2y10 === 0 &&  // zero tangent at `t === 0`
        t2x20 === 0 && t2y20 === 0 &&  // first 3 points coincide
        t2x30 === 0 && t2y30 === 0) {  // all points coincide

        return undefined;
    }
    

    // -------------------------------------------------------------------------
    // Next eliminate the case where both curves has 3 initial points coinciding
    // -------------------------------------------------------------------------
    if (t1x10 === 0 && t1y10 === 0 &&  // zero tangent at `t === 0`
        t1x20 === 0 && t1y20 === 0 &&  // first 3 points coincide
        t2x10 === 0 && t2y10 === 0 &&  // zero tangent at `t === 0`
        t2x20 === 0 && t2y20 === 0) {  // first 3 points coincide

        return -cross([t1x30,t1y30], [t2x30,t2y30]);
    }    


    // Curve 1 has consecutive points coincident to point 0: 0 or 1 or 2
    // Curve 2 has consecutive points coincident to point 0: 0 or 1 or 2
    // (but not both curves 0 or 2 consecutive)

    // Possible consecutive combinations:
    // 0|1 -- 0|2 -- 1|0 -- 1|1 -- 1|2 -- 2|0 -- 2|1

    if (t1x10 === 0 && t1y10 === 0) {
        // Curve 1 consecutive points coincident: 1 or 2
        // Curve 2 consecutive points coincident: 0 or 1 or 2

        if (t1x20 === 0 && t1y20 === 0) {
            // Curve 1 consecutive points coincident: 2
            // Curve 2 consecutive points coincident: 0 or 1 or 2

            if (t2x10 === 0 && t2y10 === 0) {
                // Curve 1 consecutive points coincident: 2
                // Curve 2 consecutive points coincident: 1 or 2

                // Since the case 2/2 has already been handled we must have:
                // Curve 1 consecutive points coincident: 2
                // Curve 2 consecutive points coincident: 1

                // case: 2|1
                return -(
                    cross([t1x30,t1y30], [t2x20,t2y20]) ||
                    cross([t1x30,t1y30], [t2x30,t2y30])
                );  
            }

            // Curve 1 consecutive points coincident: 2
            // Curve 2 consecutive points coincident: 0

            // case: 2|0
            return -(
                cross([t1x30,t1y30], [t2x10,t2y10]) ||
                cross([t1x30,t1y30], [t2x20,t2y20]) ||
                cross([t1x30,t1y30], [t2x30,t2y30])
            );  
        }
            
        // Curve 1 consecutive points coincident: 1
        // Curve 2 consecutive points coincident: 0 or 1 or 2

        if (t2x10 === 0 && t2y10 === 0) {
            // Curve 1 consecutive points coincident: 1
            // Curve 2 consecutive points coincident: 1 or 2

            if (t2x20 === 0 && t2y20 === 0) {
                // Curve 1 consecutive points coincident: 1
                // Curve 2 consecutive points coincident: 2

                // case: 1|2
                return -(
                    cross([t1x20,t1y20], [t2x30,t2y30]) ||
                    cross([t1x30,t1y30], [t2x30,t2y30])
                );  
            }

            // Curve 1 consecutive points coincident: 1
            // Curve 2 consecutive points coincident: 1

            // case: 1|1
            const nc = -cross([t1x20,t1y20], [t2x20,t2y20]);
            if (nc !== 0) {
                return nc;
            }

            throw 'not implemented yet'
        }

        // Curve 1 consecutive points coincident: 1
        // Curve 2 consecutive points coincident: 0
        // case: 1|0

        const nc1 = -cross([t1x20,t1y20], [t2x10,t2y10]);
        if (nc1 !== 0) {
            return nc1;
        }

        // Since the 2nd curve's curvature is infinte (but not the 1st curve's) and 
        // must turn in the direction of the final control point we can ignore the 
        // first curve completely (unless the second curve is a line!).

        const nc2 = -cross([t2x20,t2y20], [t1x30,t1y30]);
        if (nc2 === 0) {
            // we actually have a line for the second curve
            return -(
                cross([t1x10,t1y10], [t1x20,t1y20]) ||
                cross([t1x10,t1y10], [t2x30,t2y30])
            );
        }
    }

    // Curve 1 consecutive points coincident: 0
    // Curve 2 consecutive points coincident: 1 or 2

    // At this point we must have `t2x10 === 0 && t2y10 === 0` else we didn't
    // have these type of degenerate cases in the first place.
        
    if (t2x20 === 0 && t2y20 === 0) {
        // Curve 1 consecutive points coincident: 0
        // Curve 2 consecutive points coincident: 2 (a line)

        // case: 0|2

        return -(
            cross([t1x10,t1y10], [t2x30,t2y30]) ||
            cross([t1x20,t1y20], [t2x30,t2y30]) ||
            cross([t1x30,t1y30], [t2x30,t2y30])
        );
    }

    // Curve 1 consecutive points coincident: 0
    // Curve 2 consecutive points coincident: 1

    // case: 0|1
    const nc1 = -cross([t1x10,t1y10], [t2x20,t2y20]);
    if (nc1 !== 0) {
        return nc1;
    }

    // Since the 2nd curve's curvature is infinte (but not the 1st curve's) and 
    // must turn in the direction of the final control point we can ignore the 
    // first curve completely (unless the second curve is a line!).

    const nc2 = -cross([t2x30,t2y30], [t1x20,t1y20]);
    if (nc2 === 0) {
        // we actually have a line for the second curve
        return -(
            cross([t1x20,t1y20], [t1x10,t1y10]) ||
            cross([t1x30,t1y30], [t2x10,t2y10])
        );
    }
}


export { getDegenerateInterfaceCcw }
