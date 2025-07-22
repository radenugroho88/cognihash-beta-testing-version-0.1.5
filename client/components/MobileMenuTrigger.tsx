import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "../context/SidebarContext";

export default function MobileMenuTrigger() {
  const { toggleSidebar, isMobile } = useSidebar();

  if (!isMobile) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="w-10 h-10 p-0 hover:bg-gray-100 rounded-lg md:hidden"
      title="Open menu"
    >
      <Menu className="w-5 h-5" />
    </Button>
  );
}
