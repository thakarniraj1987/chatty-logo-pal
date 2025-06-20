
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4 animate-fade-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-shell-red flex items-center justify-center flex-shrink-0 mt-1">
          <img 
            src="/lovable-uploads/e701609b-a73b-4f88-86a8-10d224411ef3.png" 
            alt="Shell Bot" 
            className="w-5 h-5 object-contain"
          />
        </div>
      )}
      
      <div className={cn(
        "max-w-[70%] rounded-2xl px-4 py-3 shadow-sm",
        isUser 
          ? "bg-shell-red text-white rounded-br-md" 
          : "bg-gray-100 text-gray-800 rounded-bl-md"
      )}>
        <p className="text-sm leading-relaxed">{message}</p>
        <p className={cn(
          "text-xs mt-2 opacity-70",
          isUser ? "text-shell-yellow" : "text-gray-500"
        )}>
          {timestamp}
        </p>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-white text-sm font-medium">U</span>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
