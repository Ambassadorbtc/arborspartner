import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  FolderKanban,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  isActive?: boolean;
}

interface SidebarProps {
  items?: NavItem[];
  activeItem?: string;
  onItemClick?: (label: string) => void;
}

const defaultNavItems: NavItem[] = [
  { icon: <Home size={20} />, label: "Home", path: "/", isActive: true },
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    path: "/dashboard",
  },
  { icon: <FolderKanban size={20} />, label: "Projects", path: "/projects" },
  { icon: <Calendar size={20} />, label: "Calendar", path: "/calendar" },
  { icon: <Users size={20} />, label: "Team", path: "/team" },
];

const defaultBottomItems: NavItem[] = [
  { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  { icon: <HelpCircle size={20} />, label: "Help", path: "/help" },
];

const Sidebar = ({
  items = defaultNavItems,
  activeItem = "Home",
  onItemClick = () => {},
}: SidebarProps) => {
  const location = useLocation();
  const [sectionPrefix, setSectionPrefix] = useState("");
  const [isStoryboard, setIsStoryboard] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine the section prefix based on the current URL path
  useEffect(() => {
    // Check if we're in a storyboard view
    if (
      location.pathname.includes("/tempobook/storyboards/") ||
      location.search.includes("storyboard=true")
    ) {
      setIsStoryboard(true);
    } else {
      setIsStoryboard(false);
    }

    if (location.pathname.startsWith("/admin/")) {
      setSectionPrefix("/admin");
    } else if (location.pathname.startsWith("/partner/")) {
      setSectionPrefix("/partner");
    } else {
      setSectionPrefix("");
    }
  }, [location.pathname, location.search]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Function to get the correct path with section prefix
  const getPath = (item: NavItem) => {
    if (!item.path) return "#";

    // Define a mapping of labels to their routes
    const routeMap: Record<string, string> = {
      Shops: "/partner/shops",
      Leads: "/partner/tracking",
      Upload: "/partner/upload",
      Commissions: "/partner/commissions",
      Profile: "/partner/profile",
      Settings: "/partner/settings",
    };

    // If we're in a storyboard view, we still want to navigate within the storyboard environment
    if (isStoryboard) {
      // Use the same routes as production, but keep within the storyboard context
      // This allows for consistent navigation patterns in both environments
      const route = routeMap[item.label];
      if (route) {
        return route;
      }

      // Special case for Dashboard in partner section
      if (item.label === "Dashboard" && sectionPrefix === "/partner") {
        return "/partner/dashboard";
      }

      // For other items, just return the original path
      return item.path;
    }

    // When not in storyboard mode, use actual application routes
    // Check if we have a predefined route for this label
    const route = routeMap[item.label];
    if (route) {
      return route;
    }

    // Special case for Dashboard in partner section
    if (item.label === "Dashboard" && sectionPrefix === "/partner") {
      return "/partner/dashboard";
    }

    // If the path already includes the section prefix or is an absolute path (like "/"), use it as is
    if (item.path.startsWith(sectionPrefix) || item.path === "/") {
      return item.path;
    }

    // For paths that need the section prefix
    if (sectionPrefix) {
      // Handle special case for Dashboard to map to the section's dashboard
      if (item.label === "Dashboard" && item.path === "/dashboard") {
        return `${sectionPrefix}/dashboard`;
      }

      // For other items, append the path to the section prefix
      return `${sectionPrefix}${item.path}`;
    }

    return item.path;
  };

  // Mobile menu toggle button
  const MobileMenuToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-sm rounded-full h-10 w-10 flex items-center justify-center"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
      {isMobileMenuOpen ? (
        <X className="h-5 w-5 text-gray-700" />
      ) : (
        <Menu className="h-5 w-5 text-gray-700" />
      )}
    </Button>
  );

  // Main sidebar content
  const SidebarContent = () => (
    <>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">Projects</h2>
        <p className="text-sm text-gray-500">Manage your projects and tasks</p>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-1.5">
          {items.map((item) => (
            <Link
              key={item.label}
              to={getPath(item)}
              className="block w-full"
              onClick={() => onItemClick(item.label)}
            >
              <Button
                variant={"ghost"}
                className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${item.label === activeItem ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "text-gray-700 hover:bg-gray-100"}`}
                type="button"
              >
                <span
                  className={`${item.label === activeItem ? "text-blue-600" : "text-gray-500"}`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        <Separator className="my-4 bg-gray-100" />

        <div className="space-y-3">
          <h3 className="text-xs font-medium px-4 py-1 text-gray-500 uppercase tracking-wider">
            Filters
          </h3>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Active
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            High Priority
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
            In Progress
          </Button>
        </div>
      </ScrollArea>

      <div className="p-4 mt-auto border-t border-gray-200">
        {defaultBottomItems.map((item) => (
          <Link
            key={item.label}
            to={getPath(item)}
            className="block w-full mb-1.5"
            onClick={() => onItemClick(item.label)}
          >
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
              type="button"
            >
              <span className="text-gray-500">{item.icon}</span>
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </>
  );

  // Mobile bottom navigation
  const MobileBottomNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-40">
      {items.slice(0, 5).map((item) => (
        <Link
          key={item.label}
          to={getPath(item)}
          className="flex flex-col items-center justify-center w-full h-full"
          onClick={() => onItemClick(item.label)}
        >
          <span
            className={`${item.label === activeItem ? "text-green-600" : "text-gray-500"}`}
          >
            {item.icon}
          </span>
          <span className="text-xs mt-1 font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile menu toggle button */}
      <MobileMenuToggle />

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-[280px] h-full bg-white/80 backdrop-blur-md border-r border-gray-200 flex-col">
        <SidebarContent />
      </div>

      {/* Mobile sidebar (slide-in) */}
      <div
        className={`md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-green-600 mr-2"
            >
              <path d="M21 9c0 4-5 7-9 7s-9-3-9-7c0-3 2-5 5-5 2 0 3 1 4 2 1-1 2-2 4-2 3 0 5 2 5 5Z" />
              <path d="M12 16v6" />
            </svg>
            <h2 className="text-xl font-semibold">Arbor Portal</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <SidebarContent />
      </div>

      {/* Mobile bottom navigation */}
      <MobileBottomNav />
    </>
  );
};

export default Sidebar;
