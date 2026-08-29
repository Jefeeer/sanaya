"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Inbox,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  exact?: boolean;
};

export function AdminShell({
  user,
  newCount,
  children,
}: {
  user: { name: string; role: string };
  newCount: number;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const nav: NavItem[] = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/inquiries", label: "Inquiries", icon: Inbox, badge: newCount || undefined },
  ];

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const current = nav.find(isActive)?.label ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-canvas text-body">
      {/* Sidebar (desktop) */}
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-r border-line bg-surface transition-[width] duration-300 ease-in-out md:flex",
          collapsed ? "w-[72px]" : "w-64",
        )}
      >
        {/* Brand / workspace header */}
        <div className="flex h-16 items-center gap-3 border-b border-line px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand text-base font-semibold text-white shadow-sm">
            S
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-display text-lg leading-none text-heading">SANAYA</span>
              <span className="mt-1 text-[11px] leading-none text-subtle">Operations</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {!collapsed && (
            <span className="mb-1 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-subtle/70">
              Manage
            </span>
          )}
          {nav.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                  active
                    ? "bg-brand/10 font-medium text-brand"
                    : "text-body hover:bg-line-soft hover:text-heading",
                  collapsed && "justify-center",
                )}
              >
                <item.icon
                  className={cn("h-[18px] w-[18px] shrink-0", active ? "text-brand" : "text-subtle group-hover:text-heading")}
                  strokeWidth={1.75}
                />
                {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand/10 px-1.5 text-[11px] font-medium text-brand">
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge && (
                  <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-brand" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: identity + sign out */}
        <div className="border-t border-line p-3">
          {!collapsed && (
            <div className="mb-2 px-2.5">
              <div className="truncate text-sm font-medium text-heading">{user.name}</div>
              <div className="truncate text-xs text-subtle">{user.role}</div>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            title={collapsed ? "Sign out" : undefined}
            className={cn(
              "group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-body transition-colors hover:bg-line-soft hover:text-heading",
              collapsed && "justify-center",
            )}
          >
            <LogOut className="h-[18px] w-[18px] shrink-0 text-subtle group-hover:text-heading" strokeWidth={1.75} />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center border-b border-line bg-surface px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="hidden rounded-md p-1.5 text-subtle transition-colors hover:bg-line-soft hover:text-heading md:inline-flex"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <PanelLeftOpen className="h-[18px] w-[18px]" strokeWidth={1.75} />
              ) : (
                <PanelLeftClose className="h-[18px] w-[18px]" strokeWidth={1.75} />
              )}
            </button>
            {/* Mobile brand */}
            <Link href="/admin" className="font-display text-xl text-heading md:hidden">SANAYA</Link>
            <div className="hidden items-center gap-2 text-sm text-subtle md:flex">
              <span>SANAYA</span>
              <span>/</span>
              <span className="font-medium text-heading">{current}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
