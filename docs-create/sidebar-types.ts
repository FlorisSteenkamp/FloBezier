// Quote from https://v2.docusaurus.io/docs/docs-introduction/#sidebar-object
// 'A sidebar object is defined like this:'

// Lets limit these to be more symmetric
type SideBarItems =
    // limited for symmetry
    //| { [sidebarCategory: string]: SidebarItem[]; }
    | SidebarItem[];

type Sidebar = { [sidebarId: string]: SideBarItems } | SideBarItems;

type SidebarItem = Doc | Link | Ref | Category;


// limited for symmetry
//type Doc = string | { type: 'doc'; id: string; };
/** links to a document *with* this sidebar */
type Doc = { 
    type: 'doc'; 
    /** 
     * the id is the name at the top of each document (the frontmatter),
     * e.g. `id: "_basic_double_abs_coeff_"`
     */
    id: string; 
};


/** an external link */
type Link = {
    type: 'link';
    label: string;
    href: string;
}


/** links to a document *without* this sidebar */
type Ref = {
    type: 'ref';
    /** 
     * the id is the name at the top of each document (the frontmatter),
     * e.g. `id: "_basic_double_abs_coeff_"`
     */
    id: string;
}


/** 
 * A category that can contain docs (of type `Ref` and `Doc`) or other 
 * `Category`s creating a tree
 */
type Category = {
    type: 'category';
    /** Sidebar label text */
    label: string; 
    /** Array of sidebar items */
    items: SidebarItem[]; 
    /** Set the category to be collapsed or open by default */
    collapsed?: boolean; 
}


export { Sidebar, SidebarItem }
export { Doc, Link, Ref, Category}
