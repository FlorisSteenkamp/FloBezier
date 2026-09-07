import { AppState } from "./app-state.js";
import { defaultAppState, defaultTransientState, defaultDeduced } from "./default-state.js";


function getInitialState(): AppState {
    const appStateJson = localStorage.getItem('app-state');
    if (!appStateJson) { return defaultAppState; }

    const storedState: AppState = JSON.parse(appStateJson);
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


export { getInitialState }
