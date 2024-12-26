'use client';

import { useState, useCallback } from 'react';
import { Menu, Settings, X, MessageSquare, Plus, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Chat {
  id: string;
  title: string;
}

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! How can I help you today?' },
  ]);
  const [chats] = useState<Chat[]>([
    { id: '1', title: 'React Development' },
    { id: '2', title: 'TypeScript Basics' },
    { id: '3', title: 'Tailwind CSS Tutorial' },
  ]);

  const handleSendMessage = useCallback(() => {
    if (message.trim()) {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: message },
        { role: 'assistant', content: 'I received your message and will help you with that.' }
      ]);
      setMessage('');
    }
  }, [message]);

  const handleNewChat = useCallback(() => {
    setMessages([{ role: 'assistant', content: 'Hello! How can I help you today?' }]);
  }, []);

  return (
    <div className="flex h-screen bg-white text-white">
      {/* Sidebar */}
      <div className={`w-80 bg-white text-black border-r border-gray-800 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } absolute md:relative h-full z-10`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <h1 className="text-xl font-semibold">Coderium</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <button 
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-3"
          >
            <Plus size={20} />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => console.log('Selected chat:', chat.id)}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors text-left"
            >
              <MessageSquare size={18} />
              <span className="truncate">{chat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b border-gray-800 flex items-center px-4 justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-auto px-4 py-6 space-y-6">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-100'
              }`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center bg-gray-900 rounded-lg">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Send a message..."
              className="flex-1 bg-transparent border-0 p-3 focus:ring-0 focus:outline-none resize-none h-[52px] max-h-[200px] overflow-y-auto"
              style={{ scrollbarWidth: 'none' }}
            />
            <button 
              onClick={handleSendMessage}
              className="p-3 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
              disabled={!message.trim()}
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}