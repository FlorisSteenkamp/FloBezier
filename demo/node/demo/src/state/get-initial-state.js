import { defaultAppState, defaultDeduced } from "./default-state.js";
function getInitialState() {
    const appStateJson = localStorage.getItem('app-state');
    if (!appStateJson) {
        return defaultAppState;
    }
    const storedState = JSON.parse(appStateJson);
    if (storedState.version !== defaultAppState.version) {
        return defaultAppState;
    }
    return {
        ...storedState,
        pageState: {
            ...storedState.pageState,
            deduced: defaultDeduced
        }
    };
}
export { getInitialState };
//# sourceMappingURL=get-initial-state.js.map