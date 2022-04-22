import { translate } from "flo-vector2d";
import { randomOnGrid } from "./random-on-grid.js";
function randomTranslate(seed) {
    const randomOnGrid_ = randomOnGrid(1, 53);
    return (ps) => {
        const x = 10 * randomOnGrid_((seed * 3) + 1);
        const y = 10 * randomOnGrid_((seed * 3) + 2);
        return ps.map(p => translate([x, y])(p));
    };
}
export { randomTranslate };
//# sourceMappingURL=random-translate.js.map