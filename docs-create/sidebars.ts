//import { Sidebar, SidebarItem } from './sidebar-types';
import { Sidebar, SidebarItem } from './sidebar-types';
import { Doc, Link, Ref, Category} from './sidebar-types';


const sidebar: Sidebar = [
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


const example: Sidebar = {
    Introduction: [
        { type: 'doc', id: 'README' }
    ],

    Functions: [
        { type: 'doc', id: "modules/_basic_double_abs_coeff_" },
        { type: 'doc', id: "modules/_basic_double_add_" },
        { type: 'doc', id: "modules/_basic_double_remove_leading_zeros_" },
        { type: 'doc', id: "modules/_basic_to_cas_str_" },
        { 
            type: 'category',
            label: 'basic',
            collapsed: true,
            items: [
                { type: 'doc', id: "modules/_basic_to_cas_str_" },
            ]
        }
    ]
};


module.exports = { sidebar };
