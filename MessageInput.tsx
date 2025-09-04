import React, { useState, useEffect } from 'react';
import { Send, Paperclip, Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [input, setInput] = useState('');
  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  // Update input when transcript changes
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
      resetTranscript();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? "Listening... speak now" : "Ask about construction materials, safety, planning, tools..."}
                className={`w-full resize-none border-0 bg-transparent px-4 py-3 focus:outline-none placeholder-gray-400 text-gray-900 max-h-32 min-h-[48px] ${
                  isListening ? 'placeholder-red-400' : ''
                }`}
                rows={1}
                disabled={isLoading}
                style={{
                  height: 'auto',
                  minHeight: '48px',
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
              />
              {isListening && (
                <div className="absolute right-4 top-3 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-red-500 font-medium">Recording</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 pr-2 pb-2">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isLoading}
              >
                <Paperclip className="w-4 h-4" />
              </button>
              
              {isSupported ? (
                <button
                  type="button"
                  onClick={handleMicClick}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isListening
                      ? 'text-red-600 bg-red-50 hover:bg-red-100'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                  disabled={isLoading}
                  title={isListening ? 'Stop recording' : 'Start voice recording'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              ) : (
                <button
                  type="button"
                  className="p-2 text-gray-300 cursor-not-allowed rounded-lg"
                  disabled
                  title="Voice recording not supported in this browser"
                >
                  <Mic className="w-4 h-4" />
                </button>
              )}
              
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
        
        <div className="flex items-center justify-center mt-3 text-xs text-gray-400">
          <span>ConstructAI can make mistakes. Verify important construction information.</span>
          {isSupported && (
            <span className="ml-2 text-blue-500">• Voice input supported</span>
          )}
        </div>
      </div>
    </div>
  );
}