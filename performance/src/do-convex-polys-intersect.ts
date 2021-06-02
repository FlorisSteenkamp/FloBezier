/**
 * Adapted from https://stackoverflow.com/a/12414951/2010061.
 * Returns true if there is any intersection between the 2 polygons, false otherwise
 * Uses the Separating Axis Theorem.
 *
 * @param polygonA an array of connected points that form a closed polygon
 * @param polygonB an array of connected points that form a closed polygon
 * @param closed set to false to compare open polygons (not containing their 
 * boundary) or true to compare closed polygons
 */
 function doConvexPolygonsIntersect(
        polygonA: number[][], 
        polygonB: number[][],
        closed: boolean) {

    // for each polygon, look at each edge of the polygon, and determine if 
    // it separates the two shapes
    for (let polygon of [polygonA, polygonB]) {
        let len = polygon.length;
        for (let i=1; i<len+1; i++) {

            // grab 2 consecutive vertices to create an edge
            let p1 = polygon[i - 1];
            let p2 = polygon[i % len];

            // find the vector perpendicular to this edge
            let normal = [p2[1] - p1[1], p1[0] - p2[0]];

            let minA = Number.POSITIVE_INFINITY;
            let maxA = Number.NEGATIVE_INFINITY;
            // for each vertex in the first shape, project it onto the line 
            // perpendicular to the edge and keep track of the min and max of 
            // these values
            for (let k=0; k<polygonA.length; k++) {
                let projected = 
                    normal[0] * polygonA[k][0] + 
                    normal[1] * polygonA[k][1];
                    
                if (projected < minA) { minA = projected; }
                if (projected > maxA) { maxA = projected; }
            }

            // for each vertex in the second shape, project it onto the line 
            // perpendicular to the edge and keep track of the min and max of 
            // these values
            let minB = Number.POSITIVE_INFINITY;
            let maxB = Number.NEGATIVE_INFINITY;
            for (let k=0; k<polygonB.length; k++) {
                let projected = 
                    normal[0] * polygonB[k][0] + 
                    normal[1] * polygonB[k][1];

                if (projected < minB) { minB = projected; }
                if (projected > maxB) { maxB = projected; }
            }

            // if there is no overlap between the projections, the edge we are 
            // looking at separates the two polygons, and we know there is no 
            // overlap
            if (closed) {
                if (maxA < minB || maxB < minA) {
                    return false;
                }
            } 
            if (!closed) {
                if (maxA <= minB || maxB <= minA) {
                    return false;
                }
            }
        }
    }

    return true;
}


export { doConvexPolygonsIntersect }
