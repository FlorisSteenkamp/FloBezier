// import type { ClickFor } from '../state/click-for.js';
import { gotoPrevViewbox } from '../viewbox/goto-prev-viewbox.js';
import { onSelectBezierClicked } from '../events/on-select-bezier-clicked.js';
function onClick(stateControl, refSvg) {
    return (event) => {
        if (event.shiftKey) {
            gotoPrevViewbox(stateControl);
            return;
        }
        onSelectBezierClicked(stateControl, refSvg, event);
    };
}
export { onClick };
//# sourceMappingURL=on-click.js.map