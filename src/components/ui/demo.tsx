"use client";

// Usage example for the dashboard sidebar.
//
// The full interactive preview (sidebar + mock content shell + ⌘K command
// palette) is the default export of ./dashboard-sidebar. The demo.tsx from the
// source bundle was a byte-for-byte copy of that file, so we re-export instead
// of duplicating ~500 lines that would drift out of sync.
//
// To use the sidebar on its own, import the named export:
//   import { SidebarNav } from "@/components/ui/dashboard-sidebar";
export { default, SidebarNav } from "./dashboard-sidebar";
export type { NavItemData, NavGroupData } from "./dashboard-sidebar";
