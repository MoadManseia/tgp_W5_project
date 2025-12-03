import React from "react";
import { HomeIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/solid";
import ChatList from "../Chat/ChatList";
import type { Chat } from "../../pages/Dashboard";

type SidebarProps = {
  currentView: "dashboard" | "settings";
  onViewChange: (view: "dashboard" | "settings") => void;
  chats: Chat[];
  activeChat: Chat;
  onSelectChat: (chat: Chat) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  chats,
  activeChat,
  onSelectChat,
}) => {
  const menuItems: { icon: typeof HomeIcon; label: string; view: "dashboard" }[] = [
    { icon: HomeIcon, label: "Dashboard", view: "dashboard" },
  ];

  return (
    <div className="h-full w-16 md:w-64 bg-gray-800 text-white flex flex-col sticky top-0">
      <div className="p-6 border-b border-gray-700">
        {currentView === "dashboard" ? (
          <>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <BoltIcon className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">Live Chat</h1>
              <h1 className="text-xl font-bold bg-[red]">Live Chat</h1>
            </div>
            <div className="md:hidden flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <BoltIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <BoltIcon className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">LiveChat</h1>
            </div>
            <div className="md:hidden flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <BoltIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        {/* Show Dashboard button only when not on dashboard view */}
        {currentView !== "dashboard" && (
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button 
                  onClick={() => onViewChange(item.view)}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${currentView === item.view ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
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
            <span className="hidden md:inline">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;