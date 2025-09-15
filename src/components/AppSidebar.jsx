// ...existing code...
import { BarChart3, FileText, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { NavLink, useNavigate } from "react-router";

// Professional menu items for SaaS contracts tool
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
  },
  {
    title: "Upload Contracts",
    url: "/upload-contracts",
    icon: FileText,
  },
];

export function AppSidebar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { userDetails } = auth;
  // ...existing code...

  // Close dropdown when clicking outside
  // ...existing code...

  // ...existing code...

  console.log("userDetails in Sidebar:", userDetails);

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-xl text-gray-900 px-3 py-7  mb-1.5">
            Contract Manager
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                return (
                  <NavLink
                    key={item.url}
                    to={item.url}
                    className={({ isActive }) => `
                          flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                          ${
                            isActive
                              ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700 font-medium"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                  >
                    <item.icon className={`w-5 h-5 `} />
                    <span className="font-medium">{item.title}</span>
                  </NavLink>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Modern User Dropdown Footer */}
      <div className="mt-auto border-t border-gray-200 p-3">
        <button
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          onClick={() => navigate("/settings")}
        >
          <User className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Settings</span>
        </button>
      </div>
    </Sidebar>
  );
}
