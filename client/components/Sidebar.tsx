import { useNavigate, useLocation } from "react-router-dom";
import {
  Bot,
  BarChart3,
  PieChart,
  Receipt,
  HelpCircle,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "../context/SidebarContext";
import { useEffect } from "react";

export default function Sidebar() {
  const { isOpen, isCollapsed, isMobile, toggleSidebar, toggleCollapsed } =
    useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      icon: Bot,
      label: "Playground",
      path: "/dashboard",
      id: "playground",
    },
    {
      icon: BarChart3,
      label: "Agent Onchain",
      path: "/agent",
      id: "agent",
    },
    {
      icon: PieChart,
      label: "Portfolio",
      path: "/portfolio",
      id: "portfolio",
    },
    {
      icon: Receipt,
      label: "Tx History",
      path: "/transactions",
      id: "transactions",
    },
  ];

  const bottomItems = [
    {
      icon: HelpCircle,
      label: "Support",
      path: "/support",
      id: "support",
    },
    {
      icon: Settings,
      label: "Setting",
      path: "/settings",
      id: "settings",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      toggleSidebar();
    }
  };

  // Handle escape key to close sidebar on mobile
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobile && isOpen) {
        toggleSidebar();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobile, isOpen, toggleSidebar]);

  // Overlay for mobile
  const Overlay = () =>
    isMobile && isOpen ? (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={toggleSidebar}
      />
    ) : null;

  // Collapsed sidebar for desktop
  if (!isMobile && isCollapsed) {
    return (
      <aside className="w-[88px] h-screen bg-gray-100 flex flex-col items-center py-6 justify-between border-r border-gray-200 transition-all duration-300 ease-in-out">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Button
            variant="ghost"
            onClick={toggleCollapsed}
            className="w-[52.5px] h-[52.5px] rounded-lg bg-white hover:bg-gray-50 p-0 shadow-sm transition-all duration-200"
            title="Expand sidebar"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/d3accaac5015101aa5c50b3f516fc2fa922defa3?width=105"
              alt="CogniHash Logo"
              className="w-[53px] h-[53px] rounded-lg"
            />
          </Button>

          {/* Navigation Icons */}
          <div className="flex flex-col gap-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="icon"
                  onClick={() => handleNavigate(item.path)}
                  className={`w-10 h-10 p-0 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-cognihash-primary text-white shadow-lg"
                      : "text-gray-600 hover:bg-white hover:text-cognihash-primary hover:shadow-md"
                  }`}
                  title={item.label}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              );
            })}
          </div>
        </div>

        {/* Bottom Icons */}
        <div className="flex flex-col gap-3">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="icon"
                onClick={() => handleNavigate(item.path)}
                className="w-10 h-10 p-0 rounded-lg text-gray-500 hover:bg-white hover:text-cognihash-primary hover:shadow-md transition-all duration-200"
                title={item.label}
              >
                <Icon className="w-5 h-5" />
              </Button>
            );
          })}
        </div>
      </aside>
    );
  }

  return (
    <>
      <Overlay />
      <aside
        className={`
          fixed md:sticky top-0 h-screen bg-gray-100 flex flex-col border-r border-gray-200 z-50
          transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${isMobile ? "w-[280px]" : "w-[276px]"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-[52.5px] h-[52.5px] rounded-lg bg-white flex items-center justify-center shadow-sm">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/d3accaac5015101aa5c50b3f516fc2fa922defa3?width=105"
                alt="CogniHash Logo"
                className="w-[53px] h-[53px] rounded-lg"
              />
            </div>
            <span className="text-black text-xl font-semibold font-inter tracking-tight">
              CogniHash
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCollapsed}
                className="w-8 h-8 p-0 hover:bg-white/80 rounded-lg"
                title="Collapse sidebar"
              >
                <Menu className="w-4 h-4" />
              </Button>
            )}

            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="w-8 h-8 p-0 hover:bg-white/80 rounded-lg"
                title="Close sidebar"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavigate(item.path)}
                className={`w-full justify-start gap-3 px-4 py-3 h-12 rounded-lg font-medium transition-all duration-200 ${
                  active
                    ? "bg-cognihash-primary text-white shadow-lg hover:bg-cognihash-primary/90"
                    : "text-gray-700 hover:bg-white hover:shadow-md hover:text-cognihash-primary"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-inter">{item.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-4 space-y-2 border-t border-gray-200 bg-white/30 backdrop-blur-sm">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavigate(item.path)}
                className="w-full justify-start gap-3 px-4 py-3 h-12 rounded-lg text-gray-600 font-medium hover:bg-white hover:text-cognihash-primary hover:shadow-md transition-all duration-200"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-inter">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
