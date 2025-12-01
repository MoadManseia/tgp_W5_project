import React from 'react';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ messages, currentUser }) => {
  return (
    <div className="flex-1 overflow-y-auto p-5 bg-blue-50" style={{fontFamily: 'Roboto, Arial, sans-serif'}}>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-1.5">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              isOwn={message.senderId === currentUser.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;