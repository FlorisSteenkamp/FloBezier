import * as React from 'react';
import { useState } from 'react';
import type { State } from './state/state.js';
import type { StateControl } from './state-control/state-control.js';
import { _upd } from './state-control/upd.js';
import { getInitialState } from './state/get-initial-state.js';
import { defaultTransientState } from './state/default-state.js';
import { Page } from './page/page.js';
import { createRoot } from 'react-dom/client';


function App() {
    const [appState, setAppState] = useState(getInitialState);
    const [state] = useState((): State => ({ appState }));
    const [{upd, upd$, render}] = useState(() => _upd(state, setAppState));
    const [stateControl] = useState((): StateControl => ({ 
        state, upd, upd$, render, transientState: defaultTransientState,
    }));

    const { pageState } = appState;

    return (
        <main>
            <Page
                stateControl={stateControl}
                pageState={pageState}
            />
        </main>
    );
}


createRoot(document.getElementById('app')!).render(<App />)
