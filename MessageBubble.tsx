import React from 'react';
import { Message } from '../types/chat';
import { User, Bot, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`group flex gap-4 mb-8 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
            : 'bg-gradient-to-br from-gray-700 to-gray-800'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>
      </div>
      
      <div className="flex-1 max-w-none">
        <div className={`${isUser ? 'flex justify-end' : 'flex justify-start'}`}>
          <div className={`max-w-[85%] ${
            isUser 
              ? 'bg-blue-600 text-white rounded-3xl rounded-br-lg' 
              : 'bg-transparent'
          } ${isUser ? 'px-4 py-3' : ''}`}>
            <div className={`${
              isUser 
                ? 'text-white' 
                : 'text-gray-800 prose prose-sm max-w-none'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        </div>
        
        <div className={`flex items-center gap-2 mt-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-400">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          
          {!isUser && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors">
                <Copy className="w-3 h-3" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-green-600 transition-colors">
                <ThumbsUp className="w-3 h-3" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600 transition-colors">
                <ThumbsDown className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}