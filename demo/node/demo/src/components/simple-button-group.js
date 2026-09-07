import * as React from 'react';
function ButtonGroup(props) {
    const { options, onChanged, value, styles, label } = props;
    const isSelected = (key) => Array.isArray(value) ? value.includes(key) : value === key;
    function onClick(key) {
        return (event) => {
            if (!onChanged) {
                return;
            }
            onChanged(key);
        };
    }
    return (React.createElement("div", { style: { ...styles?.div, display: 'inline-flex', flexDirection: 'column', alignItems: 'center' } }, (() => {
        const entries = Object.entries(options);
        const mid = Math.ceil(entries.length / 2);
        const rows = [entries.slice(0, mid), entries.slice(mid)];
        return rows.map((row, i) => (React.createElement("div", { className: 'btn-group', key: i }, row.map(([key, val]) => (React.createElement("button", { key: key, onClick: onClick(key), style: isSelected(key) ? { backgroundColor: '#3e8e41' } : {} }, val.text))))));
    })()));
}
export { ButtonGroup };
//# sourceMappingURL=simple-button-group.js.map