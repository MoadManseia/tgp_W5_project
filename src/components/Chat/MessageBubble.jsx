import React from 'react';

const defaultAvatar = (
  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 text-xs font-medium mr-2">
    <span>U</span>
  </div>
);

const MessageBubble = ({ message, isOwn }) => {
  return (
    <div className={`flex items-end ${isOwn ? 'justify-end' : 'justify-start'} mb-4`} style={{fontFamily: 'Roboto, Arial, sans-serif'}}>
      {/* Show avatar for incoming messages */}
      {!isOwn && (
        <div className="self-end">{defaultAvatar}</div>
      )}
      <div>
        {/* INCOMING: timestamp above bubble, OUTGOING: inside bubble */}
        {!isOwn && (
          <div className="text-[11px] text-gray-400 mb-1 ml-1">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        )}
        <div
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2 border transition-all duration-75 ${isOwn
            ? 'bg-blue-100 border-blue-100 text-blue-900 rounded-br-4 shadow-sm'
            : 'bg-white border-gray-200 text-gray-800 rounded-bl-2'
            }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
          {isOwn && (
            <div className="text-[11px] mt-1 text-blue-400 text-right font-normal">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;