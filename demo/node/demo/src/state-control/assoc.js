function assoc(key, v, o) {
    const no = {};
    for (const k in o) {
        no[k] = o[k];
    }
    no[key] = v;
    return no;
}
export { assoc };
//# sourceMappingURL=assoc.js.map