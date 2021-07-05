/**
 * Represents a reference link in the sidebar.
 */
type SidebarItem = {
    /** The actual string that will be displayed to the client. */
    name: string;
    /** The HTML reference. */
    ref: string;
}

/** 
 * Represents an indented sidebar subsection.
 */
type SidebarSection = {
    /** The title of the section. */
    title: string;
    /** The items from the section. */
    Items: SidebarItem[];
}

/**
 * Represents all passed properties for the main layout component. 
 */
export interface LayoutProps {
    /** All the items that should get shown in the layout sidebar. */
    barItems?: (SidebarItem | SidebarSection)[];
}