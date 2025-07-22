import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bot, BarChart3, PieChart, Receipt, HelpCircle, Settings, Menu } from "lucide-react";
import { Button } from "./ui/button";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      icon: Bot,
      label: "Playground",
      path: "/dashboard",
      id: "playground"
    },
    {
      icon: BarChart3,
      label: "Agent Onchain",
      path: "/agent",
      id: "agent"
    },
    {
      icon: PieChart,
      label: "Portfolio",
      path: "/portfolio",
      id: "portfolio"
    },
    {
      icon: Receipt,
      label: "Tx History",
      path: "/transactions",
      id: "transactions"
    }
  ];

  const bottomItems = [
    {
      icon: HelpCircle,
      label: "Support",
      path: "/support",
      id: "support"
    },
    {
      icon: Settings,
      label: "Setting",
      path: "/settings",
      id: "settings"
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  if (isCollapsed) {
    return (
      <aside className="w-[88px] h-screen bg-gray-100 flex flex-col items-center py-10 justify-between">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <div className="w-[52.5px] h-[52.5px] rounded bg-white flex items-center justify-center">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/d3accaac5015101aa5c50b3f516fc2fa922defa3?width=105"
              alt="CogniHash Logo"
              className="w-[53px] h-[53px]"
            />
          </div>
          
          {/* Navigation Icons */}
          <div className="flex flex-col gap-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(item.path)}
                  className={`w-8 h-8 p-0 hover:bg-white hover:text-cognihash-primary ${
                    isActive(item.path) ? 'bg-gray-800 text-white' : 'text-black'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              );
            })}
          </div>
        </div>
        
        {/* Bottom Icons */}
        <div className="flex flex-col gap-4">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="icon"
                onClick={() => navigate(item.path)}
                className="w-8 h-8 p-0 hover:bg-white hover:text-cognihash-primary text-gray-600"
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
    <aside className="w-[276px] h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-black">
        <div className="flex items-center gap-2">
          <div className="w-[52.5px] h-[52.5px] rounded bg-white flex items-center justify-center">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/d3accaac5015101aa5c50b3f516fc2fa922defa3?width=105"
              alt="CogniHash Logo"
              className="w-[53px] h-[53px]"
            />
          </div>
          <span className="text-black text-2xl font-semibold font-inter">CogniHash</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(true)}
          className="w-8 h-8 p-0 hover:bg-white"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => navigate(item.path)}
              className={`w-full justify-start gap-3 px-4 py-3 text-black font-semibold hover:bg-white ${
                isActive(item.path) ? 'bg-white shadow-sm' : ''
              }`}
            >
              <Icon className="w-6 h-6" />
              {item.label}
            </Button>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="p-4 space-y-2 border-t border-gray-200">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => navigate(item.path)}
              className="w-full justify-start gap-3 px-4 py-3 text-black font-semibold hover:bg-white"
            >
              <Icon className="w-6 h-6" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </aside>
  );
}
