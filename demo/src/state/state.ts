import type { AppState } from "./app-state.js";
import type { TransientState } from "./transient-state.js";


interface State {
    readonly appState: AppState;
}


export type { State }
