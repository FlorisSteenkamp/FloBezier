import type { StateControl } from '../../state-control/state-control.js';
// import type { ClickFor } from '../state/click-for.js';
import { gotoPrevViewbox } from '../viewbox/goto-prev-viewbox.js';
import { onSelectBezierClicked } from '../events/on-select-bezier-clicked.js';
import { getViewboxXY } from '../viewbox/get-viewbox-xy.js';
import { onAddSpecialClick } from '../events/on-add-special-click.js';


function onClick(
        stateControl: StateControl,
        refSvg: React.RefObject<SVGSVGElement | null>) {

    return (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (event.shiftKey) { 
            gotoPrevViewbox(stateControl);
            return;
        }

        // While an "add special" arc flow is pending, clicks pick the center and
        // the two points instead of selecting a bezier.
        const addSpecial = stateControl.state.appState.pageState.addSpecial;
        if (addSpecial) {
            const svg$ = refSvg.current;
            if (!svg$) { return; }
            const p = getViewboxXY(
                svg$,
                stateControl.state.appState.pageState.viewbox,
                event.nativeEvent.offsetX,
                event.nativeEvent.offsetY
            );
            onAddSpecialClick(stateControl, refSvg, addSpecial, p);
            return;
        }

        onSelectBezierClicked(stateControl, refSvg, event);
    }
}


export { onClick }
