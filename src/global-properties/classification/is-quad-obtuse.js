"use strict";
exports.__esModule = true;
exports.isQuadObtuse = void 0;
var flo_vector2d_1 = require("flo-vector2d");
/**
 * Returns true if the given quadratic bezier is obtuse, false otherwise (i.e.
 * false if acute).
 * Obtuse here is defined as follows: const the quad form a triangle through its
 * control points P0, P1, P2 where P0 and P2 are the endpoints. If both interior
 * angles ∠P0 and ∠P2 are <= 90 degrees then the quad is considered acute,
 * otherwise it is considered obtuse.
 *
 * @doc mdx
 */
function isQuadObtuse(ps) {
    var v0 = (0, flo_vector2d_1.fromTo)(ps[0], ps[1]);
    var v1 = (0, flo_vector2d_1.fromTo)(ps[1], ps[2]);
    var v2 = (0, flo_vector2d_1.fromTo)(ps[2], ps[0]);
    var angleP0Obtuse = (0, flo_vector2d_1.dot)(v2, v0) > 0;
    var angleP2Obtuse = (0, flo_vector2d_1.dot)(v1, v2) > 0;
    return angleP0Obtuse || angleP2Obtuse;
}
exports.isQuadObtuse = isQuadObtuse;
