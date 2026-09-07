import * as React from 'react';


interface Props<T extends string> {
    readonly options: { [K in T]?: { text: string } };
    readonly value: T | readonly T[];
    readonly label: string;
    readonly styles?: { div: React.CSSProperties },
    readonly onChanged?: (key: T) => void;
}


function ButtonGroup<T extends string>(props: Props<T>) {
    const { options, onChanged, value, styles, label } = props;

    const isSelected = (key: T) =>
        Array.isArray(value) ? value.includes(key) : value === key;

    function onClick(key: T) {
        return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (!onChanged) { return; } 
            onChanged(key);
        }
    }

    return (
        <div style={{ ...styles?.div, display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
            {(() => {
                const entries = Object.entries(options) as [T, { text: string }][];
                const mid = Math.ceil(entries.length / 2);
                const rows = [entries.slice(0, mid), entries.slice(mid)];
                return rows.map((row, i) => (
                    <div className='btn-group' key={i}>
                        {row.map(([key, val]) => (
                            <button
                                key={key}
                                onClick={onClick(key)}
                                style={isSelected(key) ? { backgroundColor: '#3e8e41' } : {}}
                            >
                                {val.text}
                            </button>
                        ))}
                    </div>
                ));
            })()}
        </div>
    );
}


export { ButtonGroup }
    