import React from 'react';
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';

function App() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <ChatHeader />
      <ChatContainer />
    </div>
  );
}

export default App;