"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quadToPolyline = void 0;
const is_quad_flat_1 = require("../global-properties/type/is-quad-flat");
const split_at_1 = require("./split-merge-clone/split-at");
/**
 * Transforms the given quadratic bezier into a polyline approximation to within
 * a given tolerance.
 *
 * @param ps A quadratic bezier curve given as an array of points.
 *
 * @doc
 */
function quadToPolyline(ps, tolerance) {
    // A quad bezier has the following useful properties (Let the control
    // points be labeled P0, P1 and P2 respectively and let the point at t = 0.5
    // be labeled M1):
    // -------------------------------------------------------------------------
    // * At t = 0.5 P1 has its maximum influence of 0.5 and P0 and P2 each an 
    // influence of 0.25.
    // * The tangent at t = 0.5 is given by P2 - P0.
    // * The line implied by the tangent at t = 0.5 cuts the line segments P0-P1
    // and P2-P1 in half. Lets call these points M0 and M2.
    // * The polygon P0-M0-M2-P2 bounds the curve.
    // * The curve can be cut into two quad bezier curves. 
    // * If it is cut at t = 0.5, i.e. at M1 so that we have two quad beziers 
    // defined by the triangles Q1 = P0-M0-M1 and Q2 = M0-M2-P2 then both 
    // the interior angles at P0 and P2 are < 90 degrees (acute). Lets call such
    // a quad acute, otherwise obtuse.
    // * If we split an obtuse quad at t = 0.5 then the resulting quads are both
    // acute.
    // * Acute quads is such that the point at t = 0.5, i.e. at M1) is the 
    // furthest away from the line P0-P2.
    // Note: In our algorithm the above property can be used to measure the 
    // flatness of the quad reliably.
    // The algorithm: q: quad => lines[] such that the Hausdorff distance 
    // between the polyline and the quad < tolerance.
    // Strategy: Use linked list for polyline - makes splitting easier
    // -------------------------------------------------------------------------
    // quad obtuse ? 
    //   no  : Push the quad onto the stack
    //   yes : Split the quad at t = 0.5 and push both halves onto the stack
    // Loop while stack not empty
    //   pop from stack => q
    //   d <= calculate distance from t = 0.5 to line p0-p2
    //   tolerance < tol ?
    //     yes : do nothing
    //     no  : split quad at t = 0.5 and push both halves onto the stack
    // Loop end
    // Stack with nodes still to be checked
    let stack = [];
    // Polyline linked list
    let head = {
        ps,
        prev: undefined,
        next: undefined
    };
    stack.push(head);
    while (stack.length) {
        let node = stack.pop();
        if (is_quad_flat_1.isQuadFlat(node.ps, tolerance)) {
            continue;
        }
        let quads = split_at_1.splitAt(node.ps, 0.5);
        let prev = node.prev;
        let next = node.next;
        let node1 = {
            ps: quads[0],
            prev,
            next: undefined // to be set below
        };
        let node2 = {
            ps: quads[1],
            prev: undefined,
            next
        };
        node1.next = node2;
        node2.prev = node1;
        if (prev) {
            prev.next = node1;
        }
        if (next) {
            next.prev = node2;
        }
        if (head === node) {
            head = node1;
        }
        stack.push(node1);
        stack.push(node2);
    }
    let linePs = [];
    let node = head;
    linePs.push(head.ps[0]);
    while (node) {
        linePs.push(node.ps[2]);
        node = node.next;
    }
    return linePs;
}
exports.quadToPolyline = quadToPolyline;
//# sourceMappingURL=quad-to-polyline.js.map