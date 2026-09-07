import type { StateControl } from '../../state-control/state-control.js';
// import type { ClickFor } from '../state/click-for.js';
import { gotoPrevViewbox } from '../viewbox/goto-prev-viewbox.js';
import { onSelectBezierClicked } from '../events/on-select-bezier-clicked.js';


function onClick(
        stateControl: StateControl,
        refSvg: React.RefObject<SVGSVGElement | null>) {

    return (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (event.shiftKey) { 
            gotoPrevViewbox(stateControl);
            return;
        }

        onSelectBezierClicked(stateControl, refSvg, event);
    }
}


export { onClick }
