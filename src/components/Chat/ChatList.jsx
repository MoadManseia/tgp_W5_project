import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const ChatList = ({ chats, activeChat, onSelectChat }) => {
  return (
    <div className="w-full md:w-80 border-r border-gray-200 bg-white overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Conversations</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`w-full p-4 text-left transition-colors ${
              activeChat?.id === chat.id
                ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold text-blue-900'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 text-sm">{chat.name}</h3>
                <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                  {chat.unread}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatList;