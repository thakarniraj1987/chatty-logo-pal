
import React from 'react';

const ChatHeader = () => {
  return (
    <div className="bg-shell-red text-white p-4 flex items-center gap-3 shadow-lg">
      <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center">
        <img 
          src="/lovable-uploads/e701609b-a73b-4f88-86a8-10d224411ef3.png" 
          alt="Shell Logo" 
          className="w-8 h-8 object-contain"
        />
      </div>
      <div>
        <h1 className="text-xl font-bold">Shell Assistant</h1>
        <p className="text-shell-yellow text-sm">How can I help you today?</p>
      </div>
      <div className="ml-auto">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ChatHeader;
