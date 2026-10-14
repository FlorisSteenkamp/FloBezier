import { AppState } from "./app-state.js";
import { defaultAppState, defaultPageState, defaultTransientState, defaultDeduced, defaultToDraw } from "./default-state.js";


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
            deduced: defaultDeduced,
            hausdorffMode: storedState.pageState.hausdorffMode ?? defaultPageState.hausdorffMode,
            // so newly added toggles also show up for stored states
            toDraw: { ...defaultToDraw, ...storedState.pageState.toDraw }
        } 
    };
}


export { getInitialState }
