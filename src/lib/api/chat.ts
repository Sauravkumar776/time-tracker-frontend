import { supabase } from '../supabase';
import { ChatMessage, ChatResponse } from '../../types/chat';

export async function processChatMessage(
  content: string,
  previousMessages: ChatMessage[]
): Promise<ChatResponse> {
  const { data, error } = await supabase.functions.invoke('process-chat', {
    body: {
      message: content,
      previousMessages,
    },
  });

  if (error) throw error;
  return data;
}