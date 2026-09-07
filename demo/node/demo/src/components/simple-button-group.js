import * as React from 'react';
function ButtonGroup(props) {
    const { options, onChanged, value: selectedValue, styles, label } = props;
    function onClick(key) {
        return (event) => {
            if (!onChanged) {
                return;
            }
            onChanged(key);
        };
    }
    return (React.createElement("div", { className: 'btn-group', style: styles?.div }, Object.entries(options).map(option => {
        const key = option[0];
        const value = option[1];
        return (React.createElement("button", { key: key, onClick: onClick(key), style: selectedValue === key ? { backgroundColor: '#3e8e41' } : {} }, value.text));
    })));
}
export { ButtonGroup };
//# sourceMappingURL=simple-button-group.js.map