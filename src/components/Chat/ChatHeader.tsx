import React from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import type { Chat } from "../../pages/Dashboard";

type ChatHeaderProps = {
  chat: Chat | null;
  lastMessage?: string;
  onHeaderClick?: () => void;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  chat,
  lastMessage,
  onHeaderClick,
}) => {
  return (
    <div
      className="px-6 py-4 border-b border-blue-50 bg-white flex items-center justify-between cursor-pointer hover:bg-blue-50 transition-colors"
      style={{ fontFamily: "Roboto, Arial, sans-serif" }}
      onClick={onHeaderClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="font-medium text-blue-600 text-base">
            {chat?.name
              ? chat.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
              : ""}
          </span>
        </div>
        <div>
          <h2 className="font-normal text-gray-800 text-base">{chat?.name}</h2>
          <p className="text-xs text-gray-500 font-normal mt-0.5">Online</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
