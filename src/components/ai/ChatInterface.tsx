/**
 * ChatInterface Component
 * 
 * Conversational AI interface for asking questions about design choices
 * Provides context-aware responses based on current wizard state
 * 
 * Phase 3: Conversational AI Assistant
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { ScrollArea } from '../ui/scroll-area';
import type { ConversationMessage } from '../../types/gemini';

export interface ChatInterfaceProps {
  /**
   * Whether the chat interface is open
   */
  isOpen: boolean;
  
  /**
   * Callback when the chat interface is closed
   */
  onClose: () => void;
  
  /**
   * Function to send a message and get a response
   */
  onSendMessage: (message: string) => Promise<string>;
  
  /**
   * Whether the AI is currently processing a message
   */
  isLoading?: boolean;
  
  /**
   * Initial messages to display (for conversation history)
   */
  initialMessages?: ConversationMessage[];
  
  /**
   * Callback when messages change (for persistence)
   */
  onMessagesChange?: (messages: ConversationMessage[]) => void;
}

/**
 * ChatInterface Component
 * 
 * Displays a chat window with message history, input field, and send button
 * Shows typing indicator during AI response
 * Supports minimizing and maximizing the chat window
 */
export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  isOpen,
  onClose,
  onSendMessage,
  isLoading = false,
  initialMessages = [],
  onMessagesChange,
}) => {
  // State
  const [messages, setMessages] = useState<ConversationMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);
  
  // Notify parent when messages change
  useEffect(() => {
    if (onMessagesChange) {
      onMessagesChange(messages);
    }
  }, [messages, onMessagesChange]);
  
  /**
   * Handles sending a message
   */
  const handleSend = async () => {
    const trimmedMessage = inputValue.trim();
    
    if (!trimmedMessage || isSending) {
      return;
    }
    
    // Add user message
    const userMessage: ConversationMessage = {
      role: 'user',
      content: trimmedMessage,
      timestamp: Date.now(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);
    
    try {
      // Get AI response
      const response = await onSendMessage(trimmedMessage);
      
      // Add assistant message
      const assistantMessage: ConversationMessage = {
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('[ChatInterface] Failed to send message:', error);
      
      // Add error message
      const errorMessage: ConversationMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your message. Please try again.',
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };
  
  /**
   * Handles Enter key press (send message)
   * Shift+Enter adds a new line
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  /**
   * Formats timestamp for display
   */
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-14' : 'w-96 h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-teal-500" />
          <h3 className="font-semibold text-white">AI Assistant</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Minimize/Maximize button */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-800 rounded transition-colors"
            aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4 text-gray-400" />
            ) : (
              <Minimize2 className="w-4 h-4 text-gray-400" />
            )}
          </button>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      
      {/* Messages area (hidden when minimized) */}
      {!isMinimized && (
        <>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    Ask me anything about your design choices!
                  </p>
                  <p className="text-xs mt-2 opacity-75">
                    I can help with layout, colors, components, and more.
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-800 text-gray-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.role === 'user'
                            ? 'text-teal-200'
                            : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              )}
              
              {/* Typing indicator */}
              {(isSending || isLoading) && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-teal-500 animate-spin" />
                      <span className="text-sm text-gray-400">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Input area */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                className="flex-1 bg-gray-800 text-white placeholder-gray-500 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows={1}
                disabled={isSending || isLoading}
                aria-label="Message input"
              />
              
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isSending || isLoading}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4"
                aria-label="Send message"
              >
                {isSending || isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </>
      )}
    </div>
  );
};
