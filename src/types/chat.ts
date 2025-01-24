export interface ChatMessage {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: string;
  }
  
  export interface ChatResponse {
    content: string;
    suggestedActions?: {
      type: 'create_timer' | 'view_reports' | 'manage_project';
      payload: any;
    }[];
  }
  
  export interface ChatContext {
    recentProjects?: string[];
    activeTimer?: boolean;
    userRole?: string;
  }