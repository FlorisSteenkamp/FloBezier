import { _updObj } from "./upd-obj.js";
function _upd(state, setState) {
    const map = new Map();
    const weakMap = new WeakMap();
    const updObj = _updObj(state, map, weakMap);
    /**
     * @param triggerUpdate If true, then triggers a react and localstorage
     * update
     */
    function _upd(triggerUpdate) {
        return (v, newV) => {
            const { appState, newV_ } = updObj(v, newV);
            state.appState = appState;
            if (triggerUpdate) {
                setState(appState);
                toLocalStorage(appState);
            }
            return newV_;
        };
    }
    /**
     * Updates state and triggers react render
     */
    const upd = _upd(true);
    /**
     * Updates state and *does not* trigger react render
     */
    const upd$ = _upd(false);
    return { upd, upd$ };
}
function toLocalStorage(appState) {
    // omit transient (lazy loaded, etc) properties from state
    const appState_ = {
        ...appState,
        pageState: {
            ...appState.pageState,
            deduced: undefined
        }
    };
    localStorage.setItem('app-state', JSON.stringify(appState_));
}
export { _upd };
//# sourceMappingURL=upd.js.map