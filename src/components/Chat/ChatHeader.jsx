import React from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const ChatHeader = ({ chat }) => {
  return (
    <div className="px-6 py-4 border-b border-blue-50 bg-white flex items-center justify-between" style={{fontFamily: 'Roboto, Arial, sans-serif'}}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="font-medium text-blue-600 text-base">
            {chat?.name?.charAt(0)}
          </span>
        </div>
        <div>
          <h2 className="font-normal text-gray-800 text-base">{chat?.name}</h2>
          <p className="text-xs text-blue-400 font-normal mt-0.5">Online</p>
        </div>
      </div>
      <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
        <EllipsisVerticalIcon className="w-5 h-5 text-blue-300" />
      </button>
    </div>
  );
};

export default ChatHeader;