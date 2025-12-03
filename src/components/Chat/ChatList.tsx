import React from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import type { Chat } from "../../pages/Dashboard";

type ChatListProps = {
  chats: Chat[];
  activeChat: Chat;
  onSelectChat: (chat: Chat) => void;
};

const ChatList: React.FC<ChatListProps> = ({
  chats,
  activeChat,
  onSelectChat,
}) => {
  return (
    <div className="w-full overflow-y-auto">
      <div className="p-4 border-b border-gray-700 mb-2">
        <h2 className="text-lg font-semibold text-white">Conversations</h2>
      </div>
      <div className="space-y-1">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`w-full p-3 text-left transition-colors rounded-lg ${
              activeChat?.id === chat.id
                ? 'bg-blue-600 font-semibold text-white'
                : 'hover:bg-gray-700 text-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {chat.profilePic ? (
                <img
                  src={chat.profilePic}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium text-sm ${activeChat?.id === chat.id ? 'text-white' : 'text-gray-200'}`}>{chat.name}</h3>
                <p className={`text-xs truncate ${activeChat?.id === chat.id ? 'text-blue-100' : 'text-gray-400'}`}>{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
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