import React from 'react';
import { HomeIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ onLogout, currentView, onViewChange }) => {
  const menuItems = [
    { icon: HomeIcon, label: 'Dashboard', view: 'dashboard' },
    { icon: ChatBubbleLeftRightIcon, label: 'Chats', view: 'chats' },
    { icon: Cog6ToothIcon, label: 'Settings', view: 'settings' },
  ];

  return (
    <div className="h-full w-16 md:w-64 bg-gray-800 text-white flex flex-col sticky top-0">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold hidden md:block">LiveChat</h1>
        <div className="md:hidden flex justify-center">
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
        </div>
      </div>
      
      <nav className="flex-1 p-4">
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
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;