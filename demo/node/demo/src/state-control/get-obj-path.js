function getObjPath(o, v) {
    for (const k in o) {
        if (o[k] === v) {
            return [k];
        }
        if (typeof o[k] === "object") {
            const path = getObjPath(o[k], v);
            if (path) {
                path.unshift(k);
                return path;
            }
        }
    }
}
export { getObjPath };
//# sourceMappingURL=get-obj-path.js.map