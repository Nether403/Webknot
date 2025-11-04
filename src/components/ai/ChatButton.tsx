/**
 * ChatButton Component
 * 
 * Floating action button to open the AI chat interface
 * Displays in the bottom-right corner of the screen
 * 
 * Phase 3: Conversational AI Assistant
 * Requirements: 6.1
 */

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatInterface } from './ChatInterface';
import { useChat } from '../../hooks/useChat';

/**
 * ChatButton Component
 * 
 * Provides a floating button to access the AI chat assistant
 * Manages chat interface visibility and state
 */
export const ChatButton: React.FC = () => {
  const {
    isOpen,
    openChat,
    closeChat,
    messages,
    sendMessage,
    isLoading,
  } = useChat();
  
  return (
    <>
      {/* Floating action button */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-4 right-4 z-40 bg-teal-600 hover:bg-teal-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open AI chat assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
      
      {/* Chat interface */}
      <ChatInterface
        isOpen={isOpen}
        onClose={closeChat}
        onSendMessage={sendMessage}
        isLoading={isLoading}
        initialMessages={messages}
      />
    </>
  );
};
