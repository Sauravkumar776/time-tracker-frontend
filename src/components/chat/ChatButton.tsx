import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { ChatInterface } from './ChatInterface';

export function ChatButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 z-50 group"
      >
        <div className="relative">
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          {!isOpen && (
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
          )}
        </div>
      </button>

      {/* Chat modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[400px] z-50">
          <div className="transform transition-all duration-300 animate-slide-up">
            <ChatInterface onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}