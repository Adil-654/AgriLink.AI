
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Tractor,
  Truck,
  BarChart3,
  Users,
  Package,
  ChevronLeft,
  CloudSun,
  ShieldCheck,
  TrendingUp,
  Sprout,
  Leaf,
  ChevronRight,
  Settings,
  CircleHelp,
  LogOut,
  Sparkles,
} from "lucide-react";

const farmerMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    description: "Overview",
  },
  {
    name: "Crop Prediction",
    icon: Tractor,
    path: "/prediction",
    description: "AI-powered insights",
  },
  {
    name: "Supply Chain",
    icon: Truck,
    path: "/supply-chain",
    description: "Track shipments",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
    description: "Business performance",
  },
  {
    name: "Weather",
    icon: CloudSun,
    path: "/weather",
    description: "Weather conditions",
  },
  {
    name: "Market Analysis",
    icon: TrendingUp,
    path: "/market-analysis",
    description: "Crop market trends",
  },
];

const adminMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
    description: "Platform overview",
  },
  {
    name: "Create Admin",
    icon: ShieldCheck,
    path: "/admin/create-admin",
    description: "Access management",
  },
  {
    name: "Farmers",
    icon: Users,
    path: "/admin/farmers",
    description: "Manage farmers",
  },
  {
    name: "Shipments",
    icon: Package,
    path: "/admin/shipments",
    description: "Manage deliveries",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
    description: "Platform insights",
  },
];

const Sidebar = ({ toggleSidebar, collapsed = false }) => {
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const isAdmin = user?.role?.toLowerCase() === "admin";
  const menu = isAdmin ? adminMenu : farmerMenu;

  const displayName = user?.name || "User";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const theme = isAdmin
    ? {
        accent: "text-indigo-300",
        active: "bg-indigo-400/15 text-white",
        activeBorder: "border-indigo-400/30",
        icon: "bg-indigo-400/15 text-indigo-200",
        glow: "bg-indigo-400/10",
        dot: "bg-indigo-400",
      }
    : {
        accent: "text-emerald-300",
        active: "bg-emerald-400/15 text-white",
        activeBorder: "border-emerald-400/30",
        icon: "bg-emerald-400/15 text-emerald-200",
        glow: "bg-emerald-400/10",
        dot: "bg-emerald-400",
      };

  return (
    <aside
      className={`relative flex min-h-screen shrink-0 flex-col overflow-hidden border-r border-white/[0.07] bg-[#10251d] text-white transition-[width] duration-300 ${
        collapsed ? "w-[88px] px-3" : "w-[280px] px-5"
      }`}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/[0.09] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-24 h-64 w-64 rounded-full bg-green-400/[0.06] blur-3xl" />

      {/* Brand */}
      <div
        className={`relative flex min-h-[100px] items-center border-b border-white/[0.08] ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg shadow-emerald-950/40">
            {isAdmin ? (
              <ShieldCheck size={23} className="text-white" />
            ) : (
              <Sprout size={25} className="text-white" />
            )}
            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-[3px] border-[#10251d] bg-lime-300" />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <h1 className="truncate text-[19px] font-extrabold tracking-tight text-white">
                AgriLink<span className="text-emerald-400"> AI</span>
              </h1>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.19em] text-slate-400">
                {isAdmin ? "Admin console" : "Smart agriculture"}
              </p>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-2 text-slate-400 transition hover:border-white/15 hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft size={17} />
          </button>
        )}

        {collapsed && (
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Expand sidebar"
            title="Expand sidebar"
            className="absolute -right-1 top-3 rounded-lg bg-[#243d31] p-1.5 text-slate-300 transition hover:bg-emerald-700 hover:text-white"
          >
            <ChevronRight size={15} />
          </button>
        )}
      </div>

      {/* Workspace */}
      {!collapsed && (
        <div className="relative mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3.5">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.icon}`}
            >
              {isAdmin ? <ShieldCheck size={18} /> : <Leaf size={18} />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white">
                {isAdmin ? "Administration" : "Farmer workspace"}
              </p>
              <p className="mt-1 truncate text-[10px] text-slate-400">
                {isAdmin ? "Platform management" : "Your farming hub"}
              </p>
            </div>
            <Sparkles size={15} className={theme.accent} />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="relative mt-7 flex-1" aria-label="Main navigation">
        {!collapsed && (
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Workspace
          </p>
        )}

        <div className="space-y-1.5">
          {menu.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin" || item.path === "/dashboard"}
                title={collapsed ? item.name : undefined}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 overflow-hidden rounded-xl border px-3 py-3 transition-all duration-200 ${
                    collapsed ? "justify-center" : ""
                  } ${
                    isActive
                      ? `${theme.active} ${theme.activeBorder} shadow-lg shadow-black/[0.06]`
                      : "border-transparent text-slate-400 hover:border-white/[0.06] hover:bg-white/[0.05] hover:text-slate-100"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId={`sidebar-active-${isAdmin ? "admin" : "farmer"}`}
                        className={`absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full ${theme.dot}`}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <span
                      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                        isActive
                          ? theme.icon
                          : "text-slate-400 group-hover:bg-white/[0.06] group-hover:text-white"
                      }`}
                    >
                      <Icon size={19} strokeWidth={isActive ? 2.3 : 1.8} />
                    </span>

                    {!collapsed && (
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-semibold">
                          {item.name}
                        </span>
                        <span
                          className={`mt-0.5 block truncate text-[10px] ${
                            isActive ? "text-slate-300" : "text-slate-500"
                          }`}
                        >
                          {item.description}
                        </span>
                      </span>
                    )}

                    {!collapsed && isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${theme.dot}`}
                      />
                    )}

                    {collapsed && (
                      <span className="sr-only">{item.name}</span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {!collapsed && (
          <>
            <div className="my-6 border-t border-white/[0.08]" />

            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Support
            </p>

            <div className="space-y-1.5">
              <button
                type="button"
                title="Help and support"
                onClick={() => {}}
                className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-left text-slate-400 transition hover:border-white/[0.06] hover:bg-white/[0.05] hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl">
                  <CircleHelp size={19} />
                </span>
                <span className="text-[13px] font-medium">Help & Support</span>
              </button>

              <button
                type="button"
                title="Settings"
                onClick={() => {}}
                className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-left text-slate-400 transition hover:border-white/[0.06] hover:bg-white/[0.05] hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl">
                  <Settings size={19} />
                </span>
                <span className="text-[13px] font-medium">Settings</span>
              </button>
            </div>
          </>
        )}
      </nav>

      {/* User profile */}
      <div
        className={`relative mb-4 mt-6 rounded-2xl border border-white/[0.09] bg-white/[0.045] ${
          collapsed ? "p-2" : "p-3"
        }`}
      >
        <div
          className={`flex items-center gap-3 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-300 to-emerald-600 text-sm font-extrabold text-[#103427]">
            {initials || "U"}
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#172d23] bg-lime-400" />
          </div>

          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-white">
                  {displayName}
                </p>
                <p className="mt-1 truncate text-[10px] capitalize text-slate-400">
                  {isAdmin ? "Administrator" : "Farmer account"}
                </p>
              </div>
              <span
                title="Account active"
                className="rounded-lg bg-emerald-400/10 p-1.5 text-emerald-300"
              >
                <ShieldCheck size={15} />
              </span>
            </>
          )}
        </div>

        {!collapsed && (
          <div className="mt-3 flex items-center gap-2 border-t border-white/[0.08] pt-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-medium text-slate-400">
              Account active
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
