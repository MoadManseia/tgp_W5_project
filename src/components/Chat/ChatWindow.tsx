import React from "react";
import MessageBubble from "./MessageBubble";
import type { AppUser } from "../../App";
import type { Message, Chat } from "../../pages/Dashboard";

type ChatWindowProps = {
  messages: Message[];
  currentUser: AppUser;
  chatUser?: Chat | null;
};

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  currentUser,
  chatUser,
}) => {
  return (
    <div
      className="flex-1 overflow-y-auto p-5 bg-blue-50"
      style={{ fontFamily: "Roboto, Arial, sans-serif" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="space-y-1.5">
          {messages.map((message, index) => {
            const isOwn = message.senderId === currentUser.id;
            return (
              <MessageBubble
                key={index}
                message={message}
                isOwn={isOwn}
                senderProfilePic={
                  !isOwn && chatUser ? chatUser.profilePic : undefined
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
