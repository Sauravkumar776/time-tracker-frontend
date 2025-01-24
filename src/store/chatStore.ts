import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage, ChatResponse } from '../types/chat';
import { processChatMessage } from '../lib/api/chat';

interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,
      error: null,

      sendMessage: async (content: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Add user message
          const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            content,
            role: 'user',
            timestamp: new Date().toISOString(),
          };
          
          set(state => ({
            messages: [...state.messages, userMessage],
          }));

          // Get AI response
          const response = await processChatMessage(content, get().messages);
          
          // Add AI response
          const aiMessage: ChatMessage = {
            id: crypto.randomUUID(),
            content: response.content,
            role: 'assistant',
            timestamp: new Date().toISOString(),
          };
          
          set(state => ({
            messages: [...state.messages, aiMessage],
          }));
        } catch (error) {
          set({ error: 'Failed to send message' });
          console.error('Chat error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      clearMessages: () => set({ messages: [], error: null }),
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);