import React from 'react';
import { Send, Bot, User, Loader, X, Paperclip, Smile, Maximize2, Minimize2 } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { formatDistanceToNow } from 'date-fns';
import { useAuthStore } from '../../store/authStore';

interface ChatInterfaceProps {
  onClose?: () => void;
}

export function ChatInterface({ onClose }: ChatInterfaceProps) {
  const { messages, sendMessage, isLoading } = useChatStore();
  const { user } = useAuthStore();
  const [input, setInput] = React.useState('');
  const [isExpanded, setIsExpanded] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = React.useState(true);

  const suggestions = [
    "How do I start tracking time?",
    "Show my weekly report",
    "Create a new project",
    "Help with invoicing"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !user) return;
    setShowSuggestions(false);
    sendMessage(input);
    setInput('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  if (!user) {
    return (
      <div className="flex flex-col h-[400px] bg-white rounded-lg shadow-xl p-6">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Bot className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Sign in to Chat</h3>
            <p className="text-gray-600">
              Please sign in to use the TimeTracker Assistant
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`flex flex-col bg-white rounded-lg shadow-xl transition-all duration-300 ${
        isExpanded ? 'fixed inset-4 z-50' : 'h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-semibold">TimeTracker Assistant</h2>
            <p className="text-sm text-blue-100">
              {isLoading ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="w-16 h-16 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Welcome, {user.firstName}! 👋
            </h3>
            <p className="text-gray-600 mb-6">
              I'm your personal TimeTracker assistant. How can I help you today?
            </p>
            {showSuggestions && (
              <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-3 text-sm text-left text-gray-700 bg-white border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-white border border-gray-200 text-blue-600'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User size={16} />
                  ) : (
                    <Bot size={16} />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {formatDistanceToNow(new Date(message.timestamp), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="p-2 hover:text-gray-600 transition-colors"
              >
                <Paperclip size={18} />
              </button>
              <button
                type="button"
                className="p-2 hover:text-gray-600 transition-colors"
              >
                <Smile size={18} />
              </button>
            </div>
            <p>Press Enter to send</p>
          </div>
        </form>
      </div>
    </div>
  );
}