"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sidebar = [
    {
        type: 'category',
        label: 'Introduction',
        items: [
            { type: 'doc', id: 'README' }
        ]
    },
    {
        type: 'category',
        label: 'Index',
        collapsed: false,
        items: require('./docs/sidebar-fs.js')
    }
];
module.exports = { sidebar };
//# sourceMappingURL=sidebars.js.map