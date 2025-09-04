import React, { useEffect, useRef } from 'react';
import { Message } from '../types/chat';
import MessageBubble from './MessageBubble';
import { HardHat, Wrench, Shield, Calendar, Lightbulb } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export default function MessageList({ messages, isLoading, onSendMessage }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const suggestionCards = [
    {
      icon: HardHat,
      title: "Foundation Types",
      description: "Learn about different foundation options",
      query: "What are the best foundation types for residential construction?"
    },
    {
      icon: Shield,
      title: "Safety Protocols",
      description: "Essential safety requirements and PPE",
      query: "What safety equipment is required on construction sites?"
    },
    {
      icon: Wrench,
      title: "Tools & Equipment",
      description: "Construction tools and their applications",
      query: "What tools do I need for basic construction work?"
    },
    {
      icon: Calendar,
      title: "Project Planning",
      description: "Timeline and resource management",
      query: "How do I plan a construction project timeline?"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <HardHat className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Welcome to ConstructAI</h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Your intelligent assistant for construction expertise. Ask me about building materials, 
                safety protocols, project planning, tools, and construction techniques.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {suggestionCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                  onClick={() => {
                    onSendMessage(card.query);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                      <card.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Lightbulb className="w-4 h-4" />
              <span>Click on any suggestion above or type your construction question below</span>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex gap-4 mb-8 animate-fade-in">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-2xl rounded-bl-lg p-4 max-w-sm">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-3">ConstructAI is analyzing your question...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}