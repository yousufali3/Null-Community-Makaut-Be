import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Video, Users, Settings, LogOut } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Webinars", href: "/webinars", icon: Video },
  { name: "Participants", href: "/participants", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-64 bg-[#1f1f1f] border-r border-[#2a2a2a]">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white">Webinar Admin</h2>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2a2a2a] hover:text-[#00ff88] transition-colors group",
              "hover:shadow-[0_0_10px_rgba(0,255,136,0.1)]"
            )}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[#2a2a2a]">
        <button className="flex items-center px-4 py-3 w-full text-black rounded-lg hover:bg-[#2a2a2a] hover:text-[#00ff88] transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
