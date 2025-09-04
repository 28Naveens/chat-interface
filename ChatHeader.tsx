import React from 'react';
import { HardHat, Sparkles } from 'lucide-react';

export default function ChatHeader() {
  return (
    <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <HardHat className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">ConstructAI</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Construction Expert Assistant
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          Online
        </div>
      </div>
    </header>
  );
}