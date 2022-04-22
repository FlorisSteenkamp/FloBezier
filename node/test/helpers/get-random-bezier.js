import { randomOnGrid } from "./random-on-grid.js";
function getRandomBezier(maxCoordinate, significantBits) {
    const randomOnGrid_ = randomOnGrid(maxCoordinate, significantBits);
    return (order) => {
        return (seed) => {
            const s = seed;
            const ps = [];
            for (let i = 0; i < order + 1; i++) {
                ps.push([
                    randomOnGrid_((s * 8) + (i * 2) + 1),
                    randomOnGrid_((s * 8) + (i * 2) + 2)
                ]);
            }
            return ps;
        };
    };
}
const getRandomPoint = getRandomBezier(128, 53)(0);
const getRandomLine = getRandomBezier(128, 53)(1);
const getRandomQuad = getRandomBezier(128, 53)(2);
const getRandomCubic = getRandomBezier(128, 53)(3);
export { getRandomPoint, getRandomBezier, getRandomLine, getRandomQuad, getRandomCubic };
//# sourceMappingURL=get-random-bezier.js.map