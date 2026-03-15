// components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LuLayoutDashboard as LayoutDashboard,
  LuFolderKanban as FolderKanban,
  LuImage as Image,
  LuMessageSquare as MessageSquare,
  LuCode as Code2,
  LuStar as Star,
  LuSettings as Settings,
  LuLogOut as LogOut,
  LuMenu as Menu,
  LuX as X,
  LuSun as Sun,
  LuPlus,
  LuMoon as Moon,
} from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAbout } from "../../hooks/useAbout";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { logout, pageTitle } = useAuth();
  const navigate = useNavigate();
  const { about } = useAbout();

  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/projects", icon: FolderKanban, label: "Projects" },
    // { path: "/media", icon: Image, label: "Media" },
    // { path: "/messages", icon: MessageSquare, label: "Messages" },
    { path: "/skills", icon: Code2, label: "Skills" },
    // { path: "/testimonials", icon: Star, label: "Testimonials" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed left-0 top-0 z-30 h-full w-72 bg-white dark:bg-gray-800 
        border-r border-gray-200 dark:border-gray-700 
        transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AP</span>
              </div>
              <div>
                <h2 className="font-bold text-gray-800 dark:text-white">
                  Admin Portal
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Full-Stack & Web3
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => `
                      flex items-center space-x-3 px-4 py-3 rounded-lg
                      transition-colors duration-200
                      ${
                        isActive
                          ? "bg-purple-500 text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }
                    `}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="flex items-center justify-end pr-6 mb-4 gap-2">
            <button
              onClick={() => {
                setSidebarOpen(false);
                navigate("/project/create");
              }}
              className="p-2 rounded-lg bg-purple-100 dark:bg-purple-700 text-gray-700 dark:text-gray-300 hover:bg-purple-200 dark:hover:bg-purple-600"
            >
              <LuPlus size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <div className="p-5 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={about?.avatar || "/images/profile.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    Felix Vincent
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Vincentvirtuoso
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-800 dark:text-white">
              {pageTitle}
            </span>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Mobile content padding */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default Sidebar;
