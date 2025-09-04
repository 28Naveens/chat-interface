import React, { useState } from 'react';
import { Message } from '../types/chat';
import { generateAIResponse } from '../utils/aiResponses';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (content: string, sender: 'user' | 'ai') => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async (userMessage: string) => {
    // Add user message immediately
    addMessage(userMessage, 'user');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      addMessage(aiResponse, 'ai');
      setIsLoading(false);
    }, 1000 + Math.random() * 1500); // Random delay between 1-2.5 seconds
  };

  return (
    <div className="flex flex-col flex-1 bg-gradient-to-b from-gray-50 to-white">
      <MessageList messages={messages} isLoading={isLoading} onSendMessage={handleSendMessage} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}