import { assoc } from "./assoc.js";
function assocPath(path, v, o) {
    const k = path[0];
    if (path.length > 1) {
        const nextO = (o[k] !== undefined) ? o[k] : {};
        v = assocPath(path.slice(1), v, nextO);
    }
    return assoc(k, v, o);
}
export { assocPath };
//# sourceMappingURL=assoc-path.js.map