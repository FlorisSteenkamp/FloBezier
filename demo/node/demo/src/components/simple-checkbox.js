import * as React from 'react';
import { memo } from 'react';
const Checkbox = memo(function SimpleCheckbox(props) {
    const { styles, text, onChanged, checked } = props;
    const idStr = Math.random().toString();
    function onChange(event) {
        onChanged(event.target.checked);
    }
    return (React.createElement("div", { style: styles ? styles.div : undefined },
        React.createElement("input", { type: "checkbox", id: idStr, onChange: onChange, checked: checked }),
        React.createElement("label", { htmlFor: idStr }, text)));
});
export { Checkbox };
//# sourceMappingURL=simple-checkbox.js.map