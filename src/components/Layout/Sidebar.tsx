import React from "react";
import { HomeIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/solid";
import ChatList from "../Chat/ChatList";
import type { Chat } from "../../pages/Dashboard";

type SidebarProps = {
  currentView: "dashboard" | "settings";
  onViewChange: (view: "dashboard" | "settings") => void;
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  chats,
  activeChat,
  onSelectChat,
}) => {
  const menuItems: {
    icon: typeof HomeIcon;
    label: string;
    view: "dashboard";
  }[] = [{ icon: HomeIcon, label: "Dashboard", view: "dashboard" }];

  return (
    <div className="h-full w-24 md:w-64 bg-gray-800 text-white flex flex-col sticky top-0">
    

      <nav className="flex-1 overflow-y-auto p-4">
        {/* Show Dashboard button only when not on dashboard view */}
        {currentView !== "dashboard" && (
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => onViewChange(item.view)}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                    currentView === item.view
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="hidden md:inline text-sm">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Chat List - Show when on dashboard view */}
        {currentView === "dashboard" && chats && (
          <div>
            <ChatList
              chats={chats}
              activeChat={activeChat}
              onSelectChat={onSelectChat}
            />
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <button
            onClick={() => onViewChange("settings")}
            className={`flex items-center gap-3 flex-1 p-3 rounded-lg transition-colors text-sm ${
              currentView === "settings" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <Cog6ToothIcon className="w-5 h-5" />
            <span className="md:inline hidden ">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
