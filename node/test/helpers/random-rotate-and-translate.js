import { rotate, translate } from "flo-vector2d";
import { randomOnGrid } from "./random-on-grid.js";
function randomRotateAndTranslate(seed) {
    const randomOnGrid_ = randomOnGrid(1, 53);
    return (ps) => {
        const angle = 10 * randomOnGrid_(seed * 3);
        const x = 10 * randomOnGrid_((seed * 3) + 1);
        const y = 10 * randomOnGrid_((seed * 3) + 2);
        const sinθ = Math.sin(angle);
        const cosθ = Math.cos(angle);
        return ps.map(p => translate([x, y])(rotate(sinθ, cosθ)(p)));
    };
}
export { randomRotateAndTranslate };
//# sourceMappingURL=random-rotate-and-translate.js.map